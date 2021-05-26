const postId = require('./postId');
const getIds = require('./getIds');
const getSelectId = require('./getSelectId');
const updateData = require('./updateData');
const updateUserData = require('./updateUserData');
const deleteSelectId = require('./deleteSelectId');

const common = (router, models, queries) => {
  postId(router, models, queries);
  getIds(router, models, queries);
  getSelectId(router, models, `${queries}/:id`);
  queries === '/user'
    ? updateUserData(router, models, `${queries}/:id`)
    : updateData(router, models, `${queries}/:id`);
  deleteSelectId(router, models, `${queries}/:id`);
};

module.exports = common;
