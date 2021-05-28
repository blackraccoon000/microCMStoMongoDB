const express = require('express');
const KeywordLists = require('../models/keywordLists');
const TotalInformations = require('../models/totalInformations');
const common = require('../express/common');

const router = new express.Router();
common(router, KeywordLists, '/keywordList');
common(router, TotalInformations, '/totalInformation');

module.exports = router;
