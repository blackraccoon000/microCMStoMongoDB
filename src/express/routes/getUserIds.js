const auth = require('../../middleware/auth');

module.exports = (app, models, queries) => {
  return app.get(queries, auth, async (req, res) => {
    const user = await models.find({});
    try {
      res.status(201).send({ user: user.getPublicProfile() });
    } catch (error) {
      res.status(500).send('error:' + error);
    }
  });
};
