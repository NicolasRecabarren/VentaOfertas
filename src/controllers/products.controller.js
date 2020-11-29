import response from './response.controller';
import { Brand, Product, ProductCategory, ProductImage } from '../models';

/**
    Método que obtiene las marcas disponibles para los productos.
    Si se especifica un ID devolverá un solo un objeto con la marca que se haya encontrado.
    Ruta: '/api/products/getBrands/:id?'
    Method: GET
**/
const getBrands = async (req, res) => {
    let result = [];
    
    if( req.params.id === undefined ){
        result = await Brand.findAll();
    } else {
        const { id } = req.params;
        result = await Brand.findOne({where: {id}});
    }

    return response.sendJson(res, 'Información recuperada.', result, 200);
};

/**
    Método que obtiene los productos creados.
    Si se especifica un ID devolverá un solo un objeto con el producto que se haya encontrado.
    Ruta: '/api/products/:id?'
    Method: GET
**/
const getProducts = async (req, res) => {
    let result = [];
    if( req.params.id === undefined ){
        result = await Product.findAll({
            include: Brand
        });
    } else {
        const { id } = req.params;
        result = await Product.findOne({
            where: {id},
            include: [Brand, ProductImage]
        });
    }

    return response.sendJson(res, 'Información recuperada.', result, 200);
};

/**
    Método que crea un producto en la base de datos.
    Ruta: '/api/products'
    Method: POST
**/
const createProduct = async (req, res) => {
    try {
        const { sku, code, name, description, price, tax, offer_price, offer_percentage, product_category_id, brand_id, stock } = req.body;
        
        // Validamos que exista la categoría del producto.
        if( product_category_id != null){
            const validaProductCategory = await ProductCategory.findOne({where: {id: product_category_id}});
            if( validaProductCategory === null )
                return response.sendJson(res, 'La categoría asociada no fue encontrada.', {}, 404);
        }

        // Validamos que exista la marca del producto.
        if( brand_id != null){
            const validaBrand = await Brand.findOne({where: {id: brand_id}});
            if( validaBrand === null )
                return response.sendJson(res, 'La marca asociada no fue encontrada.', {}, 404);
        }

        const validaProduct = await Product.findOne({ where: {code} });
        if( validaProduct !== null )
            return response.sendJson(res, 'El producto ya está creado en nuestros registros.', validaProduct, 500);

        const createdAt = new Date();
        // Creamos el producto en la base de datos.
        const createdProduct = await Product.create({
            sku,
            code,
            name,
            description,
            price,
            tax,
            offer_price,
            offer_percentage,
            product_category_id,
            brand_id,
            stock,
            createdAt
        }, {
            fields: [
                'sku',
                'code',
                'name',
                'description',
                'price',
                'tax',
                'offer_price',
                'offer_percentage',
                'product_category_id',
                'brand_id',
                'stock',
                'createdAt'
            ]
        });

        if( createdProduct ){
            return response.sendJson(res, `Producto guardado correctamente.`, createdProduct, 200);
        }
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado el producto.');
    }
}

/**
    Método que actualiza una categoría de productos en la base de datos.
    Ruta: '/api/products/:id?'
    Method: PUT
**/
const updateProduct = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);

    try {
        const { id } = req.params;
        const { sku, code, name, description, price, tax, offer_price, offer_percentage, product_category_id, brand_id, stock } = req.body;

        // Validamos que exista la categoría del producto.
        if( product_category_id != null){
            const validaProductCategory = await ProductCategory.findOne({where: {id: product_category_id}});
            if( validaProductCategory === null )
                return response.sendJson(res, 'La categoría asociada no fue encontrada.', {}, 404);
        }

        // Validamos que exista la marca del producto.
        if( brand_id != null){
            const validaBrand = await Brand.findOne({where: {id: brand_id}});
            if( validaBrand === null )
                return response.sendJson(res, 'La marca asociada no fue encontrada.', {}, 404);
        }

        // Validamos que la categoría exista
        const product = await Product.findOne({ where: {id}});
        if( !product ){
            return response.sendJson(res, 'Producto no encontrado.', {}, 404);
        }

        const updatedAt = new Date();
        await product.update({
            sku,
            code,
            name,
            description,
            price,
            tax,
            offer_price,
            offer_percentage,
            product_category_id,
            brand_id,
            stock,
            updatedAt
        });
        return response.sendJson(res, 'El producto ha sido modificado correctamente.', product, 200);
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha guardado el producto.');
    }
}

/**
    Método que deshabilita una categoría de producto.
    Ruta: '/api/products/:id?'
    Method: DELETE
**/
const disableProduct = async (req, res) => {
    if( req.params.id === undefined )
        return response.sendJson(res, 'El ID no ha sido especificado.', {}, 404);
    
    try {
        const { id } = req.params;

        // Validamos que el producto exista.
        const product = await Product.findOne({ where: {id}});
        if( !product ){
            return response.sendJson(res, 'Producto no encontrado.', {}, 404);
        }

        const deletedAt = product.deletedAt === null ? new Date() : null;
        await product.update({ deletedAt });

        return response.sendJson(res, 
            `El producto ha sido ${deletedAt === null ? "activado" : "desactivado"} correctamente.`,
            product, 200
        );
        
    } catch (error) {
        console.log(error);
        return response.sendJson(res, 'No se ha podido desactivar el producto.');
    }
}

module.exports = {
    getBrands,
    getProducts,
    createProduct,
    updateProduct,
    disableProduct
}