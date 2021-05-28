const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const auth = async (req, res, next) => {
  console.log(req.header('Authorization'));
  // const token =
  //   req.header === undefined
  //     ? req.body.header.Authorization.replace('Bearer ', '')
  //     : req.header('Authorization').replace('Bearer ', '');
  // console.log('===========token======', token);
  // console.dir(req, { depth: null });
  // console.log(typeof req.header === 'function');
  // console.log(req.body.header.Authorization.replace('Bearer ', ''));
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'thisismynewcourse');
    console.log(decoded);
    const user = await Users.findOne({
      _id: decoded._id,
      'tokens.token': token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'please authenticate.' });
  }
};

module.exports = auth;
