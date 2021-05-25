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

const KeywordsList = mongoose.model('KeywordList', {
  keywordList: {
    type: [objSchema],
    require: true,
  },
});

module.exports = KeywordsList;
