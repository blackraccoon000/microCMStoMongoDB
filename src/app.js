/** 環境変数読み取り */
require('dotenv').config();

/** mongoose読み取り */
require('./db/mongoose');

/** express読み取り -> 起動 */
const useExp = require('./express/useExp');
useExp();

// const storing = require('./fetch/storing');
// storing();

/** 想定取得データをJSON化 */
// const acq = require('./tests/fixtures/aquisition');
// console.log(acq);
// console.log(JSON.stringify(acq));
