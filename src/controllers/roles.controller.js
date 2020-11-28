import response from './response.controller';
import { Role } from '../models';

/**
    Método que obtiene los roles del sistema.
    Si se especifica un ID devolverá un solo un objeto con el rol que se haya encontrado.
    Ruta: '/api/roles/:id?'
    Method: GET
**/
const getRoles = async (req, res) => {
    let result = [];
    if( req.params.id === undefined ){
        result = await Role.findAll();
    } else {
        const { id } = req.params;
        result = await Role.findOne({where: {id}});
    }

    return response.sendJson(res, 'Información recuperada.', result, 200);
};

module.exports = {
    getRoles
}