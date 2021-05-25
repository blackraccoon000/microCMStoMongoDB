require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
  console.log();
  res.send(`Posting Data is Name:${req.body.name} Email:${req.body.email}`);
});

app.listen(port, () => {
  console.log('Server is up on port:', port);
});

// console.log(process.env.USERNAME);
