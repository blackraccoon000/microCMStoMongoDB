module.exports = (app, models, queries) => {
  return app.post(queries, async (req, res) => {
    const value = await new models(req.body).save();
    try {
      res.status(201).send('collect' + value);
    } catch (error) {
      res.status(400).send('error' + error);
    }
  });
};
