const path = require('path');
const fs = require('fs');

import response from './response.controller';
import multer from 'multer';
import { Product, ProductImage, Slider } from '../models';

const filesPath = {
    images: path.join( path.dirname(require.main.filename), 'public', 'img')
};

/**
 * 1. Aquí podemos crear la estructura de carpetas para guardar las imagenes.
 * 2. Aquí podemos modificar el nombre de las imagenes que se están guardando.
 */
const storageImages = multer.diskStorage({
    destination: function(req, file, cb) {

        if(!fs.existsSync( filesPath.images )){
            fs.mkdirSync( filesPath.images );
        }

        const subfolder = path.join( filesPath.images, req.body.type );
        if(!fs.existsSync( subfolder )){
            fs.mkdirSync( subfolder );
        }

        const imagesPath = path.join( subfolder, req.body.code);
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

const imageFilter = (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Solo se permiten imágenes';
        return cb(new Error('Solo se permiten imágenes'), false);
    }

    cb(null, true);
};

/**
    Método que sube imagenes al servidor.
    Ruta: '/api/files/upload_images'
    Method: POST
**/
const uploadImages = (req, res) => {
    const upload = multer({ storage: storageImages/*, fileFilter: imageFilter*/ }).array('image',10);
    
    upload( req, res, err => {
        
        if( req.body.type === 'products' ){
            req.files.forEach( async (element) => {
                const product = await Product.findOne({ where: {code: req.body.code }});
                ProductImage.create(
                    {image: element.filename, product_id: product.id},
                    {fields: ['image','product_id']
                });
            });
        }

        response.sendJson(res, 'Imagenes guardadas correctamente.', {}, 200);
    });
}

/**
    Método que sube archivos (pdf, docs, etc) al servidor.
    Ruta: '/api/files/upload_files'
    Method: POST
**/
const uploadFiles = (req, res) => {
    response.sendJson(res);
}

module.exports = {
    uploadImages,
    uploadFiles
}