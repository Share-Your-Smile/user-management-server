const express = require('express');
const generateQrcode = require('../api/qrcode/generate-qrcode');
const router = express.Router();

const auth = require('../middleware/auth');

router.post('/', auth, generateQrcode);

module.exports = router;