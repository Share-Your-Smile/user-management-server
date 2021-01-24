const { response } = require('express');
const S3 = require('../common/interface/s3');

// GET api/image/:userId/:fileName
const getImage = async (req, res) => {
  const s3 = new S3();

  try {
    const hostId = req.params.hostId;
    const fileName = req.params.fileName;

    const response = await s3.getImage(hostId, fileName);

    res.status(200);
    res.type(response.ContentType);
    res.send(response.Body);
  } catch(err) {
    res.status(400);
    res.send({
      message: err
    });
  }

};

module.exports = getImage;