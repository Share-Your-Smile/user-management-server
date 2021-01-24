const QRcode = require('qrcode');

const generateUrl = (url, id) => {
  console.log(`${url}?id=${id}`);
  return `${url}?id=${id}`;
}

const getBySvg = (req, res, url) => {
  const options = {
    type: 'svg'
  }
  QRcode.toString(url, options, function (err, str) {
    res.status(200);
    res.type('json');
    res.send({
      result: str,
      url: url
    });
  });
}

const getByBase64 = (req, res, url) => {
  console.log('base 64');
  QRcode.toDataURL(url, function (err, str) {
    if (err !== null) {
      throw new Error('GET_ERROR');
    }
    res.status(200);
    res.type('json');
    res.send({
      result: str,
      url: url
    });
  });
}

const generateQrcode = (req, res) => {
  // req.decoded.idにホストIDが入っているので、それをベースにurl生成する
  try {
    const url = generateUrl(req.body.url, req.decoded.id);
    switch (req.body.type) {
      case 'svg':
        getBySvg(req, res, url);
        break;
      case 'base64':
        getByBase64(req, res, url);
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