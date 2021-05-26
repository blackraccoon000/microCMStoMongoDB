const jwt = require('jsonwebtoken');

const myFn = async () => {
  const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', {
    expiresIn: '1 second',
  });
  console.log(token);

  const data = jwt.verify(token, 'thisismynewcourse');
  console.log(data);
};

myFn();
