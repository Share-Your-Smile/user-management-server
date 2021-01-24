const { validationResult } = require('express-validator');
const MongodbInterface = require('../common/interface/mongodb');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');
const counterCollection = new MongodbInterface(db, 'counter');

// ユーザ登録
// 情報にかぶりがないかどうか確認する
const registUser = async (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // return res.status(422).json({ errors: errors.array()});
    res.status(422);
    res.type('json');
    res.send({
      errors: errors.array()
    });
    return;
  }
  // console.log('test');

  try {
    // DB接続
    await userCollection.connectDataBase();
    await counterCollection.connectDataBase();

    // ユーザ重複確認.同じEmailアドレスは禁止する
    const doc = await userCollection.getDocument("email",req.body.email);
    if (doc !== null) {
      throw new Error('SAME_USER_EXIST');
    }

    // idを生成
    // カウンタコレクションから現在のid数を取得
    const counterInfo = await counterCollection.getDocument("_id",1);
    if (counterInfo === null) {
      throw new Error('NO_COUNTER');
    }

    let totalUserNum = counterInfo.totalUserNum;
    let newUserId = totalUserNum + 1;
    let userInfo = null;

    // カウンタコレクションの整合性
    do {
      console.log()
      userInfo = await userCollection.getDocument("_id", newUserId);
      // あれば加算して検索。ない場合までループ
      if (userInfo !== null) {
        console.log(`unmatch! ${newUserId}`);
        newUserId++;
      }
    } while (userInfo !== null);

    // ユーザ登録
    const document = {
      _id: newUserId,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    };
    await userCollection.addDocument(document);

    // カウンタコレクションにも1を加算
    await counterCollection.updateDocument("_id",1,"totalUserNum",newUserId);

    // DB切断
    await userCollection.closeClient();
    await counterCollection.closeClient();

    res.status(201);
    res.type('json');
    res.send({
      result: 'OK',
      id: newUserId
    });

  } catch (err) {
    res.status(400);
    res.type('json');
    res.send({
      error_message: err.message
    });
  }
}

module.exports = registUser;