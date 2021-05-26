module.exports = (app, models, queries) => {
  return app.get(queries, async (req, res) => {
    const _id = req.params.id;
    const value = await models.findById(_id);
    try {
      !value && res.status(404).send('ErrorCode : 404');
      !value && console.log('ErrorCode : 404', value);
      console.log('collect:', value);
      res.status(201).send('collect:' + value);
    } catch (error) {
      res.status(500).send('error:' + error);
    }
  });
};
