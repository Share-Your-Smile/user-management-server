const S3 = require('../../common/interface/s3');

const getList = async (req, res) => {
  const s3 = new S3();


  try {
    const userId = req.params.hostId;

    const filePath = s3.setS3FolderPath(req.decoded.id, userId);

    const list = await s3.getImagesList(filePath);

    res.status(200);
    res.send(list);

  } catch (err) {
    res.status(400);
    res.send({
      message: err
    });
  }
};

module.exports = getList;