//모듈 가져오기
const express = require("express");
const bodyParser = require("body-parser");

const db = require('./db');

//Express 서버 생성
const app = express();

// json 형태로 오는 요청 본문 해석 등록
app.use(bodyParser.json())

// 테이블 생성
db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})

//DB lists 테이블에 있는 모든 데이터를 프론트 서베에 보내주기 
app.get('/api/hi', function (req, res) {
    //데이테베이스에서 모든 정보 가져오기 
   res.status(200).send('good')
})

//DB lists 테이블에 있는 모든 데이터 프론트에 전달
app.get('/api/values', function(req, res) {
    //DB에서 모든 정보 가져오기
    db.pool.query("SELECT * FROM lists;", 
        (err, results, fileds) => {
            if(err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

//Client to DB lists
app.post('/api/value', function (req, res, next) {
    //데이터베이스에 값 넣어주기
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})

app.listen(5000, () => {
    console.log("App is running 5000 port")
})

