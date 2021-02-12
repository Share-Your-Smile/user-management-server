const nodemailer = require('nodemailer');

const transporter = () => {
  return nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    post: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  })
}

const sendMail = async (req, res) => {
  try {

    const myTransporter = transporter();

    const data = {
      from: req.body.from,
      to: process.env.MAIL_ADDRESS,
      subject: `[Share Your Smile]${req.body.name}様 問い合わせメール(${req.body.from})`,
      text: req.body.contents,
    };

    console.log(data);

    await myTransporter.sendMail(data);

    res.status(200);
    res.type('json');
    res.send({
      result: 'OK'
    });
  } catch (err) {
    console.log(err);
    res.status(400);
    res.type('json');
    res.send({
      result: 'NG'
    });
  }
}

module.exports = sendMail;