const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const MongodbInterface = require('../common/interface/mongodb');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

const login = async (req, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array()});
    res.status(422);
    res.type('json');
    res.send({
      errors: errors.array(),
    });
    return;
  }

  try {

    const reqEmail = req.body.email;
    const reqPass = req.body.password;

    // DB接続
    await userCollection.connectDataBase();

    // email情報でユーザ情報取得
    const userInfo = await userCollection.getDocument("email",req.body.email);
    if (userInfo === null) {
      throw new Error('NO_USER');
    }

    // パスワード確認
    if (req.body.password !== userInfo.password) {
      throw new Error('PASSWORD_UNMATCH');
    }

    // メールアドレス、パスワードを取得し、DBとの整合性を確認する
    const payload = {
      user: userInfo.name,
      id: userInfo._id,
      email: reqEmail,
      password: reqPass,
    };

    const option = {
        expiresIn: '1m'
    }
    const token = jwt.sign(payload, process.env.SECRET_KEY, option);
    res.json({
        message: "create token",
        token: token
    });

  } catch(err) {
    console.log('catch error');
    res.status(400);
    res.type('json');
    res.send({
      error_message: err.message
    });
  }
};

module.exports = login;