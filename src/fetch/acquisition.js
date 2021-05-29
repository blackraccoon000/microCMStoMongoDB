const baseAxios = require('./baseAxios');

/** Get totalCount Fn */
const totalCountFn = async () => {
  try {
    const data = await baseAxios('?limit=0');
    return data.totalCount;
  } catch (error) {
    console.log(error);
  }
};

/** Get id/title/keyword/thumbnail/createdAt/updatedAt */
const simpleArticlesFn = async (totalCount) => {
  const data = await baseAxios(
    `?fields=id,title,keyword,thumbnail,createdAt,updatedAt,&offset=0&limit=${totalCount}`
  );
  return data.contents;
};

/** 取得&解析 */
const acquisition = async () => {
  /** Axiosによる取得 */
  const totalCount = await totalCountFn();
  const simpleArticles = await simpleArticlesFn(totalCount);

  /** 解析 */
  const duplicateDeletion = [
    ...new Set(
      simpleArticles
        .map((mass) => mass.keyword.split(','))
        .reduce((ac, cu) => ac.concat(cu))
    ),
  ];
  const keywordRelational = duplicateDeletion.map((keyword) => {
    const ids = simpleArticles
      .filter((mass) => mass.keyword.includes(keyword) && mass.id)
      .map((mass) => mass.id);
    return { keyword, ids };
  });

  /** オブジェクトにまとめる */
  return {
    totalCount,
    simpleArticles,
    keywordRelational,
  };
};

module.exports = acquisition;
