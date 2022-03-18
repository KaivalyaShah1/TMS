import { Router } from 'express';
import { register } from '../../controllers/auth/register.js';
import { signIn } from '../../controllers/auth/signin.js';
import { getUsers } from '../../controllers/user/get-users.js';

var router = Router();

router.get('/', getUsers);

export default router;
