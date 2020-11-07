const express = require('express');
const generateQrcode = require('../api/qrcode/generate-qrcode');
const router = express.Router();

router.post('/', generateQrcode);

module.exports = router;