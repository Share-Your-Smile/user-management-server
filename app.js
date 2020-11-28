let express = require('express');
let app = express();
let cors = require('cors');

let userInfoRouter = require('./router/user-info-router');
const qrcodeGeneratorRouter = require('./router/qrcode-generator-router');

app.use(cors());

app.use(express.json());

app.use('/admin', express.static('public'));

app.get('/', function(req, res) {
  res.type('json');
  res.send({message: 'Hello World!'});
});

app.use('/user-info', userInfoRouter);

app.use('/qrcode', qrcodeGeneratorRouter);

app.listen(process.env.PORT || 3010, function() {
  console.log('Example app listening on port 3010!');
});