const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const radiologyController = require('../controllers/radiologyController');

router.get('/', authenticateToken, authorizeRoles('radiology', 'admin'), radiologyController.getAllScans);
router.patch('/:id/result', authenticateToken, authorizeRoles('radiology'), radiologyController.updateResult);
router.post('/:id/report', authenticateToken, authorizeRoles('radiology'), upload.single('file'), radiologyController.uploadReport);

module.exports = router;