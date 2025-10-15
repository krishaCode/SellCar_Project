package com.example.Sell_Car.dto;

import lombok.Data;

@Data
public class SignupRequest {
    private String email;
    private  String password;
    private String name;
}
