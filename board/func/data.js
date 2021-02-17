const mysql =require("mysql");


const db = mysql.createConnection({
    host: 'dbcon.cafe24app.com',
    user: 'kpg1997',
    password: 'qlalf8956!!',
    database: 'kpg1997',
    port: '3306',
});
  
db.connect((error)=>{
if(error){
    console.log(error);
}
else{
    console.log("sql connected..")
}
});


exports.boardinput=function(board){
    let sql='INSERT INTO boardContent (id,title,open,content,click) VALUES (?,?,?,?,?)';
   db.query(sql,[0,board.title,board.open,board.content,0],function(error,rows){

       if(error) throw error;
       
       console.log("게시판 잘들어감");
   })

}

exports.boardoutput=function(callback){
   db.query('SELECT * FROM boardContent',function(error,rows){
       if(error) throw error;

       callback(rows);
   })

}

exports.boardupdate=function(board){
    let sql='UPDATE boardContent SET title=?,content=?WHERE id=?';
    db.query(sql,[board.title,board.content,board.id],function(error,rows){

        if(error) throw error;

        console.log('잘변경됨');
    }) 
}


exports.boarddelete=function(data){
let sql='DELETE FROM boardContent WHERE id=?';
db.query(sql,[data],function(error,rows){
    if(error) throw error;

    console.log("삭제완료!");
})
}

exports.boardclick=function(clickdata,iddata){
let sql='UPDATE boardContent SET click=click+1 WHERE id=?';
db.query(sql,[iddata],function(error,rows){
    if(error) throw error;

    console.log("click 잘 적용중");
})
}

