package api

import (
	"bufio"
	"log"
	"net"
	"strings"
)

type TcpRequestSender struct {
	conns        chan *net.Conn
	address      string
	logger       *log.Logger
	printRequest bool
}

func NewTcpRequestSender(numConcurrentConnections int, address string, logger *log.Logger, printRequest bool) *TcpRequestSender {
	conns := make(chan *net.Conn, numConcurrentConnections)
	for i := 0; i < numConcurrentConnections; i++ {
		conn, _ := net.Dial("tcp", address)
		conns <- &conn
	}
	return &TcpRequestSender{conns: conns, address: address, logger: logger, printRequest: printRequest}
}

func (sender *TcpRequestSender) SendRequest(request string) (res string) {
	if sender.printRequest {
		sender.logger.Println("req: ", request)
	}
	conn := <-sender.conns
	var err error
	if *conn == nil {
		connVal, err := net.Dial("tcp", sender.address)
		if err != nil {
			sender.logger.Println(err)
			return
		}
		conn = &connVal
	}
	_, err = (*conn).Write([]byte(request))
	if err != nil {
		sender.logger.Println(err)
		connVal, err := net.Dial("tcp", sender.address)
		if err != nil {
			sender.logger.Println(err)
			return
		}
		conn = &connVal
		_, err = connVal.Write([]byte(request))
		if err != nil {
			sender.logger.Println(err)
			sender.conns <- conn
			return
		}
	}
	netData, err := bufio.NewReader(*conn).ReadString('\n')
	res = strings.TrimSpace(netData)
	sender.conns <- conn
	if sender.printRequest {
		sender.logger.Println("res: ", res+"\n")
	}
	return
}

func (sender *TcpRequestSender) SendRequestSingleConn(request string) (res string) {
	if sender.printRequest {
		sender.logger.Println("req: ", request)
	}
	conn, err := net.Dial("tcp", sender.address)
	if err != nil {
		sender.logger.Println(err)
		return
	}
	_, err = conn.Write([]byte(request))
	if err != nil {
		sender.logger.Println(err)
		conn.Close()
		return
	}
	netData, err := bufio.NewReader(conn).ReadString('\n')
	res = strings.TrimSpace(netData)
	if sender.printRequest {
		sender.logger.Println("res: ", res+"\n")
	}
	conn.Close()
	return
}
