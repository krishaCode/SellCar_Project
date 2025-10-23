package com.example.Sell_Car.controllers;

import com.example.Sell_Car.dto.AuthonticationRequest;
import com.example.Sell_Car.dto.AuthonticationResponse;
import com.example.Sell_Car.dto.SignupRequest;
import com.example.Sell_Car.dto.UserDTO;
import com.example.Sell_Car.entities.User;
import com.example.Sell_Car.repositories.UserRepository;
import com.example.Sell_Car.services.auth.AuthService;
import com.example.Sell_Car.services.jwt.UserService;
import com.example.Sell_Car.utils.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    private final JWTUtil jwtUtil;
    private final UserService userService;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupRequest signupRequest) {
        if (authService.hasUserWithEmail(signupRequest.getEmail())) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).body("User already exists");
        }
        UserDTO userDTO = authService.signup(signupRequest);
        if (userDTO == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(userDTO);
    }

    @PostMapping("/login")
    public AuthonticationResponse login(@RequestBody AuthonticationRequest authonticationRequest){
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authonticationRequest.getEmail(),
                            authonticationRequest.getPassword()));
        }
        catch (BadCredentialsException e) {
            throw new RuntimeException("Incorrect email or password");
        }
        final UserDetails userDetails = userService.getUserDetailsService().loadUserByUsername(authonticationRequest.getEmail());
        Optional<User> optionalUser = userRepository.findByEmail(authonticationRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);
        AuthonticationResponse response = new AuthonticationResponse();
        if (optionalUser.isPresent()) {
            response.setJwt(jwt);
            response.setUserRole(optionalUser.get().getUserRole().name());
            response.setUserID(optionalUser.get().getId());
        }
        return response;
    }
}
