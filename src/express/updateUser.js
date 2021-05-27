const auth = require('../middleware/auth');

module.exports = (app, queries) => {
  return app.patch(queries, auth, async (req, res) => {
    /** 更新情報が許可情報か判定 */
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send('異なる情報を更新しようとしています');
    }

    try {
      /** 該当オブジェクトを更新する */
      const afterUpdates = updates.map((update) => {
        const before = {
          updateType: `${update}`,
          before: `${req.user[update]}`,
          after: `${req.body[update]}`,
        };
        req.user[update] = req.body[update];
        return before;
      });
      console.log(afterUpdates);
      await req.user.save();
      res.status(201).send('collect' + JSON.stringify(afterUpdates));
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};
