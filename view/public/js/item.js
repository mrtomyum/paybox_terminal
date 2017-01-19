var listOrder = [];
$("document").ready(function(){
    var menuId = localStorage.menuId;
	var id = localStorage.language;
	var status = localStorage.action;

    call_websocket();
    setTimeout(function(){
        doSend('{"Device":"'+window.location.host+'","type":"request","command":"onhand"}');
    },1000);
    if(localStorage.ColorCode){
       localStorage.ColorCode = localStorage.ColorCode;
    }else{
       localStorage.ColorCode = "#0f0f0a";
    }
   //websocket.onopen();
   //doSend('{"Device":"'+window.location.host+'","type":"request","command":"onhand"}');


   /* onHend = setInterval(function(){ doSend(`{"job":"onHand"}`);},1000);*/
   // onHend = setInterval(function(){  websocket.onmessage(); },1000);

      var worker = new Worker('/js/time.js');
                 worker.onmessage = function (event) {
                 document.getElementById('timer').innerText =event.data ;
                 document.getElementById('timer2').innerText =event.data;
                 };
    console.log(id);
	switch(parseInt(id)){
	    case 1:
	            if(localStorage.OrgCode==1){
	                status = "ตั๋ว"
	            }else{
	                if(status==1){ status = "รับประทานที่ร้าน"}else{ status = "ซื้อกลับบ้าน"}
	            }

	            document.getElementById("Status").innerHTML = "สถานะ : "+status;

	            document.getElementById("txtTotalPri").innerHTML = "ราคารวม";
	            document.getElementById("txtmacPri").innerHTML = "จำนวนเงิน";
	            document.getElementById("txtUnit").innerHTML = "บาท";
	            document.getElementById("txtUnit2").innerHTML = "บาท";

	          /*  document.getElementById("bt_payment").innerHTML = "ชำระเงิน";
	            document.getElementById("bt_print").innerHTML = "ยืนยัน";
	            document.getElementById("bt_cancel").innerHTML = "ยกเลิก";*/

	            document.getElementById("default_order").innerHTML = "** กรุณาเลือกรายการ **";
	            document.getElementById("title_order").innerHTML = "รายการ";

	            document.getElementById("version").innerHTML = "เวอร์ชั่น 0.1";
	            document.getElementById("version2").innerHTML = "เวอร์ชั่น 0.1 ";

                 document.getElementById("Name_time").innerHTML = "เวลา ";
                 document.getElementById("Name_time2").innerHTML = "เวลา ";

	            break;
	    case 2: if(localStorage.OrgCode==1){
                	 status = "Ticket"
                }else{
                    if(status==1){ status = "take this"}else{ status = "this out"}
                }
                document.getElementById("Status").innerHTML = "status : "+status;

                document.getElementById("txtTotalPri").innerHTML = "Total";
                document.getElementById("txtmacPri").innerHTML = "Payment";
                document.getElementById("txtUnit").innerHTML = "baht";
                document.getElementById("txtUnit2").innerHTML = "baht";

              /*  document.getElementById("bt_payment").innerHTML = "Payment";
                document.getElementById("bt_print").innerHTML = "Confirm";
                document.getElementById("bt_cancel").innerHTML = "cancel";*/

                document.getElementById("default_order").innerHTML = "** Please select an item **";
                document.getElementById("title_order").innerHTML = "Order";

                document.getElementById("version").innerHTML = "version 0.1";
                document.getElementById("version2").innerHTML = "version 0.1 ";

                document.getElementById("Name_time").innerHTML = "time ";
                document.getElementById("Name_time2").innerHTML = "time ";
	            break;
	    case 3: if(localStorage.OrgCode==1){
                  	status = "車票"
                }else{
	                if(status==1){ status = "拿著它"}else{ status = "取出"}
               	}
               	document.getElementById("Status").innerHTML = "狀態 : "+status;

               	document.getElementById("txtTotalPri").innerHTML = "總價";
               	document.getElementById("txtmacPri").innerHTML = "付款";
               	document.getElementById("txtUnit").innerHTML = "銖";
               	document.getElementById("txtUnit2").innerHTML = "銖";

               /*	document.getElementById("bt_payment").innerHTML = "付款";
               	document.getElementById("bt_print").innerHTML = "确认";
               	document.getElementById("bt_cancel").innerHTML = "取消";*/

               	document.getElementById("default_order").innerHTML = "** 請選擇一個項目 **";
               	document.getElementById("title_order").innerHTML = "名單";

               	document.getElementById("version").innerHTML = "版本 0.1";
               	document.getElementById("version2").innerHTML = "版本 0.1 ";

               	document.getElementById("Name_time").innerHTML = "時間 ";
                document.getElementById("Name_time2").innerHTML = "時間 ";
	            break;
	}

      responsiveVoice.OnVoiceReady = function() {
          console.log("speech time?");
          if(localStorage.nName!="null"){
          responsiveVoice.setDefaultVoice(localStorage.lName);
          responsiveVoice.speak(localStorage.nName);
          }
          localStorage.lName = null;
          localStorage.nName = null;
        };

        if(localStorage.ColorCode){
           document.getElementById("cleft").style.backgroundColor = localStorage.ColorCode;
           document.getElementById("cleft").style.borderColor = localStorage.ColorCode;
           document.getElementById("chead").style.backgroundColor = localStorage.ColorCode;
        }
        if(localStorage.OrgCode == 0){
             main_menu(id);
             console.log("menuid "+menuId);
             item(id,(parseInt(menuId)-1));
             disabled_payment();
        }else if(localStorage.OrgCode == 1){
           //  window.location = "menu.html";
             ticket_menu(id);
             console.log("menuid "+menuId);
             ticket_item(id,(parseInt(menuId)-1));
             disabled_payment();
        }
    //


});

function disabled_payment(){
    if(JSON.stringify(listOrder)=="[]"){
        console.log(JSON.stringify(listOrder));
        console.log("listOrder is isset");
         payment1 = function() {
             Alert7.alert("ท่านยังไม่ได้เลือกรายการที่ต้องการ");
         }
    }else{
        console.log("listOrder is empty");
        payment1 = function() {
           //payment();
           print();
        }
    }
}
function ticket_menu(id){
     var result = JSON.parse(tiket_menu);
      //  console.log(JSON.stringify(result));
        var listmenu = result[id-1].menu;
        console.log(JSON.stringify(listmenu));
        var menu = "";
         //console.log(JSON.stringify(result));
         var sId = localStorage.menuId-1;
         //console.log(listmenu);
         for (var i = 0; i < listmenu.length; i++) {
             if(localStorage.menuId==i){
                  menu += `<li onclick="active(`+i+`)"><a href="#" id="`+i+`">`+listmenu[i].name+`</a></li>`;
             }else{
                  menu += `<li onclick="active(`+i+`)"><a href="#" id="`+i+`">`+listmenu[i].name+`</a></li>`;
                  }
         }

         document.getElementById("li_menu").innerHTML = menu;
         $("a").removeClass("active");
         $("#"+parseInt(sId)).addClass("active");
         var x = document.getElementsByTagName("LI");
              for(var i = 0;i < x.length; i++){
                 x[i].style.background = localStorage.ColorCode;
                 if(i!=parseInt(sId)){
                    //console.log(i);
                    x[i].style.borderBottom = "1px dashed #fff";
                 }else{
                    x[i].style.borderBottom = "0px dashed #fff";
                 }
              }
               //	console.log(sId);
         $("#"+parseInt(sId)).css("background-color", localStorage.ColorCode);
         $("#"+parseInt(sId)).css("color", "#fff");
         document.getElementById("itemlist").style.background = localStorage.ColorCode;
         document.getElementById("centitem").style.background = localStorage.ColorCode;
}

function ticket_item(lang,menuId){
    console.log("itemactive " + menuId);
    if(menuId==0){var menu = menu_tiket}else{var menu = menu_tiketfer}
     var result = JSON.parse(menu);
     var items = result[parseInt(lang)-1].items;;
     console.log("new "+JSON.stringify(items));
     var item = "";
         for(var i = 0; i < items.length; i++){
            	var size = items[i].sizes;
               	item += `<a href="#"><div class="block-3"
               			onclick="showmodal('`+items[i].id+`','`+items[i].name+`','/img/`+items[i].image+`','คน',
               			'`+size[0].name+'/'+size[0].price+`'
              			,'`+size[1].name+'/'+size[1].price+`'
                		,'`+size[2].name+'/'+size[2].price+`')">
                   		<img src="/img/`+items[i].image+`" onError="this.src = '/img/noimg.jpg'" class="block-img">
                        <h5 style="margin-top: 0;">
                        <div style="width: 80%; float: left;">`+items[i].name+`
                        </div><div style="width: 20%; float: left; padding:0;">`+size[0].price+`</div></h5>
                        </div></a>`;
         }
         //console.log(item);
         document.getElementById("list_item").innerHTML = item;
}

function main_menu(id){
	//var mydata = jQuery.parseJSON(data);
	console.log("menuid "+id);
     $.ajax({
            url: "http://"+window.location.host+"/menu",
          //  data: '{"barcode":"'+barcode+'","docno":"'+DocNo+'","type":"1"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "GET",
            cache: false,
                success: function(result){
                        var menu = "";
                        //console.log(JSON.stringify(result));
                       // console.log(mydata[0].langId);
                        var listmenu = result[id-1].menus;
                        var sId = localStorage.menuId-1;
                        //console.log(listmenu);
                        for (var i = 0; i < listmenu.length; i++) {
                          if(localStorage.menuId==i){
                            menu += `<li onclick="active(`+i+`)"><a href="#" id="`+i+`">`+listmenu[i].name+`</a></li>`;
                          }else{
                            menu += `<li onclick="active(`+i+`)"><a href="#" id="`+i+`">`+listmenu[i].name+`</a></li>`;
                          }
                        }

                        document.getElementById("li_menu").innerHTML = menu;
                        $("a").removeClass("active");
                        $("#"+parseInt(sId)).addClass("active");
                        var x = document.getElementsByTagName("LI");
                        	for(var i = 0;i < x.length; i++){
                        		x[i].style.background = localStorage.ColorCode;
                        		if(i!=parseInt(sId)){
                        			//console.log(i);
                        			x[i].style.borderBottom = "1px dashed #fff";
                        		}else{
                        			x[i].style.borderBottom = "0px dashed #fff";
                        		}
                        	}
                        //	console.log(sId);
                        $("#"+parseInt(sId)).css("background-color", localStorage.ColorCode);
                        $("#"+parseInt(sId)).css("color", "#fff");
                        document.getElementById("itemlist").style.background = localStorage.ColorCode;
                        document.getElementById("centitem").style.background = localStorage.ColorCode;
               },
                error: function(err){
                    console.log(JSON.stringify(err));
                }
            });

}

function item(lang,menuId){
	console.log(lang+", "+menuId);
    $.ajax({
            url: "http://"+window.location.host+"/menu/"+(parseInt(menuId)+1),
          //  data: '{"barcode":"'+barcode+'","docno":"'+DocNo+'","type":"1"}',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            type: "GET",
            cache: false,
                success: function(result){
                    //console.log(JSON.stringify(result));
                    var items = result[parseInt(lang)-1].items;;
                    console.log("new "+JSON.stringify(items));
                    var item = "";
                    for(var i = 0; i < items.length; i++){
                    	var price = items[i].prices;
                    	item += `<a href="#"><div class="block-3"
                    			onclick="showmodal('`+items[i].Id+`','`+items[i].name+`','`+items[i].menu_seq+`','/img/`+items[i].image+`','`+items[i].unit+`',
                    			'`+price[0].name+'/'+price[0].price+`'
                    			,'`+price[1].name+'/'+price[1].price+`'
                    			,'`+price[2].name+'/'+price[2].price+`')">
                    			<img src="/img/`+items[i].image+`" onError="this.src = '/img/noimg.jpg'" class="block-img">
                    			<h5 style="margin-top: 0;">
                    			<div style="width: 80%; float: left;">`+items[i].name+`
                    			</div><div style="width: 20%; float: left; padding:0;">`+price[0].price+` ฿</div></h5>
                    			</div></a>`;
                    }
                    					//console.log(item);
                    document.getElementById("list_item").innerHTML = item;
                },
                error: function (err){
                    console.log(JSON.stringify(err));
                }
          });

}


function active_size(id,price) {
 		$("h1").removeClass("acsize");
		$("#"+id).addClass("acsize");
		var qty = document.getElementById("mo_qty").value;
		document.getElementById("Msize").value = id;

		var totalPrice = qty*price;


		console.log("ราคา " + totalPrice+", nameSize = "+id);
		document.getElementById("mo-pri").value = totalPrice+` ฿`;
		//Alert7.alert('$("#'+id+'").addClass("acsize")');
}

function addQty(){
	var qty = document.getElementById("mo_qty").value;
	var pri = document.getElementById("mo-pri").value;

	var price = "";
	price = pri.split(" ");
	price = price[0];

	var size_pri = parseInt(price)/parseInt(qty);

	var addQty = 0;
	if(qty>=1){
		addQty = parseInt(qty)+1;
	}
	document.getElementById("mo_qty").value = addQty;
	document.getElementById("mo-pri").value = size_pri*addQty+` ฿`;
}

function removeQty(){
	var qty = document.getElementById("mo_qty").value;
	var pri = document.getElementById("mo-pri").value;

	var price = "";
	price = pri.split(" ");
	price = price[0];

	var size_pri = parseInt(price)/parseInt(qty);

	var addQty = 0;
	if(qty>=1){
		addQty = qty-1;
	}

	if(addQty<1){
		document.getElementById("mo_qty").value = 1;
		document.getElementById("mo-pri").value = size_pri*1+` ฿`;
	}else{		
		document.getElementById("mo_qty").value = addQty;
		document.getElementById("mo-pri").value = size_pri*addQty+` ฿`;
	}
}


function active(id) {
console.log("active id "+id);
	if(localStorage.getID!=null){
		console.log(localStorage.getID);
		document.getElementById(localStorage.getID).style.background = "#f3f3f4";
		document.getElementById(localStorage.getID).style.color = "#000";
		/*$("#"+localStorage.getID).css("background-color", "#f3f3f4");
		$("#"+localStorage.getID).css("color", "#000");*/
		localStorage.getID = id;
		localStorage.menuId = id+1;
	}else{
		localStorage.getID = id;
		localStorage.menuId = id+1;
	}
	console.log("menuId " + localStorage.getID);
	$("a").removeClass("active");
	$("a").removeAttr("style");
	$("li").removeAttr("style");
	$("#"+id).addClass("active");
	var x = document.getElementsByTagName("LI");

	for(var i = 0;i < x.length; i++){
		x[i].style.background = localStorage.ColorCode;
		if(i!=id){
			//console.log(i);
			x[i].style.borderBottom = "1px dashed #fff";
		}else{
			x[i].style.borderBottom = "0px dashed #fff";
		}
	}
	//x[id].style.background = localStorage.ColorCode;
	/*document.getElementById(id).style.background = localStorage.ColorCode;
	document.getElementById(id).style.color = "#fff";*/
	$("#"+id).css("background-color", localStorage.ColorCode);
    $("#"+id).css("color", "#fff");
	document.getElementById("itemlist").style.background = localStorage.ColorCode;
	document.getElementById("centitem").style.background = localStorage.ColorCode;
	  if(localStorage.OrgCode == 0){
	     item(localStorage.language,localStorage.getID);
      }else if(localStorage.OrgCode == 1){
         ticket_item(localStorage.language,localStorage.getID);
      }
}

function showmodal(id,name,line,img,unit,s,m,l){
	$("h1").removeClass("acsize");
	$("#s").addClass("acsize");

	console.log(id+", "+name+", "+line+","+img+", "+unit+", "+s+", "+m+", "+l);
	

	var Mitem = id+` : `+name;
	var Mimg = `<img class="crop" src="`+img+`" onError="this.src = '/img/noimg.jpg'" width="100%"/>`;

	var s = s.split("/");
	var sName = s[0];
	var sPrice = s[1];

	var m = m.split("/");
	var mName = m[0];
	var mPrice = m[1];

	var l = l.split("/");
	var lName = l[0];
	var lPrice = l[1];
	var size = "";
    if(localStorage.OrgCode == 0){
		if( sPrice != "0"){
		size += `<a href="#"><h1 id="`+sName+`" onclick="active_size('`+sName+`','`+sPrice+`')" class="acsize">
					<img src="/img/s.png" class="img-size"><b>Small </b></h1>
				</a>`;
		}

		if( mPrice != "0"){
   		size += `<a href="#"><h1 id="`+mName+`" onclick="active_size('`+mName+`','`+mPrice+`')">
          			<img src="/img/m.png" class="img-size"><b>Medium </b></h1>
          		</a>`;
        }

        if( lPrice != "0"){
        size += `<a href="#"><h1 id="`+lName+`" onclick="active_size('`+lName+`','`+lPrice+`')">
          			<img src="/img/l.png" class="img-size"><b>large </b></h1>
          		</a>`;
        }
    }else{

    }
    var totalPrice = 1*sPrice;

    document.getElementById("MitemNo").value = id;
    document.getElementById("MitemName").value = name;
    document.getElementById("line").value = line;
    document.getElementById("Munit").value = unit;
    document.getElementById("Msize").value = sName;
    document.getElementById("mo_qty").value = 1;
	document.getElementById("Mitem_title").innerHTML = Mitem.substring(0, 25)+"...";
	document.getElementById("Mimg").innerHTML = Mimg;
	document.getElementById("menusize").innerHTML = size;
	document.getElementById("mo-pri").value = totalPrice+` ฿`;

	 $('#myModal').modal('show');
}

function send_order(){
    var itemCode = document.getElementById("MitemNo").value;
    var itemName = document.getElementById("MitemName").value;
    var line = document.getElementById("line").value;
    var qty = document.getElementById("mo_qty").value;
    var price = document.getElementById("mo-pri").value;
    var unit = document.getElementById("Munit").value;
    var size = document.getElementById("Msize").value;

    price = price.split(" ");

    order_list(itemCode,itemName,line,size,qty,unit,price[0]);
    $('#myModal').modal('toggle');
   // console.log("itemCode = "+itemCode+", itemName = "+itemName+", qty = "+qty+", size ="+size+", unit = "+unit+", price = "+price);
}
//var line = 1;
function order_list(itemCode,itemName,line,size,qty,unit,price){
   // console.log(itemCode+","+itemName+","+size+","+qty+","+unit+","+price);

   listOrder.push({"line":line,"item_id":itemCode,"item_name":itemName,"qty":qty,"price_name":size,"price":price,"unit":unit});
   line += 1;
   console.log(JSON.stringify(listOrder));
   var list = "";
   var totalPrice = 0;
   for(var i = 0; i < listOrder.length; i++){
       list += `
                  <label class="orderlist">
                       <div class="ordername" onclick="return false;"> `+listOrder[i].item_name+` `+listOrder[i].price_name+`</div>
                       <div class="orderqty" onclick="return false;">`+listOrder[i].qty+` `+listOrder[i].unit+`</div>
                       <div class="orderprice" onclick="return false;">`+listOrder[i].price+` ฿</div>
                       <div class="ordercancel">
                       <button class="btn btn-danger btn-xs"  onclick="item_cancel(`+i+`)" style="padding-left: 22.5%; padding-right: 22.5%;">-
                       </button>
                     </div>
                  </label>
                `;
       totalPrice += parseInt(listOrder[i].price);
   }
    //console.log(numeral(totalPrice).format('0,0'));
    var ttPrice = numeral(totalPrice).format('0,0');
   document.getElementById("pri1").value = ttPrice;
   document.getElementById("order_list").innerHTML = list;
   //console.log(list);
   disabled_payment();
}

function item_cancel(index){

       var _alertA = new Alert7();
       _alertA.setTitle("ลบรายการสินค้า");
       _alertA.setMessage("ท่านต้องการลบรายการสินค้านี้ ใช่หรือไม่ ?");
       _alertA.setType(Alert7.TYPE_CONFIRM);
       _alertA.addAction("No", function(){

       });
       _alertA.addAction("Yes", function(){
            listOrder.splice(index, 1);
            console.log(listOrder);
            Alert7.alert("ยกเลิกรายการที่ท่านต้องการเรียบร้อย");

                var list = "";
                 var totalPrice = 0;
                 console.log(listOrder.length);
                 for(var i = 0; i < listOrder.length; i++){
                     list += `
                                <label class="orderlist" onclick="return false">
                                     <div class="ordername"> `+listOrder[i].item_name+` `+listOrder[i].price_name+`</div>
                                     <div class="orderqty">`+listOrder[i].qty+` `+listOrder[i].unit+`</div>
                                     <div class="orderprice">`+listOrder[i].price+` ฿</div>
                                     <div class="ordercancel">
                                     <button class="btn btn-danger btn-xs" onclick="item_cancel(`+i+`)" style="padding-left: 22.5%; padding-right: 22.5%;">-
                                     </button>
                                   </div>
                                </label>
                              `;
                     totalPrice += parseInt(listOrder[i].price);
                 }
                 console.log(numeral(totalPrice).format('0,0'));
                 var ttPrice = numeral(totalPrice).format('0,0');
                 document.getElementById("pri1").value = ttPrice;
                    if(list!=""){
                         list = list;
                    }else{
                         list = `<label class="orderlist"><h4 style='color:red; text-align:center; padding:0; width:95%;'>** กรุณาเลือกรายการ **</h4></label>`;
                    }
                 document.getElementById("order_list").innerHTML = list;
                // console.log(list);
                disabled_payment();
       });
       _alertA.present();


}


function onsayeng(id){
    responsiveVoice.setDefaultVoice("UK English Female");
    responsiveVoice.speak("English language");
 
    $("img").removeClass("active_img");
    $("#l"+id).addClass("active_img");
    $("#r"+id).addClass("active_img");
    localStorage.language = 1;

    main_menu(localStorage.language);
	active(localStorage.getID);
	item(localStorage.language,localStorage.getID);
    //detailmenu(id);
}

function onsaythai(id){
    responsiveVoice.setDefaultVoice("Thai Female");
    responsiveVoice.speak("ภาษาไทย");

    $("img").removeClass("active_img");
    $("#l"+id).addClass("active_img");
    $("#r"+id).addClass("active_img");
    localStorage.language = 2;

    main_menu(localStorage.language);
	active(localStorage.getID);
	item(localStorage.language,localStorage.getID);
    //detailmenu(id);
}

function onsaychina(id){
    responsiveVoice.setDefaultVoice("Chinese Female");
    responsiveVoice.speak("中國"); 

    $("img").removeClass("active_img");
    $("#l"+id).addClass("active_img");
    $("#r"+id).addClass("active_img");
    localStorage.language = 3;

    main_menu(localStorage.language);
	active(localStorage.getID);
	item(localStorage.language,localStorage.getID);
    //detailmenu(id);
}
var onHend = "";
function payment(){
    var bt_payment = document.getElementsByClassName("Payment");
    var bt_print = document.getElementsByClassName("print");

    var block = document.getElementsByClassName("block-3");
    for(var i = 0; i < block.length; i++){
        block[i].style.pointerEvents = 'none';
    }

    $(".btn-xs").removeAttr("onclick");
    $(".btn-xs").addClass("disabled");


    anchors = document.querySelectorAll('.ul_menu li'),
    elems = {};
    [].forEach.call(anchors, function(anchor) {
        elems[anchor.id] = anchor.getAttribute('onclick');
        anchor.setAttribute('onclick', '');
    });

   // bt_payment[0].style.display = "none";
    //bt_print[0].style.display = "inline-block";
  /*  call_websocket();
    websocket.onopen();
    onHend = setInterval(function(){ doSend(`{"job":"onHand"}`);},1000);*/


    //console.log("kkk");
}

function print(){
    var pri1 = document.getElementById("pri1").value;
    var pri2 = document.getElementById("pri2").value;
 //   payment();
     pri1 = numeral(pri1).format('0.0');
     pri2 = numeral(pri2).format('0.0');
    var changeMoney = parseInt(pri2)-parseInt(pri1);
   //console.log(changeMoney);
   var status = localStorage.action;
   if(localStorage.OrgCode==1){
   	   status = "Ticket"
   }else{
   	   if(status==1){ status = "Take This"}else{ status = "Take Home"}
   }
    var orderType = status;
    var output = "";
    output = `{"total":`+parseInt(pri1)+`,"payment":`+parseInt(pri2)+`,"change":`+changeMoney+`,"type":"`+orderType+`","sale_sub":`+JSON.stringify(listOrder)+`}`;
    //console.log(output);
    console.log(parseInt(pri2)+","+parseInt(pri1));
    if(changeMoney<0){
        Alert7.alert("ยอดเงินไม่พอชำระ");
    }else {
      //  clearInterval(onHend);
       //   alert(output);
        //  doSend(output);
        console.log(output);
               $.ajax({
                      url: "http://"+window.location.host+"/sale",
                      data: output,
                      contentType: "application/json; charset=utf-8",
                      dataType: "json",
                      type: "POST",
                      cache: false,
                          success: function(res){
                            //console.log(JSON.stringify(res.result));
                            if(res.result==='success'){
                                Alert7.alert(res.result);
                                setTimeout(function(){
                                    window.location = 'index.html';
                                },2000)
                            }

                         },
                          error: function(err){
                              console.log(JSON.stringify(err));
                          }
                      });
    }

}

function cancel_menu(){
    var _alertA = new Alert7();
    _alertA.setTitle("ยกเลิกรายการ");
    _alertA.setMessage("ท่านต้องการยกเลิกรายการ ใช่หรือไม่ ?");
    _alertA.setType(Alert7.TYPE_CONFIRM);
    _alertA.addAction("No", function(){

    });
    _alertA.addAction("Yes", function(){
        var cancel = '{"device": "host",';
                cancel += '"type" : "request",';
                cancel += '"command" : "cancel"';
               // cancel += '"result" : true';
                cancel += '}';
            doSend(cancel);
    });
    _alertA.present();


}