package model

import (
	"log"
	"errors"
	"fmt"
)

type BillAcceptor struct {
	Id     string
	Status string
	Send   chan *Message
}

// สั่งให้ Bill Acceptor เก็บเงิน
func (b *BillAcceptor) Take(c *Client) error {
	m := &Message{
		Device:  "bill_acceptor",
		Command: "take_reject",
		Type:    "request",
		Data:    true,
	}
	c.Send <- m

	go func() {
		for {
			select {
			case m = <-b.Send:
				fmt.Println("Received response from Bill Acceptor:")
				break
			}
		}
	}()
	if !m.Result {
		b.Status = "Error cannot take bill"
		log.Println("Error response from Bill Acceptor!")
		return errors.New("Error response from Bill Acceptor!")
	}
	H.TotalBill = + H.BillEscrow
	H.BillEscrow = 0
	fmt.Println("Received response from Bill Acceptor:", m.Result)
	return nil
}