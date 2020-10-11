let express = require('express');
let app = express();
let cors = require('cors');

let userInfoRouter = require('./router/user-info-router');

app.use(cors());

app.use(express.json());

app.get('/', function(req, res) {
  res.send('Hello World!');
});

app.use('/user-info', userInfoRouter);

app.listen(3000, function() {
  console.log('Example app listening on port 3000!');
});