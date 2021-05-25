const mongodb = require('mongodb');
const keywordsList = require('./tests/fixtures/keywordsList');
console.log(keywordsList);

// const MongoClient = mongodb.MongoClient;
// const connectionURL = 'mongodb://127.0.0.1:27017/';
// const databaseName = 'playwell';

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     error && console.log('接続できませんでした error:', error);
//     console.log('接続できました');
//     const db = client.db(databaseName);
//     db.collection('keywordsList').insertOne({
//       keywordsList,
//     });
//   }
// );
