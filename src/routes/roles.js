import { Router } from 'express';
import Role from '../models/Role';
const router = Router();

const RolesController = require('../controllers/roles.controller');

router.get('/:id?', RolesController.getRoles);

export default router;