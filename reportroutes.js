const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/upload', authMiddleware, upload.single('report'), reportController.uploadAndAnalyzeReport);

module.exports = router;