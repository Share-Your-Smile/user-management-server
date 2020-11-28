const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const assert = require('assert');
require('dotenv').config();

module.exports = class MongodbInterface {
  constructor (db, collection) {
    // this.mongoURL = 'mongodb://127.0.0.1:27017';
    this.mongoURL = process.env.MONGODB_URL;
    this.dbName = db;
    this.collection = collection;
    this.client = undefined;
    this.db = undefined;
  }
  
  // connect mongodb
  async connectDataBase () {
    this.client = await MongoClient.connect(this.mongoURL);
    this.db = this.client.db(this.dbName);
  }

  // add document
  async addDocument (document) {
    await this.db.collection(this.collection).insertOne(document);
  }

  async getAllDocuments () {
    const docs = await this.db.collection(this.collection).find({}).toArray();
    console.log(docs);
    return docs;
  }

  async getDocumentCount () {
    const count = await this.db.collection(this.collection).find().count();
    return count;
  }

  async getDocument (field, value) {
    const query = {};
    query[field] = value;
    const doc = await this.db.collection(this.collection).findOne(query);
    // console.log(doc);
    return doc;
  }

  async deleteDocument (field, value) {
    const query = {};
    query[field] = value;
    await this.db.collection(this.collection).deleteOne(query);
  }

  async updateDocument (field, value, updateField, updateValue) {
    const query = {};
    query[field] = value;
    const updateQuery = {};
    updateQuery[updateField] = updateValue;
    await this.db.collection(this.collection).updateOne(
      query,
      {
        $set: updateQuery,
        $currentDate: { lastModified: true }
      }
    )
  }

  // close connection
  closeClient () {
    if (this.client !== undefined) {
      this.client.close();
    }
  }
}

// const mongodbInterface = new MongodbInterface();

// module.exports = {
//   mongodbInterface,
//   MongodbInterface
// }