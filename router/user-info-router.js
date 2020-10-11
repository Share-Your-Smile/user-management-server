var express = require('express');
const registUser = require('../api/regist-user');
const getUser = require('../api/get-user');
const getAllUser = require('../api/get-all-user');
const { body } = require('express-validator');
var router = express.Router();

const nameValidator = body('name').isString();
const emailValidator = body('email').isEmail();
const passwordValidator = body('password').isLength({min: 5});

// regist user info
router.post('/', [
  nameValidator,
  emailValidator,
  passwordValidator
], registUser);

router.get('/', [
  emailValidator,
  passwordValidator
], getUser);

router.get('/all', getAllUser);

module.exports = router;