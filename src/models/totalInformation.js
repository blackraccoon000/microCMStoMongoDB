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

const TotalInformation = mongoose.model('TotalInformation', {
  totalInformation: {
    type: objSchema,
    require: true,
  },
});

module.exports = TotalInformation;
