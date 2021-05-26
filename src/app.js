require('dotenv').config();
require('./db/mongoose');
const express = require('express');
const combineRouter = require('./routers/combineRouter');
const userRouter = require('./routers/userRouter');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(combineRouter);
app.use(userRouter);

app.listen(port, () => {
  console.log('Server is up on port:', port);
});
