module.exports = (app, models, queries) => {
  return app.post(queries, (req, res) => {
    const model = new models(req.body);
    model
      .save()
      .then((value) => {
        console.log('collect:', value);
        res.status(201).send('collect' + model);
      })
      .catch((error) => {
        console.log('error:', error);
        res.status(400).send('error' + error);
      });
  });
};
