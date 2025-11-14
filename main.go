package main

import (
	"log"
	"net/http"
)

func main() {
	fs := http.FileServer(http.Dir("."))
	http.Handle("/", fs)

	log.Println("Server running at http://localhost:1000/")
	err := http.ListenAndServe(":1000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
