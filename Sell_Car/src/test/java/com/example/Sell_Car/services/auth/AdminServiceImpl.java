package com.example.Sell_Car.services.auth;


import com.example.Sell_Car.entities.User;
import com.example.Sell_Car.enums.UserRole;
import com.example.Sell_Car.repositories.UserRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements  AuthService {
    private final UserRepository userRepository;

    @PostConstruct
    public void createAdminAccount() {
        Optional<User> optionAdmin = userRepository.findByUserRole(UserRole.ADMIN);
        if (optionAdmin.isEmpty()) {
            User admin = new User();
            admin.setName("Admin");
            admin.setEmail("admin@test.com");
            admin.setUserRole(UserRole.ADMIN);
            admin.setPassword(new BCryptPasswordEncoder().encode("admin"));
            userRepository.save(admin);
            System.out.println("Admin account create successfully");// In a real application, ensure to hash the password
        }
        else  {
            System.out.println("Admin account already exists");
        }
    }

    @Override
    public Boolean hasUserWithEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
}
