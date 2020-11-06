import User from '../models/User';

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
    
    res.status(200)
        .json( {data: result} );
}

/**
    Método que crea un usuario en la base de datos.
    Ruta: '/api/users'
    Method: POST
**/
const createUser = async (req, res) => {

    const { username, password, active, role_id } = req.body;

    try {
        //Falta fecha de creación
        const createdUser = await User.create({ username, password, active, role_id }, {fields: ['username', 'password', 'active', 'role_id']});
        if( createdUser ){
            res.json({
                message: 'Usuario creado.',
                data: createdUser
            });
        }
    } catch (error) {
        console.log(error);

        res.json({
            message: 'No se ha guardado el usuario.',
            data: {}
        });
    }
}

/**
    Método que actualiza un usuario en la base de datos.
    Ruta: '/api/users/:id?'
**/
const updateUser = async (req, res) => {
    if( req.params.id === undefined ){
        res.status(404).json({
            message: 'Usuario no encontrado.'
        });

    } else {
        const { id } = req.params;
        const { username, password, active, role_id } = req.body;

        try {
            const user = await User.findOne({ where: {id}});

            if( user ){
                await user.update({ username, password, active, role_id });
                res.status(200).json({
                    message: `El usuario ha sido modificado correctamente.`,
                    data: user
                });
            } else {
                res.status(404).json({
                    message: `Usuario no encontrado.`,
                    data: {}
                });
            }
            
        } catch (error) {
            console.log(error);

            res.json({
                message: 'No se ha guardado el usuario.',
                data: {}
            });
        }
    }
}


/**
    Método que elimina un usuario de la base de datos.
    Ruta: '/api/users/:id?'
    Method: DELETE
**/
const deleteUser = async (req, res) => {
    if( req.params.id === undefined ){
        res.status(404).json({
            message: 'Usuario no encontrado.'
        });
    } else {
        const {id} = req.params;

        try {
            const affectedRows = await User.destroy({ where: {id}});

            res.status(200).json({
                message: `El usuario ha sido eliminado correctamente.`,
                affectedRows
            });
        } catch (error) {
            console.log(error);

            res.json({
                message: 'No se ha podido eliminar al usuario.',
                data: {}
            });
        }
    }
}

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}