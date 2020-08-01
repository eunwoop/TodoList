package api

import (
	"net/http"
	"net/http/httputil"
	"net/url"
	"strings"

	config "github.com/eunwoop/TodoList/server/config"
)

func taskItHandler(w http.ResponseWriter, r *http.Request) {
	if strings.HasPrefix(r.URL.Path, "/taskit") {
		r.URL.Path = r.URL.Path[len("/taskit"):]
	}
	remote, _ := url.Parse(config.Get().BackendServerUrl)
	proxy := httputil.NewSingleHostReverseProxy(remote)
	proxy.ServeHTTP(w, r)
}
