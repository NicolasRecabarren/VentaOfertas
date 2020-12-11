import { Router } from 'express';

const router = Router();
const RolesController = require('../controllers/roles.controller');

router.get('/:id?', RolesController.getRoles);

export default router;