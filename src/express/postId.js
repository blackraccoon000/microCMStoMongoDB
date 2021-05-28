const auth = require('../middleware/auth');

module.exports = (app, models, queries) => {
  return app.post(queries, auth, async (req, res) => {
    const value = new models({
      ...req.body,
      owner: req.user._id,
    });
    try {
      await value.save();
      res.status(201).send('collect' + value);
    } catch (error) {
      res.status(400).send('error' + error);
    }
  });
};
