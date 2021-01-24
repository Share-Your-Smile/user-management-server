const MongodbInterface = require('../../common/interface/mongodb');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

const user = (req, res) => {
  const data = {
    user: req.decoded.user,
    id: req.decoded.id,
    email: req.decoded.email,
  }
  res.status(200).send(data);
};

module.exports = user;