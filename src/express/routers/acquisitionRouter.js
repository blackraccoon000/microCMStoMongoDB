const express = require('express');
const Acquisition = require('../../models/acquisitions');
const auth = require('../../middleware/auth');
const storing = require('../../fetch/storing');

const router = new express.Router();

router.post('/acq', auth, async (req, res) => {
  const value = new Acquisition({
    ...req.body,
    owner: req.user._id,
  });
  try {
    await value.save();
    res.status(201).send(value);
  } catch (error) {
    res.status(400).send(error);
  }
});

/** 特別な動作 */
router.patch('/acq/update/:id', auth, async (req, res) => {
  console.log('req:', req.body);
  try {
    /** microCMSからデータを取得する */
    const updateData = await storing();
    // console.log(updateData);

    if (!updateData) {
      return res.status(400).send('情報が取得できませんでした');
    }

    /** ====================== */

    /** 現在データを発見 */
    const currentData = await Acquisition.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    // console.log(currentData);

    if (!currentData) {
      return res.status(400).send('該当のacqIdが存在しません');
    }

    const updateFirstKeys = Object.keys(updateData);
    // console.log(updateFirstKeys);

    /** 該当オブジェクトを更新する */
    updateFirstKeys.map((update) => {
      currentData[update] = updateData[update];
    });
    await currentData.save();
    res.status(201).send(`更新が完了しました`);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/acq/:id', auth, async (req, res) => {
  try {
    const value = await Acquisition.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    !value && res.status(404).send('該当するIDが見つかりません');

    res.status(201).send(value);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.patch('/acq/:id', auth, async (req, res) => {
  // patchによりupdateしようとする値からkeyを取得する
  const updateFirstKeys = Object.keys(req.body);
  if (!updateFirstKeys.length) {
    return res.status(400).send('更新するデータがありません');
  }

  // 深いため、解析
  const updateKeys = [];

  updateFirstKeys.map((key) => {
    return typeof req.body[key] === 'object'
      ? Object.keys(req.body[key][0]).map((obj) =>
          updateKeys.push(`${key}-${obj}`)
        )
      : typeof req.body[key] === 'number' && updateKeys.push(`${key}-number`);
  });

  const allowedUpdates = [
    'totalCount-number',
    'simpleArticles-id',
    'simpleArticles-title',
    'simpleArticles-keyword',
    'keywordRelational-keyword',
    'keywordRelational-ids',
  ];

  const isValidOperation = allowedUpdates.every((update) =>
    updateKeys.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send('異なる情報を更新しようとしています');
  }

  try {
    const currentValue = await Acquisition.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!currentValue) {
      return res.status(400).send('該当のacqIdが存在しません');
    }

    const updateValue = req.body;
    /** 該当オブジェクトを更新する */
    const updates = updateFirstKeys.map((update) => {
      currentValue[update] = updateValue[update];
      return `${update}, ${currentValue[update]}`;
    });
    // console.log(updates);
    await currentValue.save();
    res.status(201).send(JSON.stringify(updates));
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete('/acq/:id', auth, async (req, res) => {
  try {
    const value = await Acquisition.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    !value && res.status(404).send('failed: error 404');
    await value.remove();
    res.send('delete success :' + value);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
