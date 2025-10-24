const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const patientController = require('../controllers/patientController');

// GET own profile
router.get('/me', authenticateToken, authorizeRoles('patient'), patientController.getProfile);

// GET own appointments
router.get('/appointments', authenticateToken, authorizeRoles('patient'), patientController.getAppointments);

// Book appointment
router.post('/appointments', authenticateToken, authorizeRoles('patient'), patientController.bookAppointment);

// Upload insurance doc
router.post('/insurance/upload', authenticateToken, authorizeRoles('patient'), upload.single('file'), patientController.uploadInsurance);

// List insurance docs
router.get('/insurance', authenticateToken, authorizeRoles('patient'), patientController.listInsurance);

module.exports = router;