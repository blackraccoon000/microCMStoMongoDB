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
});

const KeywordsList = mongoose.model('KeywordList', keywordSchema);

module.exports = KeywordsList;
