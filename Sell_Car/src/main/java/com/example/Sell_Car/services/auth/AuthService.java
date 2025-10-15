package com.example.Sell_Car.services.auth;

import com.example.Sell_Car.dto.SignupRequest;
import com.example.Sell_Car.dto.UserDTO;

public interface AuthService {
    UserDTO signup(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);
}
