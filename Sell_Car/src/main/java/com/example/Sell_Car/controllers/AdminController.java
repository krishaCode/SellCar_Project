package com.example.Sell_Car.controllers;

import com.example.Sell_Car.dto.CarDto;
import com.example.Sell_Car.services.admin.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final AdminService adminService;

    @PostMapping
    public ResponseEntity<?> postCar(@ModelAttribute CarDto carDto) throws IOException {
        boolean success = adminService.postcsr(carDto);
        if (success) {
            return ResponseEntity.status(HttpStatus.CREATED).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to post car");
        }
    }
}
