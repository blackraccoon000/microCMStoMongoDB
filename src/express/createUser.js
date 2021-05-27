module.exports = (app, models, queries) => {
  return app.post(queries, async (req, res) => {
    try {
      const user = await new models(req.body).save();
      const token = await user.generateAuthToken();

      res.status(201).send({ user, token });
    } catch (error) {
      res.status(400).send('error' + error);
    }
  });
};
