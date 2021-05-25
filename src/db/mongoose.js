const mongoose = require('mongoose');
const keywordList = require('../tests/fixtures/keywordsList');
const connectionURL = 'mongodb://127.0.0.1:27017/playwell-api';
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

const KeywordsList = mongoose.model('KeywordList', {
  // keyword: {
  //   type: String,
  //   require: true,
  // },
  // ids: {
  //   type: Array,
  //   require: true,
  // },
  keywordList: {
    type: Array,
    require: true,
  },
});

const one = new KeywordsList({
  // keyword: 'テスト',
  // ids: [
  //   'uhrjbmf8xqz3',
  //   'kf9j-jzze',
  //   'q0qtwov5f4q6',
  //   'ww2vpab1815b',
  //   '8lvqc7pehr1q',
  //   'asc_9w4_fxl',
  //   '7odtdk62l',
  //   'vn-81ad1p',
  //   'mxq-0f4nq',
  // ],
  keywordList,
});

one
  .save()
  .then((value) => {
    console.log('collect:', value, one);
  })
  .catch((error) => {
    console.log('error:', error);
  });
