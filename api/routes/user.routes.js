import { Router } from 'express';
const router = Router();

import { getAllUsers, getOneUser, updateOneUser, deleteOneUser, deleteAllUsers } from '../controllers/user.controller';
import { isAuthMd } from '../../middlewares/auth.middleware';

//Rutas /api
router.get('/', isAuthMd, getAllUsers);
router.get('/:id', isAuthMd, getOneUser);	
router.put('/:id', isAuthMd, updateOneUser);
router.delete('/', isAuthMd, deleteAllUsers);
router.delete('/:id', isAuthMd, deleteOneUser);

export default router;