const mongoose = require('mongoose');
const connectionURL = 'mongodb://127.0.0.1:27017/playwell-api';

mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
