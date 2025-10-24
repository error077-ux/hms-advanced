const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const adminController = require('../controllers/adminController');

router.get('/departments', authenticateToken, authorizeRoles('admin', 'director'), adminController.listDepartments);
router.post('/departments', authenticateToken, authorizeRoles('admin', 'director'), adminController.addDepartment);
router.get('/staff', authenticateToken, authorizeRoles('admin', 'director'), adminController.listStaff);
router.get('/analytics', authenticateToken, authorizeRoles('admin', 'director'), adminController.analytics);

module.exports = router;