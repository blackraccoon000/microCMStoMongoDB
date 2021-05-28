const mongoose = require('mongoose');

const simpleArticlesSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  keyword: {
    type: String,
    require: true,
  },
});

const keywordRelationalSchema = new mongoose.Schema({
  keyword: {
    type: String,
    require: true,
  },
  ids: {
    type: Array,
    require: true,
  },
});

const acquisitionsSchema = new mongoose.Schema(
  {
    totalCount: {
      type: Number,
      require: true,
    },
    simpleArticles: {
      type: [simpleArticlesSchema],
      require: true,
    },
    keywordRelational: {
      type: [keywordRelationalSchema],
      require: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Users',
    },
  },
  {
    timestamps: true,
  }
);

const Acquisitions = mongoose.model('acquisitions', acquisitionsSchema);

module.exports = Acquisitions;
