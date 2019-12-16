// require : node_modules의 func call 통해 객체호출방법
var express = require('express')
var app = express()
var bodyParser = require('body-parser')

app.listen(3000, function() {
  console.log("start!! express server on port 3000");
});

//static 으로 기억할게
app.use(express.static('public'))
// express서버에 bodyParser 쓸래  - default
app.use(bodyParser.json()) // client(브라우저) 응답이 json일 경우
app.use(bodyParser.urlencoded({extended:true}))  // json이외 post형태일때는 client-server간에는 아스키 형태로만 데이터를 주고 받을 수 있어 이렇게 지정해줘야 함
app.set('view engine', 'ejs')

// url routing
app.get('/', function(req,res){  // func callback
  // res.send("<h1> hi friend!</h1>");
  console.log('localhost:3000');
  res.sendFile(__dirname + "/public/main.html") // 브라우저 클라이언트에게 내려받게 됨 __dirname:최상위경로에서 절대경로 내 파일을 client에게 줘
});

app.get('/main', function(req,res){  // func callback
  // res.send("<h1> hi friend!</h1>");
  console.log('localhost:3000/main');
  res.sendFile(__dirname + "/public/main.html") // 브라우저 클라이언트에게 내려받게 됨 __dirname:최상위경로에서 절대경로 내 파일을 client에게 줘
});

// email_post에대한 routing 처리
app.post('/email_post', function(req,res){
  //get : req.param('email')
  console.log(req.body.email) //클라이언트인 web브라우저에서 전송된 form이 서버로 온 것을 확인
  //res.send("<h1>Welcome: "+ req.body.email + "</h1>");  // 서버로 데이터 보내기
  res.render('email.ejs', {'email' : req.body.email}); // html + data : email.ejs 이용해서 email 키값, value는 email정보로 치환하고 브라우저(client)에 응답해라
});

// url routing
app.post('/ejax_send_email', function(req,res){
  console.log(req.body.email); // 서버확인 로그
  //check validation about input value ==> select/insert DB
  var responseData = {'result' : 'ok', 'email': req.body.email}
  res.json(responseData); // json 응답확인
});
