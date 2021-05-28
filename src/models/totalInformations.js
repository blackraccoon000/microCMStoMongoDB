const mongoose = require('mongoose');

const idSchema = new mongoose.Schema({
  id: {
    type: String,
    require: true,
  },
  order: {
    type: Number,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
});

const objSchema = new mongoose.Schema({
  totalCount: {
    type: Number,
    require: true,
  },
  ids: {
    type: [idSchema],
    require: true,
  },
});

const totalInformationSchema = new mongoose.Schema({
  totalInformation: {
    type: objSchema,
    require: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Users',
  },
});

const TotalInformation = mongoose.model(
  'totalInformations',
  totalInformationSchema
);

module.exports = TotalInformations;
