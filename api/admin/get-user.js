const { validationResult } = require('express-validator');
const MongodbInterface = require('../common/interface/mongodb');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

// ユーザ取得
const getUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(422);
    res.type('json');
    res.send({
      errors: errors.array()
    });
    return;
  }

  try {
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

    res.status(200);
    res.type('json');
    res.send({
      name: userInfo.name,
      id: userInfo._id,
      email: userInfo.email
    });

  } catch(err) {
    console.log('catch error');
    res.status(400);
    res.type('json');
    res.send({
      error_message: err.message
    });
  }
}

module.exports = getUser;