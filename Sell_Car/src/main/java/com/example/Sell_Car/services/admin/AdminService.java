package com.example.Sell_Car.services.admin;

import com.example.Sell_Car.dto.CarDto;

import java.io.IOException;

public interface AdminService {
    boolean postcsr(CarDto carDto) throws IOException;
}
