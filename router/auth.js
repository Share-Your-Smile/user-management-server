const express = require('express');
const login = require('../api/auth/login');
const getUser = require('../api/auth/user/get-user');
const setUser = require('../api/auth/user/set-user');

const auth = require('../middleware/auth');

const { body } = require('express-validator');
const nameValidator = body('name').isString();
const emailValidator = body('email').isEmail();
const passwordValidator = body('password').isLength({min: 5});

const router = express.Router();

router.post('/login', [
  emailValidator,
  passwordValidator
], login);

router.get('/user', auth, getUser);

router.post('/user', [
  nameValidator,
  emailValidator,
  passwordValidator
], setUser);

module.exports = router;