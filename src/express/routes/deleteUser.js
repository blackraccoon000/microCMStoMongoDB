const auth = require('../../middleware/auth');

module.exports = (app, queries) => {
  return app.delete(queries, auth, async (req, res) => {
    try {
      await req.user.remove();
      res.status(200).send(`${req.user.email} is delete success`);
    } catch (error) {
      res.status(500).send('failed: error 500');
    }
  });
};
