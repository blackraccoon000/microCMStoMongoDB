require('dotenv').config();
require('./db/mongoose');
const useExp = require('./express/useExp');

useExp();
