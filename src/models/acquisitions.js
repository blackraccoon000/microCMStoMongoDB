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
  body: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: Object,
    require: true,
  },
  createdAt: {
    type: String,
    require: true,
  },
  updatedAt: {
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

acquisitionsSchema.methods.toJSON = function () {
  const acq = this;
  const acqObject = acq.toObject();

  /** 大本の_id削除 */
  delete acqObject._id;
  delete acqObject.owner;
  delete acqObject.createdAt;
  delete acqObject.updatedAt;

  /** simpleArticlesの_id削除 */
  acqObject.simpleArticles.map((article) => delete article._id);

  /** keywordRelationalの_id削除 */
  acqObject.keywordRelational.map((keyword) => delete keyword._id);

  return acqObject;
};

const Acquisitions = mongoose.model('acquisitions', acquisitionsSchema);

module.exports = Acquisitions;
