const express = require('express');
const getImage = require('../api/image/get-image');
const setImage = require('../api/image/set-image');
const getList = require('../api/image/list/get-list');

const auth = require('../middleware/auth');

const router = express.Router();

// GET api/:userId/image/:fileName
router.get('/images/:hostId/:fileName', auth, getImage);

// POST api/:userId/image/:fileName
router.post('/images/:hostId', setImage);

// GET api/:userId/list
router.get('/list/:hostId', auth, getList);

module.exports = router;