import { Router } from 'express';
const router = Router();

const CustomersController = require('../controllers/customers.controller');

router.get('/:id?'    , CustomersController.getCustomers );
router.post('/'       , CustomersController.createCustomer );
router.put('/:id?'    , CustomersController.updateCustomer );
/*router.delete('/:id?' , CustomersController.deleteCustomer );*/

export default router;