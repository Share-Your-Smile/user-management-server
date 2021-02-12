const express = require('express');
const sendMail = require('../api/contact/send-mail');

const router = express.Router();

router.post('/mail', sendMail);

module.exports = router;