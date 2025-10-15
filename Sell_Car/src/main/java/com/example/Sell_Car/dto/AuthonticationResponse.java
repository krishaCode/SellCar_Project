package com.example.Sell_Car.dto;

import lombok.Data;

@Data
public class AuthonticationResponse {
    private String jwt;
    private Long userID;
    private String userRole;

    public void setJwt(String jwt) {
        this.jwt = jwt;
    }

    public void setUserID(Long userID) {
        this.userID = userID;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
}
