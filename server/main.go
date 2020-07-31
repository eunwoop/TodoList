package main

import (
	"flag"
	"log"

	"github.com/valyala/fasthttp"
	"github.com/valyala/fasthttp/fasthttpadaptor"

	api "github.com/eunwoop/TodoList/server/api"
	config "github.com/eunwoop/TodoList/server/config"
)

var (
	configPath = "server/server-config.json"
)

func main() {
	log.SetFlags(log.Llongfile)
	flag.StringVar(&configPath, "config", configPath, "config json file")
	flag.Parse()

	err := config.Load(configPath)
	if err != nil {
		log.Fatalln(err)
	}

	log.Printf("server start. config: %s", config.Get())
	r := api.NewRouter()
	s := &fasthttp.Server{
		Handler:            fasthttpadaptor.NewFastHTTPHandler(r),
		MaxRequestBodySize: 300 * 1024 * 1024,
	}

	err = s.ListenAndServe(config.Get().Listen)
	if err != nil {
		log.Fatalln("listen and serve error: ", err)
	}
}