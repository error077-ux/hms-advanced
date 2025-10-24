const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const labController = require('../controllers/labController');

router.get('/', authenticateToken, authorizeRoles('lab', 'admin'), labController.getAllTests);
router.patch('/:id/result', authenticateToken, authorizeRoles('lab'), labController.updateResult);
router.post('/:id/report', authenticateToken, authorizeRoles('lab'), upload.single('file'), labController.uploadReport);

module.exports = router;