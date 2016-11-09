{{define "index.tpl"}}
{{template "header.tpl" .}}
<div class="container" style="padding-top: 1%;">

        <div class="blockorder">
            <div class="title">
                <div id="itemname">
                <label>กาแฟนมสด</label>
                <label id="img"><img src="img/hot.png" width="100%"></label>
                </div>
            </div>

            <div class="price">
                <div style="width: 100%;"><b>ราคา </b><input type="number" name="price" placeholder="บาท" readonly style="width:30px; border-radius: 5px; margin-bottom: 5%;"></div>
                <div  style="width: 100%;"><b>จ่าย&nbsp;&nbsp;  </b><input type="number" placeholder="บาท" name="price"  readonly style="width:30px; border-radius: 5px;"></div>
            </div>

            <div class="size">
                <div style="float: left; font-size: 11px;"><b>Size:</b></div>
                <div class="s" style="width: 100%; float: left; height: 20px; padding: 0; font-size: 12px; margin-bottom: 3%">S</div>
                <div class="m" style="width: 100%; float: left; height: 20px; padding: 0; font-size: 12px; margin-bottom: 3%;">M</div>
                <div class="l" style="width: 100%; float: left; height: 20px; padding: 0; font-size: 12px; margin-bottom: 5%;">L</div>
                <div style="clear: both;"></div>
            </div>
            
            <div class="orderlist">
                  <table>
                      <tr>
                        <th width="70%">รายการ</th>
                        <th>ราคา</th>
                      </tr>
                      <tr>
                        <td>กาแฟนมสด</td>
                        <td style="text-align: right;">35</td>
                      </tr>
                      <tr>
                        <td>ลาเต้นมสด</td>
                        <td style="text-align: right;">35</td>
                      </tr>
                    </table>
            </div>

            <div class="bt-submit">
                <button class="ok" style="width:100%;  padding: 0 0 0 2%; font-size: 12px; height: 23px; margin-bottom: 4%;">สั่ง</button>
                <a href="index.tpl"><button class="cancel" style="width:100%; padding: 0 0 0 2%; font-size: 12px; height: 23px;">ยกเลิก</button></a>
            </div>

            
        </div>


        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>กาแฟนมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>เอสเพรสโซนมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>ลาเต้นมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>คาปูชิโนนมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>มอคค่านมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>ชาเนสทีนมาสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>ช็อคโกแลตนมสด</b></h6>
        </div>
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>โกโก้นมสด</b></h6>
        </div>      
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>มอคค่า</b></h6>
        </div>  
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>ฮาเซลนัก ลาเต้</b></h6>
        </div>  
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>คาราเมล คาปูชิโน่</b></h6>
        </div>  
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>ไอริท เอสเปรสโซ่</b></h6>
        </div>  
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;"><b>วานิลา อเมริกาโน่</b></h6>
        </div>  
        <div class="block-3 menu">
            <img src="img/hot.png" width="70%" style="margin-bottom: 2%;">
            <h6 style="margin-top: 0;">บัตเตอร์สก๊อต คาปูชิโน่</b></h6>
        </div>  

        <div style="clear: both;"></div>

</div>

{{end}}