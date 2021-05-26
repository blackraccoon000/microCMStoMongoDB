module.exports = (app, models, queries) => {
  return app.delete(queries, async (req, res) => {
    const _id = req.params.id;
    try {
      const value = await models.findByIdAndDelete(_id);
      !value && res.status(404).send('failed: error 404');
      res.send('delete success :' + value);
    } catch (error) {
      res.status(500).send('failed: error 500');
    }
  });
};
