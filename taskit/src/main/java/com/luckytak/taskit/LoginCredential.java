package com.luckytak.taskit;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
@NoArgsConstructor

public class LoginCredential {
    @JsonProperty(value = "user")
    private String user;

    @JsonProperty(value = "pwd")
    private String password;
}