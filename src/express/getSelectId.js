const auth = require('../middleware/auth');

module.exports = (app, models, queries) => {
  return app.get(queries, auth, async (req, res) => {
    try {
      const value = await models.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });

      !value && res.status(404).send('該当するIDが見つかりません');

      res.status(201).send('collect:' + value);
    } catch (error) {
      res.status(500).send('error:' + error);
    }
  });
};
