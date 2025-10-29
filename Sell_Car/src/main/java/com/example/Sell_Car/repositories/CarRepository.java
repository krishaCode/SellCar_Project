package com.example.Sell_Car.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Sell_Car.entities.Car;;
import org.springframework.stereotype.Repository;

@Repository
public interface CarRepository extends JpaRepository<Car,Integer> {
}
