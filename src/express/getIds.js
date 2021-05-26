module.exports = (app, models, queries) => {
  return app.get(queries, async (req, res) => {
    const value = await models.find({});
    try {
      res.status(201).send('collect:' + value);
    } catch (error) {
      res.status(500).send('error:' + error);
    }
  });
};
