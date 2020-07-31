package api

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"time"
)

func handleLogging(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		inner.ServeHTTP(w, r)
		log.Printf(
			"%s\t%s\t%s\t%fs",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start).Seconds(),
		)
	})
}

func noCache(h http.Handler) http.Handler {
	fn := func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/static/" || r.URL.Path == "/static/index.html" || r.URL.Path == "/static/login.html" {
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate")
		}
		h.ServeHTTP(w, r)
	}
	return http.HandlerFunc(fn)
}

func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	router.
		Methods("GET", "POST", "PATCH", "DELETE").
		PathPrefix("/taskit").
		Name("taskit").
		Handler(handleLogging(http.HandlerFunc(taskItHandler), "taskit"))

	s := noCache(http.StripPrefix("/static/", http.FileServer(http.Dir("./static/"))))
	router.PathPrefix("/static/").Handler(s)

	root := noCache(http.StripPrefix("/", http.FileServer(http.Dir("./static/"))))
	router.PathPrefix("/").Handler(root)

	return router
}
