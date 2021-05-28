const auth = require('../middleware/auth');

module.exports = (app, models, queries) => {
  return app.delete(queries, auth, async (req, res) => {
    try {
      const value = await models.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      !value && res.status(404).send('failed: error 404');
      await value.remove();
      res.send('delete success :' + value);
    } catch (error) {
      res.status(500).send('failed: error 500');
    }
  });
};
