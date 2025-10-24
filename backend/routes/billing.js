const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const billingController = require('../controllers/billingController');

router.get('/', authenticateToken, authorizeRoles('patient'), billingController.getPatientBills);
router.patch('/:id/paid', authenticateToken, authorizeRoles('payment_officer', 'admin'), billingController.markAsPaid);
router.get('/export', authenticateToken, authorizeRoles('admin'), billingController.exportCSV);

module.exports = router;