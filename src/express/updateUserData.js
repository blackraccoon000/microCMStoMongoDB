module.exports = (app, models, queries) => {
  return app.patch(queries, async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send('error Invalid Update!');
    }

    const existUser = await models.findById(_id);
    /** 該当オブジェクトを更新する */
    updates.map((update) => (existUser[update] = req.body[update]));
    await existUser.save();

    try {
      !existUser && res.status(400).send('Id is not found');
      res.status(201).send('collect' + existUser);
    } catch (error) {
      res.status(400).send('error Invalid Update!:' + error);
    }
  });
};

// existUser: {
//   name: 'yutaka',
//   email: 'anonymous',
//   age: 34,
//   _id: 60adf91eb092e829e9d68257,
//   __v: 0
// }
