import { Router } from 'express';

const router = Router();

const ProductsController = require('../controllers/products.controller');

router.get('/:id?'    , ProductsController.getPosts );
router.post('/'       , ProductsController.createPost );
router.put('/:id?'    , ProductsController.updatePost );
router.delete('/:id?' , ProductsController.deletePost );

export default router;