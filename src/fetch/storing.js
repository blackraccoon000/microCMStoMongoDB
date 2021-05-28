const acquisition = require('./acquisition');

const storing = async () => {
  const data = await acquisition();
  /** ここで将来的にmongoDBにupdateする */
  // console.log(data);
  return data;
};

// storing();
module.exports = storing;
