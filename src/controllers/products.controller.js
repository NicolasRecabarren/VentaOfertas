const path = require('path');
const fs = require('fs');

import multer from 'multer';

const productImagesPath = path.join( path.dirname(require.main.filename), 'public', 'img', 'products');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const imagesPath = path.join( productImagesPath, req.body.code);
        if(!fs.existsSync( imagesPath )){
            fs.mkdirSync( imagesPath );
        }
        
        cb(null, imagesPath);
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Models
import {Brand} from '../models/Brand';
import {Product} from '../models/Product';
import ProductImage from '../models/ProductImage';

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
        result = await Brand.findOne({where: id});
    }

    res.status(200)
        .json({
            data: result,
            message: '',
            error: false
        })
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
            include: Brand
        });
    }

    res.status(200)
        .json({
            data: result,
            message: '',
            error: false
        })
};

/**
    Método que crea un producto en la base de datos.
    Ruta: '/api/products'
    Method: POST
**/
const createProduct = async (req, res) => {
    let upload = multer({ storage }).array('image',2);
    
    upload( req, res, err => {
        console.log(req);
    });
    
    const { sku, code, name, description, price, tax, offer_price, offer_percentage, product_category_id, brand_id, stock } = req.body;
    
    try {
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
            stock
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
                'stock'
            ]
        });

        if( createdProduct ){
            res.json({
                message: 'Producto creado correctamente.',
                data: createdProduct,
                error: false
            });
        }
    } catch (error) {
        res.status(200)
            .json({
                data: {},
                message: 'No se ha guardado el producto.',
                error: true
            })
    }
}

module.exports = {
    getBrands,
    getProducts,
    createProduct
}