require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const combineRouter = require('./routers/combineRouter');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(combineRouter);
app.listen(port, () => {
  console.log('Server is up on port:', port);
});
