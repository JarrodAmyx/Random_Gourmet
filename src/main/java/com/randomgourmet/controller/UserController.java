package com.randomgourmet.controller;

import com.randomgourmet.dto.UserRegistrationRequest;
import com.randomgourmet.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        try {
            userService.registerUser(registrationRequest);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    // Other controller methods for user management
}