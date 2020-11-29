import { Router } from 'express';

const router = Router();

const ProductsController = require('../controllers/products.controller');

router.get('/getBrands/:id?', ProductsController.getBrands);
router.get('/:id?'    , ProductsController.getProducts    );
router.post('/'       , ProductsController.createProduct  );
router.put('/:id?'    , ProductsController.updateProduct  );
router.delete('/:id?' , ProductsController.disableProduct );

export default router;