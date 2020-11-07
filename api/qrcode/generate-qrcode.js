const QRcode = require('qrcode');

const generateQrcode = (req, res) => {
  try {
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
    })
  } catch (err) {
    res.status(400);
    res.type('json');
    res.send({
      error_messages: err.message
    });
  }
}

module.exports = generateQrcode;