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

/** Middle ware Before Save Use */
keywordSchema.pre('save', async function (next) {
  // this is req.body
  const keyword = this;
  console.log(keyword);
  console.log('just before saving');
  next();
});

const KeywordsList = mongoose.model('KeywordList', keywordSchema);

module.exports = KeywordsList;
