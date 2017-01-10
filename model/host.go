package model

import (
	"errors"
	"fmt"
	"log"
)

type Host struct {
	Id              string
	Online          bool
	TotalEscrow     float64 // มูลค่าเงินพักทั้งหมด
	BillEscrow      float64 // มูลค่าธนบัตรที่พักอยู่ในเครื่องรับธนบัตร
	TotalBill       float64 // มูลค่าธนบัตรในกล่องเก็บธนบัตร
	TotalCoinHopper float64 // มูลค่าเหรียญใน Coin Hopper
	TotalCainBox    float64 // มูลค่าเหรียญใน TotalCainBox
	TotalCash       float64 // รวมมูลค่าเงินในตู้นี้
	Web             *Client
	Dev             *Client
}

// TotalEscrow ส่งค่าเงินพัก Escrow ที่ Host เก็บไว้กลับไปให้ web
func (h *Host) GetEscrow(c *Client) {
	fmt.Println("Host.TotalEscrow <-Message...")
	c.Msg.Result = true
	c.Msg.Type = "response"
	c.Msg.Data = h.TotalEscrow
	c.Send <- c.Msg
}

// Cancel คืนเงินจากทุก Device โดยตรวจสอบเงิน Escrow ใน Bill Acceptor ด้วยถ้ามีให้คืนเงิน
func (h *Host) Cancel(c *Client) error {
	fmt.Println("Host.Cancel()...")

	// Check Bill Acceptor
	if h.TotalEscrow == 0 { // ไม่มีเงินพัก
		log.Println("ไม่มีเงินพัก:")
		c.Msg.Type = "response"
		c.Msg.Result = false
		c.Msg.Data = "ไม่มีเงินพัก"
		c.Send <- c.Msg
		return errors.New("ไม่มีเงินพัก")
	}
	// สั่งให้ BillAcceptor คืนเงินที่พักไว้
	m1 := &Message{
		Device:  "bill_acc",
		Command: "escrow",
		Type:    "request",
		Result:  true,
		Data:    false,
	}
	h.Dev.Send <- m1

	// Check BillAcc response
	err := h.Dev.Ws.ReadJSON(&m1)
	if err != nil {
		log.Println("Host.Cancel() error ->", m1.Data)
		return err
	}

	// Success
	coinHopperEscrow := h.TotalEscrow - h.BillEscrow
	h.BillEscrow = 0

	// CoinHopper สั่งให้จ่ายเหรียญที่คงค้างตามยอด coinHopperEscrow ออกด้านหน้า
	m2 := &Message{
		Device:  "coin_hopper",
		Command: "payout_by_cash",
		Type:    "request",
		Data:    coinHopperEscrow,
	}
	h.Dev.Send <- m2

	// Check if error from CoinHopper
	err = h.Dev.Ws.ReadJSON(&m2)
	if err != nil {
		log.Println("Cancel() Coin Hopper error:", err)
		c.Msg.Result = false
		c.Msg.Type = "response"
		c.Msg.Data = m2.Data
		c.Send <- c.Msg
		return err
	}
	h.TotalEscrow = 0 // เคลียร์ยอดเงินค้างให้หมด

	// Send message response back to Web Client
	c.Msg.Type = "response"
	c.Msg.Result = true
	c.Msg.Data = "sucess"
	c.Send <- c.Msg
	return nil
}

// Billing ทำการบันทึกรับชำระเงิน โดยตรวจสอบการ ทอนเงิน บันทึกลง SqLite
// และส่งข้อมูล Order Post ขึ้น Cloud แต่หาก Network Down Order.completed = false
// จะมี Routine Check Network status  คอยตรวจสอบสถานะและ Retry
func (h *Host) Billing(c *Client) error {
	// สั่ง device รับชำระ
	order := c.Msg.Data.(Order) // แปลงข้อมูล interface{} ให้เป็น Order ก่อน

	// กินธนบัตรที่พักไว้
	err := B.Take(c)
	if err != nil {
		return err
	}

	// ทอนเงินถ้ามี
	if h.TotalEscrow > order.Total {
		change := h.TotalEscrow - order.Total
		CH.PayoutByCash(change) // Todo: เพิ่มกลไกวิเคราะห์เงินทอน แล้วสั่งทอนเป็นเหรียญ เพื่อป้องกันเหรียญหมด
	}

	// อัพเดตยอดเงินสดในตู้ด้วย
	H.TotalBill = H.TotalBill + H.BillEscrow
	H.TotalEscrow = H.TotalEscrow - H.BillEscrow
	H.BillEscrow = 0

	// พิมพ์ตั๋ว และใบเสร็จ
	P.Print(&order)
	// บันทึกข้อมูลลง SQL โดย order.completed = false
	H.OrderSave(&order)
	// ส่งผลลัพธ์แจ้งกลับ Web Client ด้วยเพื่อให้ล้างยอดเงิน เริ่มหน้าจอใหม่
	c.Msg.Type = "response"
	c.Msg.Result = true
	c.Msg.Data = "success"
	H.Web.Send <- c.Msg
	// Post Order ขึ้น Cloud
	// Cloud.Order.POST()
	// Check Network Status
	// ถ้า Net Online และ Post สำเร็จ ให้บันทึก SQL order.completed = true
	return nil
}

func (h *Host) OrderSave(o *Order) {

}