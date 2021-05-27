const express = require('express');
const Users = require('../models/user');
const common = require('../express/common');
const createUser = require('../express/createUser');
const updateUser = require('../express/updateUser');
const deleteUser = require('../express/deleteUser');
const auth = require('../middleware/auth');

const router = new express.Router();

/** ユーザーを作成する 認証：不要 */
createUser(router, Users, '/user');

/** ユーザーを削除する 認証：必要 */
deleteUser(router, '/user');

/** ユーザー情報を変更する 認証：必要 */
updateUser(router, '/user/me');

/** email & password でサインインする */
router.post('/user/signIn', async (req, res) => {
  try {
    const user = await Users.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();

    return res.status(200).send({ user, token });
  } catch (error) {
    return res.status(400).send('failed:' + error);
  }
});

/** 認証許可の場合、token情報に基づいてDBサイドのtokenを削除する */
router.post('/user/signOut', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();
    return res.status(200).send('logout now' + req.user);
  } catch (error) {
    return res.status(500).send();
  }
});

/** 認証許可の場合、DBサイドのtokenを[]（空配列にする) */
router.post('/user/signOutAll', auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    return res.status(200).send('logout All Now' + req.user);
  } catch (error) {
    return res.status(500).send();
  }
});

/** token情報に則り、user情報を取得する */
router.get('/user/me', auth, async (req, res) => {
  return res.send(req.user);
});

module.exports = router;
