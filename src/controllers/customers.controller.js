import response from './response.controller';
import { createUserInDB } from './users.controller';

import { Customer, User } from '../models';

/**
    Método que obtiene los clientes del sistema.
    Si se especifica un ID devolverá un solo un objeto con el cliente que se haya encontrado.
    Ruta: '/api/customers/:id?'
    Method: GET
**/
const getCustomers = async (req, res) => {

    let result = [];
    if( req.params.id === undefined ){
        result = await Customer.findAll({
            include: [User]
        });
    } else {
        const { id } = req.params;
        result = await Customer.findOne({
            where: {id},
            include: [User]
        });
    }

    return response.sendJson(res, 'Información recuperada.', result, 200);
}

/**
    Método que crea un cliente en la base de datos.
    Ruta: '/api/customers'
    Method: POST
**/
const createCustomer = async (req, res) => {
    
    try {
        const { rut, name, last_name, username, password } = req.body;
        
        const customerRelatedUser = { username, password };
        customerRelatedUser['role'] = 3;
        customerRelatedUser['active'] = true;
        customerRelatedUser['createdAt'] = new Date();

        // Validamos que el cliente no esté registrada.
        const validaUnique = await User.getUserByUsername(username);
        if(validaUnique)
            return response.sendJson(res, 'El cliente ya está registrado.');

        // Creamos el usuario en la BD.
        const createdUser = await createUserInDB(customerRelatedUser);
        if( !createdUser ){
            return response.sendJson(res, 'No se ha podido guardar el cliente.');
        }

        // Creamos el registro del cliente.
        const createdCustomer = await Customer.create(
            { rut, name, last_name, user_id: createdUser.id, createdAt: customerRelatedUser.createdAt },
            { fields: ['rut', 'name', 'last_name', 'user_id', 'createdAt']}
        );

        if( createdCustomer ){
            const customer = await Customer.findOne({
                where: {id: createdCustomer.id},
                include: [User]
            });
            return response.sendJson(res, `Cliente creado correctamente.`, customer, 200);
        }
    } catch (error) {
        console.log(error);
    }
    
    return response.sendJson(res, 'Ha ocurrido un problema al crear al cliente.');
};

/**
    Método que actualiza un cliente en la base de datos.
    Ruta: '/api/customers/:id?'
    Method: PUT
**/
const updateCustomer = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    
    try {
        const { id } = req.params;
        const { username, password, rut, name, last_name } = req.body;

        // Validamos que el usuario exista.
        const customer = await Customer.findOne({ where: {id}});
        if( !customer ){
            return response.sendJson(res, 'Cliente no encontrado.', {}, 404);
        }
        
        await customer.update({ rut, name, last_name, updatedAt: new Date() });

        const user = await User.findOne({ where: {id: customer.user_id} });
        await user.update({ username, password, updatedAt: new Date() });
        
        return response.sendJson(res, `El Cliente ha sido modificado correctamente.`, customer, 200);
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado el usuario.');
    }
}

module.exports = {
    getCustomers,
    createCustomer,
    updateCustomer
};