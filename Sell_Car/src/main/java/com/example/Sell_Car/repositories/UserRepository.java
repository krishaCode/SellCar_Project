package com.example.Sell_Car.repositories;

import com.example.Sell_Car.entities.User;
import com.example.Sell_Car.enums.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface UserRepository extends JpaRepository<User,Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUserRole(UserRole userRole);
}
