const express = require('express');
const app = express();
const cors = require('cors');

const userInfoRouter = require('./router/user-info-router');
const qrcodeGeneratorRouter = require('./router/qrcode-generator-router');
const auth = require('./router/auth');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/admin', express.static('public'));

app.get('/', function(req, res) {
  res.type('json');
  res.send({message: 'Hello World!'});
});

app.use('/', auth);
app.use('/user-info', userInfoRouter);
app.use('/qrcode', qrcodeGeneratorRouter);

// ➅エラーハンドリング
app.use((err, req, res, next)=>{
  res.status(500).send(err);
})

app.listen(process.env.PORT || 3010, function() {
  console.log('Example app listening on port 3010!');
});