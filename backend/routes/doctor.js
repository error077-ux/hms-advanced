const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const doctorController = require('../controllers/doctorController');

// Get doctor's own profile
router.get('/me', authenticateToken, authorizeRoles('doctor'), doctorController.getProfile);

// Get doctor's appointments
router.get('/appointments', authenticateToken, authorizeRoles('doctor'), doctorController.getAppointments);

// Add prescription
router.post('/prescriptions', authenticateToken, authorizeRoles('doctor'), doctorController.addPrescription);

// Request lab test
router.post('/lab-tests', authenticateToken, authorizeRoles('doctor'), doctorController.requestLabTest);

// Request radiology test
router.post('/radiology-tests', authenticateToken, authorizeRoles('doctor'), doctorController.requestRadiologyTest);

module.exports = router;