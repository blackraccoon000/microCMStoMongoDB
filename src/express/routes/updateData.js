const auth = require('../../middleware/auth');

module.exports = (app, models, queries) => {
  return app.patch(queries, auth, async (req, res) => {
    // 型定義が複雑なため、現状未定義 => 後で精査
    const updateKeys = Object.keys(req.body);
    const updateValue = req.body;
    console.log(updateValue);

    try {
      const currentValue = await models.findOne({
        _id: req.params.id,
        owner: req.user._id,
      });
      updateKeys.map((key) => (currentValue[key] = updateValue[key]));
      await currentValue.save();

      res.status(201).send('collect' + currentValue);
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};
