const express = require('express');
const registerUser = require('../api/admin/register-user');
const getUser = require('../api/admin/get-user');
const getAllUser = require('../api/admin/get-all-user');
const { body } = require('express-validator');
const router = express.Router();

const nameValidator = body('name').isString();
const emailValidator = body('email').isEmail();
const passwordValidator = body('password').isLength({min: 5});

// regist user info
router.post('/', [
  nameValidator,
  emailValidator,
  passwordValidator
], registerUser);

router.post('/one', [
  emailValidator,
  passwordValidator
], getUser);

router.get('/all', getAllUser);

module.exports = router;