import ProductCategory from '../models/ProductCategory';

/**
    Método que obtiene las categorías de productos creadas.
    Si se especifica un ID devolverá un solo un objeto con la categoría que se haya encontrado.
    Ruta: '/api/product_categories/:id?'
    Method: GET
**/
const getCategories = async (req, res) => {

    let result = [];
    if( req.params.id === undefined ){
        result = await ProductCategory.findAll();
    } else {
        const { id } = req.params;
        result = await ProductCategory.findOne({where: {id}});
    }
    
    res.status(200)
        .json( {data: result} );
}

/**
    Método que crea una categoría de producto en la base de datos.
    Ruta: '/api/product_categories'
    Method: POST
**/
const createCategory = async (req, res) => {

    const { name, product_category_id } = req.body;
    
    try {
        // Si la categoría del producto viene en el JSON, debemos validar que esa categoría exista.
        if(product_category_id != null){
            const result = await ProductCategory.findOne({where: {id: product_category_id}});
            if( result === null ){
                res.status(404).json({
                    message: 'La categoría asociada no fue encontrada.',
                    data: {},
                    error: true
                });
                return false;
            }
        }
        
        // Creamos la categoría en la base de datos.
        const createdCategory = await ProductCategory.create({ name, product_category_id }, {fields: ['name','product_category_id']});
        if( createdCategory ){
            res.json({
                message: 'Categoría creada correctamente.',
                data: createdCategory,
                error: false
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No se ha guardado la categoría.',
            data: {},
            error: true
        });
    }
}

/**
    Método que actualiza una categoría de productos en la base de datos.
    Ruta: '/api/product_categories/:id?'
**/
const updateCategory = async (req, res) => {
    if( req.params.id === undefined ){
        res.status(404).json({
            message: 'La categoría especificada no es válida.'
        });
        return false;
    }

    const { id } = req.params;
    const { name, product_category_id } = req.body;

    try {
        if( product_category_id != null){
            const result = await ProductCategory.findOne({where: {id: product_category_id}});
            if( result === null ){
                res.status(404).json({
                    message: 'La categoría asociada no fue encontrada.',
                    data: {},
                    error: true
                });
                return false;
            }
        }

        const category = await ProductCategory.findOne({ where: {id}});
        if( category ){
            await category.update({ name, product_category_id });
            res.status(200).json({
                message: `La categoría ha sido modificada correctamente.`,
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
            message: 'No se ha guardado la categoría.',
            data: {},
            error: true
        });
    }
}

/**
    Método que elimina una categoría de producto.
    Ruta: '/api/product_categories/:id?'
    Method: DELETE
**/
const deleteCategory = async (req, res) => {
    if( req.params.id === undefined ){
        res.status(404).json({
            message: 'La categoría especificada no es válida.',
            data: {},
            error: true
        });
    } else {
        const {id} = req.params;

        try {
            const affectedRows = await ProductCategory.destroy({ where: {id}});

            res.status(200).json({
                message: `La categoría ha sido eliminada correctamente.`,
                data: {affectedRows},
                error: false
            });
        } catch (error) {
            console.log(error);

            res.json({
                message: 'No se ha podido eliminar la categoría.',
                data: {},
                error: true
            });
        }
    }
}

/**
    Método que deshabilita una categoría de producto.
    Ruta: '/api/product_categories/disable/:id?'
    Method: POST
**/
const disableCategory = async (req, res) => {
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
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    disableCategory
};