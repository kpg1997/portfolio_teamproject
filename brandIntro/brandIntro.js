$(".menu-bar ul li").hover(function () {
    $(this).find("ul").stop().fadeToggle(300);
});
$(document).ready(function(){
    $("#total-footer").load("/totalfooter.html")
});

const brand = [
    { logo: 'CHANEL_LOGO', img: 'CHANEL_' },
    { logo: 'GUCCI_LOGO', img: 'GUCCI_' },
    { logo: 'HERMES_LOGO', img: 'HERMES_' },
    { logo: 'GIORGIO_ARMANI_LOGO', img: 'GIORGI_' },
    { logo: 'DOLCE&GAMMANA_LOGO', img: 'DOLCE_' },
    { logo: 'PATEK_LOGO', img: 'PATEK_' }
]



$('.body').ready(function () {
    var $list = $('.list');

    for (let k = 0; k < brand.length; k++) {

        var $clonelist = $('#cloneList').clone().removeAttr('id');
        var $clone = $('#brand-paneles').clone().removeAttr('id');
        var data = brand[k];
        var $data = $clone.find('.brand-title-logo').attr('src', '/' + data.logo);
        $clonelist.append($data);
        for (let p = 0; p < 4; p++) {
            var $img = $clone.find('#brand-img' + p + '').attr('src', '/' + data.img + p);
            $clonelist.append($img); console.log('./images/' + data.img + p + '.jpg');
        }
        $clonelist.show();
        $list.append($clonelist);
    }
})

$(document).ready(function(){
    $("#total-header").load("/header.html")
});
//




