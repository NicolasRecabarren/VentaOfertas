import { Router } from 'express';

const router = Router();
const FilesController = require('../controllers/files.controller');

router.post('/upload_images', FilesController.uploadImages );
//router.post('/upload_files' , FilesController.uploadFiles  );

export default router;