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

const Key = require('./models/keywordLists');
const Tot = require('./models/totalInformations');
const Users = require('./models/users');

const main = async () => {
  /** Key to User */
  // const key = await Key.findById('60af76b918d9702d084081f1');
  // await key.populate('owner').execPopulate();
  // console.log(key.owner);
  /** tot to User */
  // const tot = await Tot.findById('60b037fa1bc8436923d9cb5f');
  // await tot.populate('owner').execPopulate();
  // console.log(tot.owner);
  /** User to Key */
  // const user = await Users.findById('60af5b733bda19235aae1009');
  // await user.populate('keywordLists').execPopulate();
  // // console.log(user);
  // console.log(user.keywordLists);
};

main();
