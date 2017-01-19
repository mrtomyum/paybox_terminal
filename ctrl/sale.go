package ctrl

import (
	"fmt"
	"github.com/mrtomyum/paybox_terminal/model"
	"log"
	"github.com/gin-gonic/gin"
	"net/http"
)

// Order ทำการบันทึกรับชำระเงิน โดยตรวจสอบการ ทอนเงิน บันทึกลง SqLite
// และส่งข้อมูล Order Post ขึ้น Cloud แต่หาก Network Down Order.completed = false
// จะมี Routine Check Network status  คอยตรวจสอบสถานะและ Retry
func NewSale(c *gin.Context) {
	// รับคำสั่งจาก Web ผ่าน JSON REST
	fmt.Println("NewSale() start")
	sale := &model.Sale{}
	if c.Bind(sale) != nil {
		c.JSON(http.StatusBadRequest, sale)
		log.Println("Error JSON from Web client.")
	}
	fmt.Printf("[NewSale()] รับค่า Order จาก web-> sale= %v\n", sale)

	// ถ้าเหรียญมากกว่ายอดขาย และมีธนบัตรพักอยู่ ให้ "คาย" ธนบัตรและปรับยอดเงิน
	coinEscrow := model.H.TotalEscrow - model.H.BillEscrow
	if coinEscrow > sale.Total {
		err := model.BA.Take(false)
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"result":"error", "message":err.Error()})
		}
		model.H.TotalEscrow = - model.H.BillEscrow
		model.H.BillEscrow = 0
	}

	// กินธนบัตรที่พักไว้ *ระวัง! ถ้า Dev client ยังไม่เปิดคอนเนคชั่นจะ runtime error: invalid memory address or nil pointer derefere
	err := model.BA.Take(true)
	if err != nil {
		c.JSON(http.StatusConflict, gin.H{"result":"error", "message":err.Error()})
		log.Println("Error on Bill_Acceptor Take():", err.Error())
	}

	// ทอนเงินจาก CoinHopper ถ้ามี
	if model.H.TotalEscrow > sale.Total {
		change := model.H.TotalEscrow - sale.Total
		err = model.CH.PayoutByCash(change) // Todo: เพิ่มกลไกวิเคราะห์เงินทอน แล้วสั่งทอนเป็นเหรียญ เพื่อป้องกันเหรียญหมด
		if err != nil {
			c.JSON(http.StatusConflict, gin.H{"result":"error", "message":err.Error()})
			log.Println("Error on CH Payout():", err.Error())
		}
	}

	// อัพเดตยอดเงินสดในตู้ด้วย
	model.H.TotalBill = + model.H.BillEscrow
	model.H.TotalEscrow = - model.H.BillEscrow
	model.H.BillEscrow = 0
	model.H.TotalEscrow = 0

	// พิมพ์ตั๋ว และใบเสร็จ
	model.P.Print(sale)

	// ส่งผลลัพธ์แจ้งกลับ Web Client ด้วยเพื่อให้ล้างยอดเงิน เริ่มหน้าจอใหม่
	//model.H.Web.Msg.Type = "response"
	//model.H.Web.Msg.Result = true
	//model.H.Web.Msg.Data = "success"
	//model.H.Web.Send <- model.H.Web.Msg

	// ส่งยอดเงินพักในมือให้ web client ล้างยอดเงิน
	model.H.OnHand(model.H.Web)

	// เช็คสถานะ Network และ Server ว่า IsNetOnline อยู่หรือไม่?
	if !model.H.IsNetOnline {
		fmt.Println("Offline => Save sale to disk")
	}
	fmt.Println("sale.Post()")
	sale.Post()

	// ถ้า Net IsNetOnline และ Post สำเร็จ ให้บันทึก SQL sale.completed = true
	fmt.Println("sale.Save()")
	err = sale.Save()
	if err != nil {
		log.Println("Error in sale.Save() =>", err.Error())
	}
	c.JSON(http.StatusOK, gin.H{
		"result":       "success",
		"total_escrow": model.H.TotalEscrow,
	})
	fmt.Println("NewSale() COMPLETED, sale = ", sale)
}

//func PostNewOrderSub(ctx *gin.Context) {
//	strItemId := ctx.PostForm("itemId")
//	itemId, _ := strconv.ParseUint(strItemId, 10, 64)
//	strSize := ctx.PostForm("size")
//	size, _ := strconv.ParseInt(strSize, 10, 8)
//	price := ctx.PostForm("price")
//	qty := ctx.PostForm("qty")
//
//	newItem := new(model.OrderSub)
//	newItem.ItemId = itemId
//	newItem.Size = size
//	newItem.Size = price
//	newItem.Qty = qty
//
//	o.SaleSubs = append(o.SaleSubs, newItem)
//	var total float64 = 0
//	for _, i := range o.SaleSubs {
//		sumItem := i.Size * i.Qty
//		total += sumItem
//	}
//	o.Total = total
//}
//
//func DeleteOrder(ctx *gin.Context) {
//	o = nil
//}
//
//func DeleteOrderItem(ctx *gin.Context) {
//	l := ctx.Param("line")
//	line, _ := strconv.ParseUint(l, 10, 64)
//	i := line - 1 // slice index start from 0
//	o.SaleSubs = append(o.SaleSubs[:i], o.SaleSubs[i + 1:]...)
//}
