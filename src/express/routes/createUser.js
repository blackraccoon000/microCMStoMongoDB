const Users = require('../../models/users');

module.exports = (app, queries) => {
  return app.post(queries, async (req, res) => {
    try {
      const userCount = await Users.countDocuments();

      /** ユーザーを指定数以上作成できないようにする */
      if (userCount > 0) {
        return res.status(400).send('これ以上ユーザーは作成できません');
      }

      const user = await new Users(req.body).save();
      const token = await user.generateAuthToken();
      return res.status(201).send({ user, token });
    } catch (error) {
      return res.status(400).send('error' + error);
    }
  });
};
