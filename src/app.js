require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const KeywordsList = require('./models/keywordList');
const TotalInformation = require('./models/totalInformation');
const postId = require('./express/postId');
const getIds = require('./express/getIds');
const getSelectId = require('./express/getSelectId');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

postId(app, KeywordsList, '/keywordList');
getIds(app, KeywordsList, '/keywordList');
getSelectId(app, KeywordsList, '/keywordList/:id');
postId(app, TotalInformation, '/totalInformation');
getIds(app, TotalInformation, '/totalInformation');
getSelectId(app, TotalInformation, '/totalInformation/:id');

app.listen(port, () => {
  console.log('Server is up on port:', port);
});

// console.log(process.env.USERNAME);
