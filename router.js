const router = require('express').Router();
import { GLOBAL } from "./constants";
const { auth, users } = GLOBAL.api.endpoint
const { version } = GLOBAL.api;

// routes
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';

// REST RESOURCES
router.use('/api' + version + auth, authRoutes);
router.use('/api' + version + users, userRoutes);

module.exports = router;
