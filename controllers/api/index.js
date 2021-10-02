const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const dashboardRoutes = require('./dashboardRoutes')
// const projectRoutes = require('./projectRoutes');

router.use('/users', userRoutes);
// router.use('/dashboard', dashboardRoutes);
// router.use('/projects', projectRoutes);

module.exports = router;