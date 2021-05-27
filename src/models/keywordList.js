const mongoose = require('mongoose');

const objSchema = new mongoose.Schema({
  keyword: {
    type: String,
    require: true,
  },
  ids: {
    type: Array,
    require: true,
  },
});

const keywordSchema = new mongoose.Schema({
  keywordList: {
    type: [objSchema],
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Users',
  },
});

const KeywordLists = mongoose.model('keywordLists', keywordSchema);

module.exports = KeywordLists;
