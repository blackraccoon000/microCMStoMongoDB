const acquisition = require('./acquisition');

const storing = async () => {
  const data = await acquisition();
  // console.log(data);
  return data;
};

// storing();
module.exports = storing;
