$(document).ready(function(){
    $("#total-header").load("/header.html")
});

$(document).ready(function(){
    $("#total-footer").load("/totalfooter.html")
});

function writeForm() {
    location.href = '/qnawrite.html';
  }