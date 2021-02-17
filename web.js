// 모듈을 추출합니다.
var fs = require('fs');
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
const path = require('path');
var session = require('express-session');
var http = require('http');
const { Console } = require('console');
var daum = require('daum-map-api');


const router = express.Router();

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    host: 'dbcon.cafe24app.com',
    user: 'kpg1997',
    password: 'qlalf8956!!',
    database: 'kpg1997',
    port: '3306',
});//내 cafe24 db 가져옴

// 서버를 생성합니다.
var app = express();
app.use(bodyParser.urlencoded({
    extended: false
}));


//
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json());

app.listen(8020, function () {
    console.log('server running at http://127.0.0.1:8020');
});
//미들웨어 장착
// app.get('/', function (request, response) {
//     response.sendFile(path.join(__dirname + '/login.html'));
// });



//제이쿼리불러오기,CSS,js
//공통
app.use('/font', express.static(__dirname + '/login/fonts/Imbue/Imbue-VariableFont_opsz,wght.ttf'));
app.use('/font2', express.static(__dirname + '/index/fonts/Nanum_Myeongjo/NanumMyeongjo-Regular.ttf'));
app.use('/jquery', express.static(__dirname + '/login/libs/jquery-3.5.1.min.js'));
app.use('/images', express.static(__dirname + '/index/images/투명로고1 .png'));
//header


//footer
app.get('/totalfooter.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/total/totalfooter.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
//issue
app.use('/issuejs', express.static(__dirname + '/issue/issue.js'));
app.use('/issuecss', express.static(__dirname + '/issue/issue.css'));
//index
app.use('/indexjs', express.static(__dirname + '/index/index.js'));
app.use('/indexsource', express.static(__dirname + '/index/images/밤하늘영상2.mp4'))
app.use('/faviconico', express.static(__dirname + '/index/images/favicon.ico'));
app.use('/indexcss', express.static(__dirname + '/index/index.css'));
//login
app.use('/loginCss', express.static(__dirname + '/login/login.css'));
app.use('/background', express.static(__dirname + '/login/images/backgroundimage.jpg'));
app.use('/loginjs', express.static(__dirname + '/login/login.js'));
//sign
app.use('/signInjs', express.static(__dirname + '/signIn/signIn.js'));
app.use('/signInCss', express.static(__dirname + '/signIn/signIn.css'));

//border
app.use('/boardimage', express.static(__dirname + '/board/images/back.webp'))
//groupintro
app.use('/groupIntrojs', express.static(__dirname + '/groupIntro/groupIntro.js'));
app.use('/groupIntrocss', express.static(__dirname + '/groupIntro/groupIntro.css'));
app.use('/groupsource', express.static(__dirname + '/groupIntro/images/Group.mp4'));
//brandintro
app.use('/brandIntrojs', express.static(__dirname + '/brandIntro/brandIntro.js'));
app.use('/brandIntroCss', express.static(__dirname + '/brandIntro/brandIntro.css'));
app.use('/brandIntrosource', express.static(__dirname + '/brandIntro/images/Patek Philippe cut_Slomo.mp4'));
//location
app.use('/locationjs', express.static(__dirname + '/location/location.js'));
app.use('/locationcss', express.static(__dirname + '/location/location.css'));
app.use('/locationbackground', express.static(__dirname + '/location/images/location배경.jpg'));
app.use('/locationimg', express.static(__dirname + '/location/images/map.jpg'));
// app.use('/map', express.static(http+'dapi.kakao.com/v2/maps/sdk.js?appkey=cb2ddce9c272d8e533706240faf2a4b7'));
// app.use('/roadview.js', express.static(__dirname + '/location/js/roadview.js'));
// app.use('/roadview2.js', express.static(__dirname + '/location/js/roadview2.js'));
// app.use('/kakao.js', express.static(__dirname + '/location/js/kakao.js'));
// app.use('/drawing.js', express.static(__dirname + '/location/js/drawing.js'));
// app.use('/clusterer.js', express.static(__dirname + '/location/js/clusterer.js'));

// 서버를 실행합니다.
//qna
app.use('/qnajs', express.static(__dirname + '/qna/qna.js'));
app.use('/qnacss', express.static(__dirname + '/qna/qna.css'));
app.use('/qnabg', express.static(__dirname + '/qna/image/qnabg.mp4'));
//qnadetail
app.use('/qnadetailjs', express.static(__dirname + '/qna/qnadetail.js'));
app.use('/qnadetailcss', express.static(__dirname + '/qna/qnadetail.css'));
app.use('/qnabg', express.static(__dirname + '/qna/image/qnabg.mp4'));

app.get('/index.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/index/index.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
//header
app.get('/header.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.

    fs.readFile(__dirname + '/total/totalheader.html', 'utf8', function (error, data) {
        if (request.session.loggedin) {
            response.send(ejs.render(data, {
                data: request.session.userid
            }));
        } else {
            console.log(__dirname + '/total/totalheader.html');
            response.send(data);
        }

    });
});

app.get('/issue.html', function(request, response){
    fs.readFile(__dirname + '/issue/issue.html', 'utf8', function(error,data){
        response.send(data);
    })
})
app.get('/login.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/login/login.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
function send404Message(response) {
    response.writeHead(404, { 'Content-Type': 'text' });
    response.write('404에러');
    response.end();
}
app.get('/location.html', function (request, response) {
    if (request.method == 'GET' && request.url == '/location.html') {
        response.writeHead(200, { 'Content-Type': 'text' });
        fs.createReadStream(__dirname +'/location/location.html').pipe(response);
    } else {
        send404Message(response);
    }
});

app.get('/Terms-of-Service.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/signIn/Terms-of-Service.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

app.get('/group.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/groupIntro/groupIntro.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

//로그인

app.post('/login', function (request, response) {
    var userid = request.body.userid;
    var userpwd = request.body.userpwd;
    console.log(userid, ',', userpwd);
    if (userid && userpwd) {
        // check if user exists
        client.query('SELECT * FROM member WHERE userid = ? AND userpwd = ?', [userid, userpwd], function (error, results, fields) {
            console.log(results);
            if (results.length > 0) {
                request.session.loggedin = true;
                request.session.userid = userid;
                console.log(request.session);
                response.redirect('/index.html');
            } else {
                response.send('<script>alert("아이디나 비번 틀림");history.back();</script>');
            }
        });
    } else {
        response.end();
    }
});

// });
//로그아웃

app.get('/logout', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    console.log(request.session);
    request.session.destroy(function () {
        request.session;
    });
    response.clearCookie("sid") // 세션 쿠키 삭제
    // fs.readFile(__dirname + '/login/login.html', 'utf8', function (error, data) {
    //     // 응답합니다.
    response.redirect('/login.html');
    response.end();
    // });
});



app.get('/before-login-img', function (req, res) {
    fs.readFile(__dirname + '/index/images/before-login.png', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/after-login-img', function (req, res) {
    fs.readFile(__dirname + '/index/images/after-login.png', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});

app.get('/index', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile('index.html', 'utf8', function (error, data) {
        //     // 데이터베이스 쿼리를 실행합니다.
        client.query('select * from member', function (error, results) {
            // 응답합니다.
            // console.log(results);
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});


app.get('/agree.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/signIn/agree.html', 'utf8', function (error, data) {
        // 응답합니다.
        console.log(__dirname + '/signIn/agree.html');
        response.send(data);
    });
});
app.get('/signIn.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/signIn/signIn.html', 'utf8', function (error, data) {
        // 응답합니다.
        console.log(__dirname + '/signIn/signIn.html');
        response.send(data);
    });
});
// app.get('/board.html', function (request, response) {
//     // response.render('index');
//     // 파일을 읽습니다.
//     fs.readFile(__dirname + '/board/views/board.ejs', 'utf8', function (error, data) {
//         // 응답합니다.
//         console.log(__dirname + '/board/views/board.ejs');
//         response.send(data);
//     });
// });
app.post('/signIn', function (request, response) {
    var body = request.body;
    console.log(body);
    //     // 데이터베이스 쿼리를 실행합니다.

    client.query('insert into member (username,userid,userpwd,useremail) values (?,?,?,?)', [body.username, body.userid, body.userpwd, body.useremail], function () {
        // 응답합니다.

        console.log([body.username, body.userid, body.userpwd, body.useremail]);
        response.redirect('/login.html');
    });

});


//중복검사 페이지
app.get('/overlap.html', function (request, response) {
    fs.readFile(__dirname + '/signIn/overlap.html', 'utf8', function (error, data) {
        //     // 데이터베이스 쿼리를 실행합니다.
        response.send(data);
    });
})
//중복검사
//새로운 페이지로 만들어서 중복검사를 해야 이전 값이 사라지지 않게 함
app.post('/overlap', function (request, response) {
    var body = request.body;
    var bodys = request.body.userid;
    console.log('body', bodys);
    console.log('body', bodys.length);
    if (bodys.length < 6) {

        response.send("<script>alert('아이디는 6글자 이상으로 작성해주세요.');history.back()</script>");
    } else if (bodys.length > 10) {
        response.send("<script>alert('아이디는 10글자 미만으로 작성해주세요.');history.back()</script>");
    } else {
        client.query('select * from member where userid = ?', [body.userid], function (error, results) {
            console.log('results.userid', results.length);
            if (results.length == 1) {
                console.log('중복');
                response.send("<script>alert('중복된 아이디입니다.');history.back()</script>");
            } else if (results.length == 0) {
                console.log("중복ㄴㄴ");
                fs.readFile(__dirname + '/signIn/overlap.html', 'utf8', function (error, data) {
                    //     // 데이터베이스 쿼리를 실행합니다.
                    // response.send("<script>history.back();document.getElementById('over').innerHTML='사용가능한아이디 입니다.';document.getElementById('use-userid').style.display='inline';alert('hi');</script>");
                    response.send(ejs.render(data, {
                        data: body.userid
                    }));
                });
            }
            // response.send(ejs.render(data, {
            //     data: results
            // }));
        });
    }

});
app.post('/useId', function (request, response) {
    var body = request.body;
    console.log("use", body.useid);
    fs.readFile(__dirname + '/signIn/signIn.html', 'utf8', function (error, data) {
        response.send(ejs.render(data, {
            data: body.useid
        }));
    });
})

/*브랜드 이미지*/
app.get('/brandIntro.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/brandIntro/brandIntro.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});
app.get('/CHANEL_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/CHANEL_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/CHANEL_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/CHANEL_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/CHANEL_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/CHANEL_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/CHANEL_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/CHANEL_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/CHANEL_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/CHANEL_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});

app.get('/DOLCE&GAMMANA_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/DOLCE&GAMMANA_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/DOLCE_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/DOLCE_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/DOLCE_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/DOLCE_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/DOLCE_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/DOLCE_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/DOLCE_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/DOLCE_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});

app.get('/GUCCI_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GUCCI_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GUCCI_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GUCCI_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GUCCI_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GUCCI_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GUCCI_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GUCCI_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GUCCI_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GUCCI_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});

app.get('/HERMES_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/HERMES_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/HERMES_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/HERMES_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/HERMES_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/HERMES_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/HERMES_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/HERMES_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/HERMES_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/HERMES_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GIORGIO_ARMANI_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GIORGIO_ARMANI_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GIORGI_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GIORGI_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GIORGI_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GIORGI_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GIORGI_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GIORGI_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/GIORGI_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/GIORGI_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);


    });
});
app.get('/PATEK_LOGO', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/PATEK_LOGO.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/PATEK_0', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/PATEK_0.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/PATEK_1', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/PATEK_1.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/PATEK_2', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/PATEK_2.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    })
});
app.get('/PATEK_3', function (req, res) {
    fs.readFile(__dirname + '/brandIntro/images/PATEK_3.jpg', function (error, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);


    });
});
/*브랜드 이미지*/

app.get('/issuebg', function(req,res){
    fs.readFile(__dirname + '/issue/image/issuebg.jpg', function(error,data){
        res.writeHead(200, { 'Content-Type': 'text/html'});
        res.end(data);
    });
});

app.get('/forgot.html', function (request, response) {
    // response.render('index');
    // 파일을 읽습니다.
    fs.readFile(__dirname + '/login/forgot.html', 'utf8', function (error, data) {
        // 응답합니다.
        response.send(data);
    });
});

// 아이디 찾기
app.post('/forgotId', function (request, response) {
    var body = request.body;
    console.log('body', body);
    console.log("[body.username,body.useremail]", [body.username, body.useremail]);
    fs.readFile(__dirname + '/login/forgot.html', 'utf8', function (error, data) {
        client.query('select * from member where username = ? and useremail = ?', [body.username, body.useremail], function (error, results) {
            console.log('results.userid!!!!', results.length);
            console.log('results.userid!!!!', results);
            if (results.length == 1) {
                response.send(ejs.render(data, {
                    data: results[0].userid,
                    data2:''
                }));
            } else {
                response.send("<script>alert('존재하지 않는 아이디 입니다.');history.back()</script>");
            }

            // console.log('results.userid', results[0].userid);

        });
    });
});


// 비밀번호 찾기
app.post('/forgotPwd', function (request, response) {
    var body = request.body;
    console.log('body', body);
    console.log("[body.username,body.useremail]", [body.username, body.useremail]);
    fs.readFile(__dirname + '/login/forgot.html', 'utf8', function (error, data) {
        client.query('select * from member where username = ? and useremail = ?', [body.username, body.useremail], function (error, results) {
            console.log('results.userid!!!!', results.length);
            console.log('results.userid!!!!', results);
            if (results.length == 1) {
                response.send(ejs.render(data, {
                    data: '',
                    data2:results[0].userpwd
                }));
            } else {
                response.send("<script>alert('존재하지 않는 비밀번호 입니다.');history.back()</script>");
            }
        });
    });
});
///////////////////////////////////////////board
// var boardinput=require("./board/func/data").boardinput;
// var boardoutput=require("./board/func/data").boardoutput;
// var boardupdate=require('./board/func/data').boardupdate;
// var boarddelete=require('./board/func/data').boarddelete;
// var boardclick=require('./board/func/data').boardclick;
// var showshow=require('./board/func/function').showshow;
// var upclick=require('./board/func/function').upclick;

// /* board-page */
// let sum=0;
// router.get("/board.html", function (req, res, next) {

//   boardoutput(function (board){
//   let pagecheck=Math.ceil(board.length/5);

//    res.render('board',{
//      data:board,
//      gofunc:showshow,
//      pagecheck:pagecheck
//    });

//  })
// });

// router.get("/up", function (req, res, next) {
//   boardoutput(function (board){
//     console.log(showshow);
//     res.render('boardup',{
//       data:board,
//       gofunc:showshow,
//       upclick:upclick
//     });

//   })

// });


// router.get("/show", function (req, res, next) {

//   if(req.query.id){
//     boardoutput(function (board){
//       res.render('show',{
//         title:board[(req.query.id)].title,
//         content:board[(req.query.id)].content,
//         id:board[(req.query.id)].id,
//         page:0

//       });
//     })
//   }
//   if(req.query.uid){
//     boardoutput(function (board){
//       res.render('showup',{
//        data:board,
//        upclick:upclick,
//        num:req.query.uid,
//         page:1

//       });
//     })
//   }
// if(req.query.delete){
//   console.log(req.query.delete);
//   boarddelete(req.query.delete);
// }
// if((req.query.loveit)||(req.query.loveitid)){
//   console.log(req.query.loveit,req.query.loveitid);
//   let temp=parseInt(req.query.loveit);
//   let idclick=parseInt(req.query.loveitid);
//   boardclick(temp,idclick);

// }
// });

// router.post("/show", function (req, res, next) {
//   let updateData={
//     'id':req.body.id,
//     'title':req.body.title,
//     'content':req.body.content
//   }
//   boardupdate(updateData);
// });




// router.get("/write", function (req, res, next) {
//   res.render('write');
// });

// router.post("/write", function (req, res, next) {
//   let boardContent={'title':req.body.title,
//   'open':req.body.open,
//   'content':req.body.content
// };
// boardinput(boardContent);

// });




// module.exports = router;




/////////////////////////board/views/board.ejs
//게시판 가기
// app.get('/board.html', function (request, response) {
//     fs.readFile(__dirname + '/board/views/board.ejs', 'utf8', function (error, data) {
//         client.query('SELECT * FROM boardContent ORDER BY boardno DESC', function (error, results) {
//             console.log(results)
//             response.send(ejs.render(data, {
//                 data: results
//             }));
//         });
//     });
// });

app.get('/board.html/:num', function (request, response) {
    var page = request.params.num;
    fs.readFile(__dirname + '/board/views/board.ejs', 'utf8', function (error, data) {
        client.query('SELECT * FROM boardContent ORDER BY boardno DESC', function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true
            }));
        });
    });
});
//해당 게시판 선택
app.get('/selectBoard.html/:boardno', function (request, response) {
    var body = request.params
    fs.readFile(__dirname + '/board/views/boardDetail.ejs', 'utf8', function (error, data) {
        client.query('SELECT * FROM boardContent where boardno = ? ', [body.boardno], function (error, results) {
            console.log('detail : ', results);
            console.log('detail : ', body.boardno);
            response.send(ejs.render(data, {
                data: results
            }));
        });
    });
});
//해당 게시판 수정 페이지
app.get('/updateBoard.html/:boardno', function (request, response) {
    var body = request.params
    fs.readFile(__dirname + '/board/views/updateBoard.ejs', 'utf8', function (error, data) {
        client.query('SELECT * FROM boardContent where boardno = ? ', [body.boardno], function (error, results) {
            console.log(results)
            var session = request.session.userid;
            var userid = results[0].userid;
            if (session == userid) {
                response.send(ejs.render(data, {
                    data: results
                }));
            } else {
                response.send('<script>alert("해당 작성자가 아닙니다.");history.back();</script>');
            }

        });
    });
});
// 해당 게시판 수정
app.post('/updateBoard', function (request, response) {
    var body = request.body;
    //     // 데이터베이스 쿼리를 실행합니다.
    client.query('update boardContent set title= ?, content= ? where boardno= ?', [body.title, body.content, body.boardno], function () {
        // 응답합니다.
        console.log([body.title, body.content, body.boardno,]);
        response.redirect('/board.html/1');
    });
});

//게시판 만들기 페이지
app.get('/write.html', function (request, response) {
    fs.readFile(__dirname + '/board/views/writeBoard.ejs', 'utf8', function (error, data) {
        if (request.session.loggedin) {
            response.send(ejs.render(data, {
                data: request.session.userid
            }));
        } else {
            response.redirect('/login.html');
        }
    });
});
// 게시판 만들기 
app.post('/write', function (request, response) {
    var body = request.body;
    var session = request.session;
    //     // 데이터베이스 쿼리를 실행합니다.
    client.query('insert into boardContent (title,userid,content) values (?,?,?)', [body.title, session.userid, body.content], function () {
        // 응답합니다.
        console.log([body.title, session.userid, body.content]);
        response.redirect('/board.html/1');
    });
});


//게시판 삭제
app.get('/deleteBoard/:boardno/:userid', function (request, response) {
    var body = request.params
    var session = request.session.userid;
    console.log('body.boardno', body.boardno, 'body.userid', body.userid, 'session', session);
    //     // 데이터베이스 쿼리를 실행합니다.
    if (request.session.loggedin) {
        if (session == body.userid) {
            client.query('delete from boardContent where boardno = ?', [body.boardno], function () {
                // 응답합니다.
                response.redirect('/board.html/1');
            });
        } else {
            response.send('<script>alert("해당 작성자가 아닙니다.");history.back();</script>');
        }
    } else {
        response.redirect('/login.html');
    }

});

//게시판 검색
// app.post('/searchBoard', function (request, response) {
//     var body = request.body;
//     console.log('search!!!', body.searchBoard);
//     fs.readFile(__dirname + '/board/views/board.ejs', 'utf8', function (error, data) {
//         client.query('SELECT * FROM boardContent where title like ? ORDER BY boardno DESC', ['%' + body.searchBoard + '%'], function (error, results) {
//             response.send(ejs.render(data, {
//                 data: results
//             }));
//         });
//     });
// });

app.post('/searchBoard.html/:num', function (request, response) {
    var body = request.body;
    var page = request.params.num;
    fs.readFile(__dirname + '/board/views/searchboard.ejs', 'utf8', function (error, data) {
        client.query('SELECT * FROM boardContent where title like ? ORDER BY boardno DESC', ['%' + body.searchBoard + '%'], function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true,
                search:body.searchBoard
            }));
        });
    });
});

app.get('/searchBoard.html/:searchBoard/:num', function (request, response) {
    var body = request.body;
    var page = request.params.num;
    var search = request.params.searchBoard;
    fs.readFile(__dirname + '/board/views/searchboard.ejs', 'utf8', function (error, data) {
        client.query('SELECT * FROM boardContent where title like ? ORDER BY boardno DESC', ['%' + search+'%'], function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true,
                search:search
            }));
        });
    });
});

////////////////////////qna
// app.get('/qna.html', function(request,response){
//     fs.readFile(__dirname + '/qna/qna.html', 'utf8', function(error,data){
//         client.query('SELECT * FROM QNAboard ORDER BY No DESC', function (error, results) {
//             response.send(ejs.render(data, {
//             data: results
//             }));
//         });
//     });
// });
app.get('/qna.html/:num', function (request, response) {
    var page = request.params.num;
    fs.readFile(__dirname + '/qna/qna.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM QNAboard ORDER BY No DESC', function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true
            }));
        });
    });
});
app.get('/qnadetail.html/:No', function(request,response){
    var body = request.params
    var session = request.session;
    console.log('comment',body.adcomment)
    fs.readFile(__dirname + '/qna/qnadetail.html', 'utf8', function(error,data){
         client.query('SELECT* FROM QNAboard where No = ?', [body.No], function (error, results) {
            console.log('detail : ', results);
            console.log('detail : ', results[0].title);
            response.send(ejs.render(data, {
                data: results,
                admin : session.userid
            }));
        });
    });
});
app.post('/qnawrite', function (request, response) {
    var body = request.body;
    var session = request.session;
    //     // 데이터베이스 쿼리를 실행합니다.
    client.query('insert into QNAboard (title,writter,article) values (?,?,?)', [body.title, session.userid, body.article], function () {
        // 응답합니다.
        console.log([body.title, session.userid, body.article]);
        response.redirect('/qna.html/1');
    });
});
app.get('/qnawrite.html', function(request,response){
    fs.readFile(__dirname + '/qna/qnawrite.html', 'utf8', function(error,data){
        client.query('SELECT * FROM QNAboard ORDER BY No DESC', function (error, results) {
            if (request.session.loggedin) {
                response.send(ejs.render(data, {
                    data: request.session.userid
                }));
            } else {
                response.redirect('/login.html');
            }
        });
    });
});

//qna 수정
app.get('/qnaupdate.html/:No', function (request, response) {
    var body = request.params
    fs.readFile(__dirname + '/qna/qnaupdate.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM QNAboard where No = ? ', [body.No], function (error, results) {
            console.log(results)
            var session = request.session.userid;
            var userid = results[0].writter;
            if (session == userid) {
                response.send(ejs.render(data, {
                    data: results
                }));
            } else {
                response.send('<script>alert("해당 작성자가 아닙니다.");history.back();</script>');
            }

        });
    });
});



// 해당 Qna 수정
app.post('/qnaupdate', function (request, response) {
    var body = request.body;
    console.log([body.title, body.article, body.No]);
    //     // 데이터베이스 쿼리를 실행합니다.
    client.query('update QNAboard set title= ?, article= ? where No= ?', [body.title, body.article, body.No], function () {
        // 응답합니다.
        response.redirect('/qna.html/1');
    });
});


//Qna 삭제
app.get('/deleteQna/:No/:writter', function (request, response) {
    var body = request.params
    var session = request.session.userid;
    console.log('body.No', body.No, 'body.userid', body.writter, 'session', session);
    //     // 데이터베이스 쿼리를 실행합니다.
    if (request.session.loggedin) {
        if (session == body.writter) {
            client.query('delete from QNAboard where No = ?', [body.No], function () {
                // 응답합니다.
                response.redirect('/qna.html/1');
            });
        } else {
            response.send('<script>alert("해당 작성자가 아닙니다.");history.back();</script>');
        }
    } else {
        response.redirect('/login.html');
    }
});

// 해당 Qna 답글달기
app.post('/qnareply.html/:No', function (request, response) {
    var body = request.body;
    var params = request.params.No
    client.query('update QNAboard set adcomment = ? where No= ?', [body.adcomment, params], function () {
        // 응답합니다.
        response.redirect('/qna.html/1');
    });
});



//해당 Qna 검색
app.post('/searchQna.html/:num', function (request, response) {
    var body = request.body;
    var page = request.params.num;
    fs.readFile(__dirname + '/qna/searchQna.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM QNAboard where title like ? ORDER BY No DESC', ['%' + body.searchQna + '%'], function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true,
                search:body.searchQna
            }));
        });
    });
});

app.get('/searchQna.html/:searchQna/:num', function (request, response) {
    var body = request.body;
    var page = request.params.num;
    var search = request.params.searchQna;
    fs.readFile(__dirname + '/qna/searchQna.html', 'utf8', function (error, data) {
        client.query('SELECT * FROM QNAboard where title like ? ORDER BY No DESC', ['%' + search+'%'], function (error, results) {
            response.send(ejs.render(data, {
                data: results,
                page:page,
                leng:results.length-1,
                page_num:10,
                pass:true,
                search:search
            }));
        });
    });
});