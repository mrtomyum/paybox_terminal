$(document).ready(function(){
    var detail = `<a href="javascript:takethisthai()"><img src="/img/tackthis_th.png" class="img_menu"></a>
                  <a href="javascript:takeoutthai()"><img src="/img/tackout_th.png" class="img_menu"></a>`;
     document.getElementById('img_bt').innerHTML = detail;
     localStorage.action = 0;
     localStorage.getID = 0;
     localStorage.language = 1;
});

function onsayeng(id){
    responsiveVoice.setDefaultVoice("UK English Female")
    responsiveVoice.speak("English language");
    var detail =`<a href="javascript:takethiseng()"><img src="/img/tackthis.png" class="img_menu"></a>
                 <a href="javascript:takeouteng()"><img src="/img/tackout.png" class="img_menu"></a>`;
    document.getElementById('img_bt').innerHTML = detail;
    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");
    localStorage.language = 2;
}

function onsaythai(id){
    responsiveVoice.setDefaultVoice("Thai Female")
    responsiveVoice.speak("ภาษาไทย");
    var detail = `<a href="javascript:takethisthai()"><img src="/img/tackthis_th.png" class="img_menu"></a>
                  <a href="javascript:takeoutthai()"><img src="/img/tackout_th.png" class="img_menu"></a>`;
    document.getElementById('img_bt').innerHTML = detail;
    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");
    localStorage.language = 1;
}

function onsaychina(id){
    responsiveVoice.setDefaultVoice("Chinese Female")
    responsiveVoice.speak("中國");
    var detail = `<a href="javascript:takethischina()"><img src="/img/tackthis_ch.png" class="img_menu"></a>
                  <a href="javascript:takeoutchina()"><img src="/img/tackout_ch.png" class="img_menu"></a>`;
    document.getElementById('img_bt').innerHTML = detail;
    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");
    localStorage.language = 3;
}
/*////////////////// take this  //////////////////////////////*/
function takethiseng(){
    console.log("active uk");
        localStorage.lName = "UK English Female";
        localStorage.nName = "take this";
        window.location = "menu.html";
        localStorage.action = 1;
}

function takethisthai(){
    console.log("active th");
    localStorage.lName = "Thai Female";
    localStorage.nName = "รับประทานที่ร้าน";
        window.location = "menu.html";
        localStorage.action = 1;

}

function takethischina(){
    console.log("active ch");
    localStorage.lName = "Chinese Female";
    localStorage.nName = "拿著它";
        window.location = "menu.html";
        localStorage.action = 1;
}
/*////////////////// take this  //////////////////////////////*/
/*////////////////// take out  //////////////////////////////*/
function takeouteng(){
    console.log("active uk");
    localStorage.lName = "UK English Female";
    localStorage.nName = "take out";
        window.location = "menu.html";
        localStorage.action = 2;
}

function takeoutthai(){
    console.log("active th");
    localStorage.lName = "Thai Female";
    localStorage.nName = "ซื้อกลับบ้านค่ะ";
        window.location = "menu.html";
        localStorage.action = 2;
}

function takeoutchina(){
    console.log("active ch");
    localStorage.lName = "Chinese Female";
    localStorage.nName = "取出";
        window.location = "menu.html";
        localStorage.action = 2;
}
/*////////////////// take out  //////////////////////////////*/
