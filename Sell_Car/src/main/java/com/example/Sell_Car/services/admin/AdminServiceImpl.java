package com.example.Sell_Car.services.admin;

import com.example.Sell_Car.dto.CarDto;
import com.example.Sell_Car.entities.Car;
import com.example.Sell_Car.repositories.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
    private final CarRepository carRepository;

    @Override
    public boolean postcsr(CarDto carDto) throws IOException {
        try {
            Car car = new Car();
            car.setName(carDto.getName());
            car.setBrand(carDto.getBrand());
            car.setColor(carDto.getColor());
            car.setPrice(carDto.getPrice());
            car.setYear(carDto.getYear());
            car.setDescription(carDto.getDescription());
            car.setTransmission(carDto.getTransmission());
            car.setImage(carDto.getImage().getBytes());
            carRepository.save(car);
            return true;
        }catch (Exception e) {
            return false;
        }

    }
}
