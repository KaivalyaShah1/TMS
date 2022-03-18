import { Router } from 'express';
import {
  createEnquiry,
  deleteEnquiry,
  getEnquiries,
  getEnquiry,
  updateEnquiry,
} from '../../controllers/enquiries/index.js';
var router = Router();

router.get('/', getEnquiries);
router.get('/:id', getEnquiry);
router.post('/', createEnquiry);
router.patch('/:id', updateEnquiry);
router.delete('/:id', deleteEnquiry);

export default router;
