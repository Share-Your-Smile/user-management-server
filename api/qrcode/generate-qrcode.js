const QRcode = require('qrcode');

const getBySvg = (req, res) => {
  const options = {
    type: 'svg'
  }
  console.log(req.body.url);
  QRcode.toString(req.body.url, options, function (err, str) {
    console.log('callback result');
    console.log(err);
    res.status(200);
    res.type('json');
    res.send({
      result: str
    });
  });
}

const getByBase64 = (req, res) => {
  QRcode.toDataURL(req.body.url, function (err, str) {
    if (err !== null) {
      throw new Error('GET_ERROR');
    }
    res.status(200);
    res.type('json');
    res.send({
      result: str
    });
  });
}

const generateQrcode = (req, res) => {
  try {
    switch (req.body.type) {
      case 'svg':
        getBySvg(req, res);
        break;
      case 'base64':
        getByBase64(req, res);
        break;
      default:
        throw new Error('TYPE_NOT_SET');
    }
    
  } catch (err) {
    if (err !== null) {
      throw new Error('GET_ERROR');
    }
    res.status(400);
    res.type('json');
    res.send({
      error_messages: err.message
    });
  }
}

module.exports = generateQrcode;