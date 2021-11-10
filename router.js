const router = require('express').Router();
import { GLOBAL } from "./constants";
const { api } = GLOBAL;

// routes
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';
import postRoutes from './api/routes/post.routes';

const baseEndpoint = `/api${api.version}`;

const authEndpoint = baseEndpoint + api.endpoint.auth;
const usersEndpoint = baseEndpoint + api.endpoint.users;
const postsEndpoint = baseEndpoint + api.endpoint.posts;

// REST RESOURCES
router.use(authEndpoint, authRoutes);
router.use(usersEndpoint, userRoutes);
router.use(postsEndpoint, postRoutes);

module.exports = router;