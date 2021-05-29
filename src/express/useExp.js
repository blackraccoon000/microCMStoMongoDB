const express = require('express');
const userRouter = require('./routers/userRouter');
const acquisitionRouter = require('./routers/acquisitionRouter');
const app = express();
const port = process.env.PORT || 3000;

module.exports = () => {
  app.use(express.json());
  app.use(userRouter);
  app.use(acquisitionRouter);

  app.listen(port, () => {
    console.log('Server is up on port:', port);
  });
};
