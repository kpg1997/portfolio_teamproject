$(".menu-bar ul li").hover(function(){
    $(this).find("ul").stop().fadeToggle(300);
});
$(document).ready(function(){
    $("#total-header").load("/header.html")
});
$(document).ready(function(){
    $("#total-footer").load("/totalfooter.html")
});
