import Slider from '../models/Slider';

/**
    Método que obtiene todos los Sliders.
    Si se especifica un ID devolverá un solo un objeto con el Slider que se haya encontrado.
    Ruta: '/api/sliders/:id?'
    Method: GET
**/
const getSliders = async (req, res) => {

    let result = [];
    if( req.params.id === undefined ){
        result = await Slider.findAll();
    } else {
        const { id } = req.params;
        result = await Slider.findOne({where: {id}});
    }
    
    return response.sendJson(res, 'Información recuperada.', result, 200);
}

/**
    Método que crea una categoría de producto en la base de datos.
    Ruta: '/api/sliders'
    Method: POST
**/
const createSlider = async (req, res) => {

    const { title, subtitle, body, link } = req.body;
    
    try {
        // Si la categoría del producto viene en el JSON, debemos validar que esa categoría exista.
/*         if(product_category_id != null){
            const result = await ProductCategory.findOne({where: {id: product_category_id}});
            if( result === null ){
                res.status(404).json({
                    message: 'La categoría asociada no fue encontrada.',
                    data: {},
                    error: true
                });
                return false;
            }
        } */
        
        // Creamos el slider en la base de datos.
        const createdSlider = await Slider.create({ title, subtitle, body, link }, {fields: ['title','subtitle','body','link']});
        if( createdSlider ){

            return response.sendJson(res, `Slider guardado correctamente.`, createdSlider, 200);
        }
    } catch (error) {
        console.log(error);
        
        return response.sendJson(res, 'No se ha guardado el slider.');
    }
}

/**
    Método que actualiza un Slider en la base de datos.
    Ruta: '/api/sliders/:id?'
**/
const updateSlider = async (req, res) => {
    if( req.params.id === undefined ){
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    }

    const { id } = req.params;
    const { title, subtitle, body, link } = req.body;

    try {
        if( id != null){
            const result = await Slider.findOne({where: {id: id}});
            if( result === null ){

                return response.sendJson(res, 'El Slider asociado no fue encontrada.', {}, 404);
            }
        }

        const slider = await Slider.findOne({ where: {id}});
        if( slider ){
            await slider.update({ title, subtitle, body, link });

            return response.sendJson(res, 'El Slider ha sido modificado correctamente.', slider, 200);
        } else {

            return response.sendJson(res, 'El Slider especificado no es válido.', {}, 404);
        }
        
    } catch (error) {
        console.log(error);

        return response.sendJson(res, 'No se ha guardado el slider.');
    }
}

/**
    Método que elimina un slider.
    Ruta: '/api/sliders/:id?'
    Method: DELETE
**/
const deleteSlider = async (req, res) => {
    if( req.params.id === undefined ){
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    } else {
        const {id} = req.params;

        try {
            const affectedRows = await Slider.destroy({ where: {id}});

            return response.sendJson(res, 'El slider ha sido eliminado correctamente.', affectedRows, 200);
        } catch (error) {
            console.log(error);

            return response.sendJson(res, 'No se ha podido desactivar el slider.');
        }
    }
}

/**
    Método que deshabilita un slider de producto.
    Ruta: '/api/sliders/disable/:id?'
    Method: POST
**/

// ver aqui

/* const disableCategory = async (req, res) => {
    if( req.params.id === undefined ){
        res.status(404).json({
            message: 'La categoría especificada no es válida.',
            data: {},
            error: true
        });
    } else {
        const { id } = req.params;

        try {
            const category = await ProductCategory.findOne({ where: {id}});

            if( category ){
                
                const deletedAt = category.deletedAt === null ? new Date() : null;
                await category.update({ deletedAt });
                res.status(200).json({
                    message: `La categoría ha sido ${deletedAt === null ? "habilitada" : "inhabilitada"} correctamente.`,
                    data: category,
                    error: false
                });
            } else {
                res.status(404).json({
                    message: `La categoría especificada no es válida.`,
                    data: {},
                    error: true
                });
            }
            
        } catch (error) {
            console.log(error);

            res.json({
                message: 'No se ha inhabilitado la categoría.',
                data: {},
                error: true
            });
        }
    }
} */

module.exports = {
    getSliders, 
    createSlider, 
    updateSlider, 
    deleteSlider
};