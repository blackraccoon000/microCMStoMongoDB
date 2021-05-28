const axios = require('axios');

module.exports = async (queries = '') => {
  try {
    const res = await axios.get(`${process.env.MICRO_CMS}${queries}`, {
      headers: { 'X-API-KEY': process.env.X_API_KEY },
    });
    return res.data;
  } catch (error) {
    console.log(`error:${queries}`, error);
  }
};
