// using app.js

app.use((req, res, next) => {
  if (req.method === 'GET') {
    res.send('GET requests are disabled');
  } else {
    next();
  }
  // console.log(req.method, req.path);
  // next();
});

app.use((req, res, next) => {
  res.status(503).send('現在メンテナンスモードの実施中です');
});
