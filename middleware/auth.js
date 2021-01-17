const jwt = require('jsonwebtoken');

// ➃認証用ミドルウェア
const auth = (req, res, next) => {
  // リクエストヘッダーからトークンの取得
  let token = '';
  if (req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else {
    return next('token none');
  }

  // トークンの検証
  jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
    if (err) {
      console.log('err');
      // 認証NGの場合
      next(err.message);
    } else {
      console.log('ok');
      // 認証OKの場合
      req.decoded = decoded;
      console.log(decoded);
      next();
    }
  });
}

module.exports = auth;