import response from './response.controller';
import { User, Role } from '../models';

/**
    Método que obtiene los usuarios del sistema.
    Si se especifica un ID devolverá un solo un objeto con el usuario que se haya encontrado.
    Ruta: '/api/users/:id?'
    Method: GET
**/
const getUsers = async (req, res) => {

    let result = [];
    if( req.params.id === undefined ){
        result = await User.findAll();
    } else {
        const { id } = req.params;
        result = await User.findOne({where: {id}});
    }

    return response.sendJson(res, 'Información recuperada.', result, 200);
}

/**
    Método que crea un usuario en la base de datos.
    Ruta: '/api/users'
    Method: POST
**/
const createUser = async (req, res) => {
    try {
        const { username, password, active, role_id } = req.body;

        // Validaremos que el rol exista.
        const role = await Role.findOne({where: {id: role_id}});
        if( !role )
            return response.sendJson(res, 'El rol indicado no es válido.');

        // Validamos que el usuario no exista aún en la base de datos.
        const validaUnique = await User.getUserByUsername(username);
        if(validaUnique)
            return response.sendJson(res, 'El usuario ya está registrado.');
        
        const createdAt = new Date();
        const createdUser = await User.create(
            { username, password, active, role_id, createdAt }, 
            { fields: ['username', 'password', 'active', 'role_id', 'createdAt']}
        );

        if( createdUser ){
            return response.sendJson(res, `Usuario creado correctamente.`, createdUser, 200);
        }
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado el usuario.');
    }
}

/**
    Método que actualiza un usuario en la base de datos.
    Ruta: '/api/users/:id?'
**/
const updateUser = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    
    try {
        const { id } = req.params;
        const { username, password, active, role_id } = req.body;

        // Validamos que el usuario exista.
        const user = await User.findOne({ where: {id}});
        if( !user ){
            return response.sendJson(res, 'Usuario no encontrado.', {}, 404);
        }

        // Validaremos que el rol exista.
        const role = await Role.findOne({where: {id: role_id}});
        if( !role ){
            return response.sendJson(res, 'El rol indicado no es válido.');
        }
        
        await user.update({ username, password, active, role_id, updatedAt: new Date() });
        return response.sendJson(res, `El usuario ha sido modificado correctamente.`, user, 200);
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado el usuario.');
    }
}


/**
    Método que elimina un usuario de la base de datos.
    Ruta: '/api/users/:id?'
    Method: DELETE
**/
const deleteUser = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);

    try {
        const {id} = req.params;
        // Validamos que el usuario exista.
        const user = await User.findOne({ where: {id}});
        if( !user ){
            return response.sendJson(res, 'Usuario no encontrado.', {}, 404);
        }

        const deletedAt = user.deletedAt === null ? new Date() : null;
        await user.update({ deletedAt });

        return response.sendJson(res, 
            deletedAt === null ?
                `El usuario ha sido activado correctamente.` :
                'El usuario ha sido desactivado correctamente.',
            user, 200
        );
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha podido eliminar el usuario.');
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}