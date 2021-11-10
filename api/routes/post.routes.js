import { Router } from 'express';
import { isAuthMd } from '../../middlewares/auth.middleware';
import { createPost, getAllPosts, getOnePost, updateOnePost, deleteOnePost, deleteAllPosts } from '../controllers/post.controller';
const router = Router();

//Rutas /api/posts/
router.post('/', isAuthMd, createPost)
router.get('/', isAuthMd, getAllPosts);
router.get('/:id', isAuthMd, getOnePost);
router.put('/:id', isAuthMd, updateOnePost);
router.delete('/:id', isAuthMd, deleteOnePost);
router.delete('/', isAuthMd, deleteAllPosts);

export default router;
