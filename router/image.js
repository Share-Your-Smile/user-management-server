const express = require('express');
const getImage = require('../api/image/get-image');
const setImage = require('../api/image/set-image');
const getList = require('../api/image/list/get-list');
const router = express.Router();

// GET api/:userId/image/:fileName
router.get('/:hostId/:fileName', getImage);

// POST api/:userId/image/:fileName
router.post('/:hostId', setImage);

// GET api/:userId/list
router.get('/list/:hostId',getList);

module.exports = router;