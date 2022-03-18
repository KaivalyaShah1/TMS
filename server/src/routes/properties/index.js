import { Router } from 'express';
import { createProperty } from '../../controllers/properties/create-property.js';
import { deleteProperty } from '../../controllers/properties/delete-property.js';
import { getProperties } from '../../controllers/properties/get-properties.js';
import { getProperty } from '../../controllers/properties/get-property.js';
import {
  addImagesProperty,
  deleteImagesProperty,
} from '../../controllers/properties/image-property.js';
import { updateProperty } from '../../controllers/properties/update-property.js';
import { verifyToken } from '../../middlewares/auth.middleware.js';

var router = Router();

router.get('/', getProperties);

router.post('/', verifyToken, createProperty);

router.get('/:id', getProperty);

router.patch('/:id', verifyToken, updateProperty);

router.delete('/:id', verifyToken, deleteProperty);

router.post('/upload/images/:id', verifyToken, addImagesProperty);

router.delete('/upload/images/:id', verifyToken, deleteImagesProperty);

export default router;
