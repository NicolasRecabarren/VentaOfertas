import { Router } from 'express';

const router = Router();

const ProductCategoriesController = require('../controllers/product_categories.controller');

router.get('/:id?'    , ProductCategoriesController.getCategories );
router.post('/'       , ProductCategoriesController.createCategory );
router.put('/:id?'    , ProductCategoriesController.updateCategory );
router.delete('/:id?' , ProductCategoriesController.deleteCategory );
router.post('/disable/:id?', ProductCategoriesController.disableCategory);

export default router;