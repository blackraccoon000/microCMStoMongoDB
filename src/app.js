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

const Key = require('./models/keywordList');
const Users = require('./models/user');

const main = async () => {
  /** Key to User */
  // const key = await Key.findById('60af76b918d9702d084081f1');
  // await key.populate('owner').execPopulate();
  // console.log(key.owner);

  /** User to Key */
  const user = await Users.findById('60af5b733bda19235aae1009');
  await user.populate('keywordLists').execPopulate();
  // console.log(user);
  console.log(user.keywordLists);
};

main();
