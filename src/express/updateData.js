module.exports = (app, models, queries) => {
  return app.patch(queries, async (req, res) => {
    const _id = req.params.id;
    const update = req.body;
    try {
      models.findByIdAndUpdate(_id, update).then((value) => {
        console.log(value);
        res.status(201).send('collect');
      });
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};
