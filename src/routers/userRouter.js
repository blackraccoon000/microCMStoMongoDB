const express = require('express');
const User = require('../models/user');
const common = require('../express/common');
const auth = require('../middleware/auth');

const router = new express.Router();
// common(router, User, '/user');

router.post('/user/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send('failed:' + error);
  }
});

router.get('/user/me', auth, async (req, res) => {
  res.send(req.user);
});

module.exports = router;
