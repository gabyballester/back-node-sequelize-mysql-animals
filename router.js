const router = require('express').Router();

// routes
import authRoutes from './api/routes/auth.routes';
import userRoutes from './api/routes/user.routes';

// REST RESOURCES
router.use('/auth', authRoutes);
router.use('/api/users', userRoutes);

module.exports = router;
