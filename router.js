const router = require('express').Router();

// routes
import authRoutes from './api/routes/auth.routes';

// REST RESOURCES
router.use('/auth', authRoutes);

module.exports = router;
