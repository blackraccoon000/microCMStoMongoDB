const mongoose = require('mongoose');
const connectionURL =
  process.argv[3] === 'development'
    ? 'mongodb://127.0.0.1:27017/playwell-api'
    : process.env.MONGODB_URL;

console.log('connection:', connectionURL);

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
