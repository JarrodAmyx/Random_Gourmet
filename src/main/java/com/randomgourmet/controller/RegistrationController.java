package com.randomgourmet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.randomgourmet.dto.UserRegistrationRequest;
import com.randomgourmet.service.UserService;

@RestController
@RequestMapping("/api")
public class RegistrationController {

    @Autowired
    private UserService userService; // You'll need to implement UserService

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        try {
            // Validate registrationRequest and perform user registration logic
            userService.registerUser(registrationRequest);
            
            // Return a success response with HTTP status 200 OK
            return ResponseEntity.ok("Registration successful");
        } catch (Exception e) {
            // Handle any errors that occur during registration
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }
}