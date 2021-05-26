module.exports = (app, models, queries) => {
  return app.patch(queries, async (req, res) => {
    const _id = req.params.id;
    const update = req.body;
    const value = await models.findByIdAndUpdate(_id, update);
    try {
      res.status(201).send('collect' + value);
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};
