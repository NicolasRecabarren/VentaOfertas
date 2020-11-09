import Role from '../models/Role';

const getRoles = async (req, res) => {
    let result = [];
    if( req.params.id === undefined ){
        result = await Role.findAll();
    } else {
        const { id } = req.params;
        result = await Role.findOne({where: {id}});
    }
    
    res.status(200)
        .json( {data: result} );
};

module.exports = {
    getRoles
}