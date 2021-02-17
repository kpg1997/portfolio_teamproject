$(document).ready(function(){
    $("#total-header").load("/header.html")
});
$(document).ready(function(){
    $("#total-footer").load("/totalfooter.html")
});
function login() {
    var id = document.getElementById('input-id').value;
    var pwd = document.getElementById('input-pwd').value;
    console.log(id, ',', pwd)
    if (id.length >= 6) {
        if (pwd.length >= 8) {
            console.log('로그인 시도');
            loginForm.submit();
            
        } else {
            alert('비밀번호 8자리 이상 입력부탁드립니다.');
        }
    } else {
        alert('아이디 6자리 이상 입력부탁드립니다.');
    }
}
function join() {
    location.href = "/agree.html";
}
function find(num) {
    if (num == 1) {
        alert('아이디 찾기');
    } else {
        alert('비번 찾기');
    }
}

$(".menu-bar ul li").hover(function () {
    $(this).find("ul").stop().fadeToggle(300);
});
function find() {
    // console.log(text);
    window.open('/forgot.html', '_blank', "width=600,height=300,scrollbars=yes");
}
// forgot.html

function findUserID() {
    let name = document.getElementById('find-id-name').value;
    let email = document.getElementById('find-id-email').value;
    console.log(name,',',email)
    if (name != '' && email != '') {
        console.log(name, ',', email);
        formId.submit();
        document.getElementById('show-user-id').style = 'display : inline-block';
    } else if(name == ''){
        alert('이름 입력해주세요')
    }else if(email == ''){
        alert('이메일 입력해주세요')
    }else if (!validateEmail(email)) {
        alert('이메일 기입을 정확히 해주시기 바랍니다.')
    } else {
        alert('다시 입력바랍니다.')
    }

}

function findUserPwd() {
    let id = document.getElementById('find-pwd-id').value;
    let name = document.getElementById('find-pwd-name').value;
    let email = document.getElementById('find-pwd-email').value;
    if (name != '' & email != '' & id != '') {
        console.log(id, ',',  name, ',',  email)
        formPwd.submit();
    }else if(id == ''){
        alert('아이디 입력해주세요')
    } else if(name == ''){
        alert('이름 입력해주세요')
    }else if(email == ''){
        alert('이메일 입력해주세요')
    } else if (!validateEmail(email)) {
        alert('이메일 기입을 정확히 해주시기 바랍니다.')
    } else {
        alert('다시 입력바랍니다.')
    }

}
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// $('#find-id-btn').onfocus(function(){
//     $('#show-user-id').addClass('changevalue');
// })

$('#show-user-id').ready(function(){
    let $showUserid = document.getElementById('show_id').value;
    if($showUserid.search('=data')==2){
        $('#show-user-id').css('display','none');
    }else{
        $('#show-user-id').css('display','inline-block');
    }
})
$('#show-user-pwd').ready(function(){
    let $showUserid = document.getElementById('show_pwd').value;
    if($showUserid.search('=data')==2){
        $('#show-user-pwd').css('display','none');
    }else{
        $('#show-user-pwd').css('display','inline-block');
    }
})
$('.click-id').click(function(){
    $('.input-id-panel').css('display','block');
    $('.click-id').css('font-weight','bold');
    $('.click-pwd').css('font-weight','normal');
    $('.input-pwd-panel').css('display','none');
    $('#show_id').val()=false;
})
$('.click-pwd').click(function(){
    $('.input-id-panel').css('display','none');
    $('.click-pwd').css('font-weight','bold');
    $('.click-id').css('font-weight','normal');
    $('.input-pwd-panel').css('display','block');
    $('#show_pwd').val()=false;
})