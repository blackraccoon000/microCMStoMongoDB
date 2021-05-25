module.exports = (app, models, queries) => {
  return app.get(queries, (req, res) => {
    models
      .find({})
      .then((value) => {
        console.log('collect:', value);
        res.status(201).send('collect:' + value);
      })
      .catch((error) => {
        res.status(500).send('error:' + error);
      });
  });
};
