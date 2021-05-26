module.exports = (app, models, queries) => {
  return app.patch(queries, async (req, res) => {
    const keywordList = Object.keys(req.body.keywordList[0]);
    const _id = req.params.id;
    // const update = req.body;
    // const value = await models.findByIdAndUpdate(_id, update);
    const value = await models.findById(_id);

    keywordList.map((update) => {
      console.log('val:', value.keywordList[0][update]);
    });

    try {
      res.status(201).send('collect' + value);
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};
