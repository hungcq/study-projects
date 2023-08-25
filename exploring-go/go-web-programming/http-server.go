package main

import (
	"log"
	"net/http"
	"os"
)

func init() {
	log.SetOutput(os.Stdout)
}

func main() {
	var server = http.Server{Addr: ""}
	http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		writer.Header().Set("Location", "https://hungcq.github.io")
		writer.WriteHeader(302)
		writer.Write([]byte("fuck"))
	})
	//err := server.ListenAndServeTLS("cert.pem", "key.pem")
	err := server.ListenAndServe()
	if err != nil {
		log.Fatalln("error", err)
		return
	}
	log.Println("vczvcxzv")
}
