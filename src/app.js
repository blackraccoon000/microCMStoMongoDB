require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const KeywordsList = require('./models/keywordList');
const TotalInformation = require('./models/totalInformation');
const postId = require('./express/postId');
const getIds = require('./express/getIds');
const getSelectId = require('./express/getSelectId');
const updateData = require('./express/updateData');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/** KeywordsList */
postId(app, KeywordsList, '/keywordList');
getIds(app, KeywordsList, '/keywordList');
getSelectId(app, KeywordsList, '/keywordList/:id');
updateData(app, KeywordsList, '/keywordList/:id');

/** TotalInformation */
postId(app, TotalInformation, '/totalInformation');
getIds(app, TotalInformation, '/totalInformation');
getSelectId(app, TotalInformation, '/totalInformation/:id');
updateData(app, TotalInformation, '/totalInformation/:id');

app.listen(port, () => {
  console.log('Server is up on port:', port);
});

// console.log(process.env.USERNAME);
