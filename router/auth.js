const express = require('express');
const login = require('../api/auth/login');
const user = require('../api/auth/user');

const auth = require('../middleware/auth');

const { body } = require('express-validator');
const emailValidator = body('email').isEmail();
const passwordValidator = body('password').isLength({min: 5});

const router = express.Router();

router.post('/login', [
  emailValidator,
  passwordValidator
], login);
router.get('/user', auth, user);

module.exports = router;