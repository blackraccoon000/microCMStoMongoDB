const express = require('express');
const Acquisition = require('../../models/acquisitions');
const auth = require('../../middleware/auth');
const storing = require('../../fetch/storing');

const router = new express.Router();

/** 一つのみ作成 */
router.post('/acq', auth, async (req, res) => {
  const value = new Acquisition({
    ...req.body,
    owner: req.user._id,
  });
  try {
    const valueCount = await Acquisition.countDocuments();

    if (valueCount > 0) {
      return res.status(400).send('これ以上データの追加はできません');
    }

    await value.save();
    res.status(201).send(value);
  } catch (error) {
    res.status(400).send(error);
  }
});

/** 特別な動作 */
router.patch('/acq/update/:id', auth, async (req, res) => {
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

/** ID取得 */
router.get('/acq/:id', async (req, res) => {
  try {
    const value = await Acquisition.findOne({
      _id: req.params.id,
    });

    !value && res.status(404).send('該当するIDが見つかりません');

    res.status(201).send(value);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
