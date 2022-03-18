import { Router } from 'express';
import { register } from '../../controllers/auth/register.js';
import { signIn } from '../../controllers/auth/signin.js';

var router = Router();

router.post('/register', register);

router.post('/signin', signIn);

export default router;
