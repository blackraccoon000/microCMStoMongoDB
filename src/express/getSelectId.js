module.exports = (app, models, queries) => {
  return app.get(queries, (req, res) => {
    const _id = req.params.id;
    models
      .findById(_id)
      .then((value) => {
        !value && res.status(404).send('ErrorCode : 404');
        console.log('collect:', value);
        res.status(201).send('collect:' + value);
      })
      .catch((error) => {
        res.status(500).send('error:' + error);
      });
  });
};
