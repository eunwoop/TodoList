package config

import "encoding/json"
import "io/ioutil"

type Config struct {
	Listen string `json:"listen"`
	BackendServerUrl string `json:"backend-server-url"`
}

var _config *Config = nil

func Load(path string) error {
	file, _ := ioutil.ReadFile(path)
	var c Config
	err := json.Unmarshal(file, &c)
	if err != nil {
		return err
	}

	_config = &c
	return nil
}

func Get() *Config {
	return _config
}
