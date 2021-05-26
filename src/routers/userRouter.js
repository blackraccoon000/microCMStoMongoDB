const express = require('express');
const User = require('../models/user');
const common = require('../express/common');

const router = new express.Router();
common(router, User, '/user');

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    res.status(201).send('success:' + user);
  } catch (error) {
    res.status(400).send('failed:' + error);
  }
});

module.exports = router;
