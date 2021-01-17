const MongodbInterface = require('../user-info/mongodb-interface');

const db = 'share-your-smile-user';
const userCollection = new MongodbInterface(db, 'host_users');

const user = (req, res) => {
  const data = {
    user: req.decoded.user,
    id: req.decoded._id,
    email: req.decoded.email,
  }
  res.status(200).send(data);
};

module.exports = user;