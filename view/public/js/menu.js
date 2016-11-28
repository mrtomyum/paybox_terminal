$(document).ready(function(){


    var id = localStorage.language;
    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");

      responsiveVoice.OnVoiceReady = function() {
              console.log("speech time?");
              if(localStorage.nName!="null"){
              responsiveVoice.setDefaultVoice(localStorage.lName);
              responsiveVoice.speak(localStorage.nName);
              }
              localStorage.lName = null;
              localStorage.nName = null;
            };

            var worker = new Worker('/js/time.js');
                 worker.onmessage = function (event) {
                 document.getElementById('timer').innerText =event.data ;
                 document.getElementById('timer2').innerText =event.data;
                 };


	switch(parseInt(id)){
	    case 1:
	            document.getElementById("version").innerHTML = "เวอร์ชั่น 0.1";
	            document.getElementById("version2").innerHTML = "เวอร์ชั่น 0.1 ";

	            document.getElementById("bt_back").innerHTML = "ย้อนกลับ";

                 document.getElementById("Name_time").innerHTML = "เวลา ";
                 document.getElementById("Name_time2").innerHTML = "เวลา ";

	            break;
	    case 2:
                document.getElementById("version").innerHTML = "version 0.1";
                document.getElementById("version2").innerHTML = "version 0.1 ";

                document.getElementById("bt_back").innerHTML = "back";

                 document.getElementById("Name_time").innerHTML = "time ";
                 document.getElementById("Name_time2").innerHTML = "time ";
	            break;
	    case 3:
               	document.getElementById("version").innerHTML = "版本 0.1";
               	document.getElementById("version2").innerHTML = "版本 0.1 ";

               	document.getElementById("bt_back").innerHTML = "背部";

               	document.getElementById("Name_time").innerHTML = "時間 ";
                document.getElementById("Name_time2").innerHTML = "時間 ";

	            break;
	}

    console.log(id);
    detailmenu(id);
    
});

function detailmenu(id){

     $.ajax({
            url: "http://"+window.location.host+"/menu/",
          //  data: '{"barcode":"'+barcode+'","docno":"'+DocNo+'","type":"1"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "GET",
            cache: false,
                success: function(result){
                  //  console.log(JSON.stringify(result));
                    var listmenu = result[id-1].menus;
                  //  console.log(JSON.stringify(listmenu));
                    var menu = "";
                    for (var i = 0; i < listmenu.length; i++) {
                          menu += `<a href="javascript:active_menu(`+listmenu[i].Id+`,'`+listmenu[i].name+`','`+result[id-1].lang_name+`');">
                                        <div class="block-2">
                                          <img src="/img/`+listmenu[i].image+`" onError="this.src = '/img/noimg.jpg'" class="block-img">
                                            <h5 style="margin-top: 0;"><div style="width: 100%; float: left; text-align: center;"><b>`+listmenu[i].name+`</b></div></h5>
                                        </div>
                                    </a>`;

                        }

                    document.getElementById("menu_data").innerHTML = menu;
                },
                error: function(err){
                    console.log(JSON.stringify(err));
                }
            });
  //var mydata = jQuery.parseJSON(data);
   //
    //console.log(JSON.stringify(mydata));
   // console.log(mydata[0].langId);
    //
    //console.log(listmenu);
   /* */
}

function active_menu(menuId,mName,lName){
    console.log("menu_id"+ menuId);
    localStorage.menuId = menuId;
    localStorage.nName = mName;
    localStorage.lName = lName;
        window.location = "item.html";


}

function onsayeng(id){
    responsiveVoice.setDefaultVoice("UK English Female");
    responsiveVoice.speak("English language");
 
    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");

    document.getElementById("version").innerHTML = "version 0.1";
    document.getElementById("version2").innerHTML = "version 0.1 ";

    document.getElementById("bt_back").innerHTML = "back";

    document.getElementById("Name_time").innerHTML = "time ";
    document.getElementById("Name_time2").innerHTML = "time ";

    localStorage.language = 1;
    detailmenu(id);
}

function onsaythai(id){
    responsiveVoice.setDefaultVoice("Thai Female");
    responsiveVoice.speak("ภาษาไทย");

    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");

    document.getElementById("version").innerHTML = "เวอร์ชั่น 0.1";
	document.getElementById("version2").innerHTML = "เวอร์ชั่น 0.1 ";

	document.getElementById("bt_back").innerHTML = "ย้อนกลับ";

    document.getElementById("Name_time").innerHTML = "เวลา ";
    document.getElementById("Name_time2").innerHTML = "เวลา ";

    setTimeout(function(){
        localStorage.language = 2;
        detailmenu(id);
    }, 1000);

}

function onsaychina(id){
    responsiveVoice.setDefaultVoice("Chinese Female");
    responsiveVoice.speak("中國");

    $("img").removeClass("active_img");
    $("#"+id).addClass("active_img");

    document.getElementById("version").innerHTML = "版本 0.1";
    document.getElementById("version2").innerHTML = "版本 0.1 ";

    document.getElementById("bt_back").innerHTML = "背部";

	document.getElementById("Name_time").innerHTML = "時間 ";
    document.getElementById("Name_time2").innerHTML = "時間 ";

    localStorage.language = 3;
    detailmenu(id);
}