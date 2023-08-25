package main

import (
	"fmt"
	"log"
	"net/http"
)

type MyHandler struct{}

func (myHandler *MyHandler) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprint(writer, "hihi")
}

func (myHandler *MyHandler) init() {
	fmt.Println("test")
}

func handleFunc(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "hihi")
	log.Println("hihi")
}

func main() {
	var myHandler = MyHandler{}
	var mux = http.ServeMux{}
	var server = http.Server{
		Addr:    "",
		Handler: &mux,
	}
	mux.Handle("/test", &myHandler)
	mux.HandleFunc("/hihi", handleFunc)
	server.ListenAndServe()
}
