import response from './response.controller';
import { checkIfRoleExists } from './roles.controller';
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
        if( await checkIfRoleExists(role_id) === null ){
            return response.sendJson(res, 'El rol indicado no es válido.');
        }

        // Validamos que el usuario no exista aún en la base de datos.
        const validaUnique = await User.getUserByUsername(username);
        if(validaUnique)
            return response.sendJson(res, 'El usuario ya está registrado.');
        
        const createdUser = await createUserInDB({ username, password, active, role_id });
        
        if( createdUser ){
            return response.sendJson(res, `Usuario creado correctamente.`, createdUser, 200);
        }
    } catch (error) {
        console.log(error);
    }
    return response.sendJson(res, 'No se ha guardado el usuario.');
}

/**
    Método que actualiza un usuario en la base de datos.
    Ruta: '/api/users/:id?'
    Method: PUT
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
        if( await checkIfRoleExists(role_id) === null ){
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

const createUserInDB = async (user) => {
    try {
        if( Object.keys(user).indexOf('createdAt') === -1 )
            user['createdAt'] = new Date();
        
        return await User.create(
            user, 
            { fields: ['username', 'password', 'active', 'role_id', 'createdAt']}
        );
    } catch (error) {
        console.log(error);
        return null;
    }
};

const login = async (req, res) => {
    let foundUser = await User.validateCredentials(req.body.username, req.body.password);
    if( !foundUser )
        return response.sendJson(res, 'El nombre de usuario o contraseña no son correctos.');
    
    if( !foundUser.active || foundUser.deletedAt !== null )
        return response.sendJson(res, 'El usuario no se encuentra habilitado para iniciar sesión.');

    const token = await User.generateSessionToken(foundUser);
    foundUser = foundUser.toJSON();
    foundUser.session_token = token;

    return response.sendJson(res, 'Inicio de sesión correcto.', {
        api_token: process.env.API_KEY,
        user: foundUser
    }, 200);
}

const logout = async (req, res) => {

    return response.sendJson(res);
};

module.exports = {
    getUsers,
    createUser,
    createUserInDB,
    login,
    logout,
    updateUser,
    deleteUser
}