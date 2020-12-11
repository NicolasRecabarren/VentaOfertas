import { Router } from 'express';
const router = Router();

const UsersController = require('../controllers/users.controller');

router.get('/:id?'    , UsersController.getUsers );
router.post('/login'  , UsersController.login      );
router.post('/logout' , UsersController.logout     );
router.post('/'       , UsersController.createUser );
router.put('/:id?'    , UsersController.updateUser );
router.delete('/:id?' , UsersController.deleteUser );

export default router;