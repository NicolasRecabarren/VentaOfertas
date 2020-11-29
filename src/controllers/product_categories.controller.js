import response from './response.controller';
import { Product, ProductCategory } from '../models';

/**
    Método que obtiene las categorías de productos creadas.
    Si se especifica un ID devolverá un solo un objeto con la categoría que se haya encontrado.
    Ruta: '/api/product_categories/:id?'
    Method: GET
**/
const getCategories = async (req, res) => {

    let result = [];
    if( req.params.id === undefined ){
        result = await ProductCategory.findAll({
            where: {product_category_id: null},
            include: ProductCategory
        });

    } else {
        const { id } = req.params;
        result = await ProductCategory.findOne({where: {id}});
    }
    
    return response.sendJson(res, 'Información recuperada.', result, 200);
}

/**
    Método que crea una categoría de producto en la base de datos.
    Ruta: '/api/product_categories'
    Method: POST
**/
const createCategory = async (req, res) => {
    try {
        const { name, product_category_id, priority, icon } = req.body;

        // Si la categoría del producto viene en el JSON, debemos validar que esa categoría exista.
        if( product_category_id != null){
            const result = await ProductCategory.findOne({where: {id: product_category_id}});
            if( result === null )
                return response.sendJson(res, 'La categoría no fue encontrada.', {}, 404);
        }
        
        // Creamos la categoría en la base de datos.
        const createdAt = new Date();
        const createdCategory = await ProductCategory.create(
            {name,product_category_id,priority,icon,createdAt},
            {fields: ['name','product_category_id','priority','icon','createdAt']}
        );
        if( createdCategory ){
            return response.sendJson(res, `Categoría creada correctamente.`, createdCategory, 200);
        }

    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado la categoría.');
    }
}

/**
    Método que actualiza una categoría de productos en la base de datos.
    Ruta: '/api/product_categories/:id?'
    Method: PUT
**/
const updateCategory = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);

    try {
        const { id } = req.params;
        const { name, product_category_id, priority, icon } = req.body;

        // Si la categoría del producto viene en el JSON, debemos validar que esa categoría exista.
        if( product_category_id != null){
            const result = await ProductCategory.findOne({where: {id: product_category_id}});
            if( result === null )
                return response.sendJson(res, 'La categoría no fue encontrada.', {}, 404);
        }
        
        // Validamos que la categoría exista
        const category = await ProductCategory.findOne({ where: {id}});
        if( !category ){
            return response.sendJson(res, 'Categoría no encontrada.', {}, 404);
        }

        const updatedAt = new Date();
        await category.update({
            name,
            priority,
            icon,
            product_category_id,
            updatedAt
        });
        return response.sendJson(res, `La categoría ha sido modificada correctamente.`, category, 200);
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado la categoría.');
    }
}

/**
    Método que elimina una categoría de producto.
    Ruta: '/api/product_categories/:id?'
    Method: DELETE
**/
const deleteCategory = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);

    try {
        const {id} = req.params;

        // Validamos que la categoría exista.
        const category = await ProductCategory.findOne({ where: {id}});
        if( !category ){
            return response.sendJson(res, 'Categoría no encontrada.', {}, 404);
        }

        // Validamos que la categoría no tenga categorías hijas.
        const validaProductCategory = await ProductCategory.findAll({where: {product_category_id: id}});
        if( validaProductCategory.length > 0 )
            return response.sendJson(res,'No se puede eliminar la categoría debido a que tiene otras categorías asociadas.');
        
        // Validamos que la categoría no tenga productos asociados.
        const validaProducts = Product.findAll({where: {product_category_id: id}});
        if( validaProducts.length > 0 )
            return response.sendJson(res,'No se puede eliminar la categoría debido a que tiene productos asociados.');

        const affectedRows = await ProductCategory.destroy({ where: {id}});
        return response.sendJson(res,'La categoría ha sido eliminada correctamente.',{affectedRows},200);

    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha podido eliminar la categoría.');
    }
}

/**
    Método que deshabilita una categoría de producto.
    Ruta: '/api/product_categories/disable/:id?'
    Method: POST
**/
const disableCategory = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    
    try {
        const { id } = req.params;

        // Validamos que la categoría exista
        const category = await ProductCategory.findOne({ where: {id}});
        if( !category ){
            return response.sendJson(res, 'Categoría no encontrada.', {}, 404);
        }

        const deletedAt = category.deletedAt === null ? new Date() : null;
        await category.update({ deletedAt });

        return response.sendJson(res, 
            `La categoría ha sido ${deletedAt === null ? "activada" : "desactivada"} correctamente.`,
            category, 200
        );
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha podido desactivar la categoría.');
    }
}

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    disableCategory
};