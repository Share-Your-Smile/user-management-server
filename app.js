const express = require('express');
const app = express();
const cors = require('cors');

const adminRouter = require('./router/admin');
const qrcodeRouter = require('./router/qrcode');
const authRouter = require('./router/auth');
const imageRouter = require('./router/image');

app.use(cors());
app.use(express.json({ extended: true, limit: '20mb'}));
app.use(express.urlencoded({ extended: true, limit: '20mb'}));

app.use('/admin', express.static('public'));

app.get('/', function(req, res) {
  res.type('json');
  res.send({message: 'Hello World!'});
});

// 認証機能
app.use('/api/v1/', cors(), authRouter);
// ユーザー登録機能
app.use('/api/v1/admin', adminRouter);
// QRコードジェネレーター
app.use('/api/v1/qrcode', cors(), qrcodeRouter);
// 画像情報
// 画像情報APIはトークン認証しない。スライドショー画面でホストがログインし直すのはよろしくない
app.use('/api/v1/image', cors(), imageRouter);

// ➅エラーハンドリング
app.use((err, req, res, next)=>{
  res.status(500).send(err);
})

app.listen(process.env.PORT || 3010, function() {
  console.log('Example app listening on port 3010!');
});