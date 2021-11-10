const router = require('express').Router();
import { GLOBAL } from "./constants";
const { api } = GLOBAL;

// routes
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';
import postRoutes from './api/routes/post.routes';
import likeRoutes from './api/routes/like.routes';

const baseEndpoint = `/api${api.version}`;

const authEndpoint = baseEndpoint + api.endpoint.auth;
const usersEndpoint = baseEndpoint + api.endpoint.users;
const postsEndpoint = baseEndpoint + api.endpoint.posts;
const likesEndpoint = baseEndpoint + api.endpoint.likes;

// REST RESOURCES
router.use(authEndpoint, authRoutes);
router.use(usersEndpoint, userRoutes);
router.use(postsEndpoint, postRoutes);
router.use(likesEndpoint, likeRoutes);

module.exports = router;