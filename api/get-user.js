const { validationResult } = require('express-validator');
const MongodbInterface = require('./mongodb-interface');

const db = 'test_db';
const userCollection = new MongodbInterface(db, 'test_users');

// ユーザ取得
const getUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array()});
  }

  try {
    // DB接続
    await userCollection.connectDataBase();

    // email情報でユーザ情報取得
    const userInfo = await userCollection.getDocument("email",req.body.email);
    if (userInfo === null) {
      throw new Error("NO_USER");
    }

    // パスワード確認
    if (req.body.password !== userInfo.password) {
      throw new Error("PASSWORD_UNMATCH");
    }

    res.status(200);
    res.send({
      name: userInfo.name,
      id: userInfo._id,
      email: userInfo.email
    });

  } catch {
    res.status(400);
    res.send({
      error_message: err.message
    });
  }
}

module.exports = getUser;