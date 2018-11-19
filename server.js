const express = require('express')
const app = express()

const users = {
  남건민 : [0, null, 2, 3],
  유저 : [0, null, 2, 3, 4],
  user : [0, null, 2, 3, 4],
  ida : [0, null, 2, 3, 4]
}
/*
[0] : 패스워드
[1] : 저장한 소스
*/

app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/public/Home'))

app.get('/save_code', (request, response) => {
  var id = Object.keys(request.query)[0];
  var code = request.query[id];

  users[id][1] = code;

  console.log("서버에 다음이 저장됨");
  console.log(request.query);
  //response.send("save_code : success");
})

app.get('/load_code', (request, response) => {
  var id = Object.keys(request.query)[0];
  console.log("클라이언트에서 " + id + "에 대한 " + "데이터 요청");
  response.send(users[id][1]);
})

app.listen(52273, () => {
  console.log('Server Running at http://127.0.0.1:52273')
})
