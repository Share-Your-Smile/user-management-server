const MongodbInterface = require('./mongodb-interface');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

// ユーザ取得
const getAllUser = async (req, res) => {
  try {
    // DB接続
    await userCollection.connectDataBase();

    // email情報でユーザ情報取得
    const userAllInfo = await userCollection.getAllDocuments();
    if (userAllInfo === null) {
      throw new Error("NO_USER");
    }

    let resUserAllInfo = [];

    for (let i = 0; i < userAllInfo.length; i++) {
      const userInfo = {
        name: userAllInfo[i].name,
        id: userAllInfo[i]._id,
        email: userAllInfo[i].email
      }
      resUserAllInfo.push(userInfo);
    }

    res.status(200);
    res.send(resUserAllInfo);

  } catch {
    res.status(400);
    res.send({
      error_message: err.message
    });
  }
}

module.exports = getAllUser;