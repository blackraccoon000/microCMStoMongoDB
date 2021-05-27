const express = require('express');
const KeywordList = require('../models/keywordList');
const TotalInformation = require('../models/totalInformation');
const common = require('../express/common');

const router = new express.Router();
common(router, KeywordList, '/keywordList');
common(router, TotalInformation, '/totalInformation');

module.exports = router;
