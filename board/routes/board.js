const express = require("express");
const router = express.Router();
const fs=require('fs');

var boardinput=require("../func/data").boardinput;
var boardoutput=require("../func/data").boardoutput;
var boardupdate=require('../func/data').boardupdate;
var boarddelete=require('../func/data').boarddelete;
var boardclick=require('../func/data').boardclick;
var showshow=require('../func/function').showshow;
var upclick=require('../func/function').upclick;

/* board-page */
let sum=0;
router.get("/", function (req, res, next) {
 
  boardoutput(function (board){
  let pagecheck=Math.ceil(board.length/5);
  
   res.render('board',{
     data:board,
     gofunc:showshow,
     pagecheck:pagecheck
   });
 
 })
});

router.get("/up", function (req, res, next) {
  boardoutput(function (board){
  
    res.render('boardup',{
      data:board,
      gofunc:showshow,
      upclick:upclick
    });
  
  })
  
});


router.get("/show", function (req, res, next) {
  
  if(req.query.id){
    boardoutput(function (board){
      res.render('show',{
        title:board[(req.query.id)].title,
        content:board[(req.query.id)].content,
        id:board[(req.query.id)].id,
        page:0
       
      });
    })
  }
  if(req.query.uid){
    boardoutput(function (board){
      res.render('showup',{
       data:board,
       upclick:upclick,
       num:req.query.uid,
        page:1
       
      });
    })
  }
if(req.query.delete){
  console.log(req.query.delete);
  boarddelete(req.query.delete);
}
if((req.query.loveit)||(req.query.loveitid)){
  console.log(req.query.loveit,req.query.loveitid);
  let temp=parseInt(req.query.loveit);
  let idclick=parseInt(req.query.loveitid);
  boardclick(temp,idclick);

}
});

router.post("/show", function (req, res, next) {
  let updateData={
    'id':req.body.id,
    'title':req.body.title,
    'content':req.body.content
  }
  boardupdate(updateData);
});




router.get("/write", function (req, res, next) {
  res.render('write');
});

router.post("/write", function (req, res, next) {
  let boardContent={'title':req.body.title,
  'open':req.body.open,
  'content':req.body.content
};
boardinput(boardContent);

});




module.exports = router;
