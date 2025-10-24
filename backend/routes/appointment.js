const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const appointmentController = require('../controllers/appointmentController');

// List all appointments (role-based)
router.get('/', authenticateToken, appointmentController.getAll);
// Update appointment status
router.patch('/:id/status', authenticateToken, authorizeRoles('doctor', 'admin'), appointmentController.updateStatus);

module.exports = router;