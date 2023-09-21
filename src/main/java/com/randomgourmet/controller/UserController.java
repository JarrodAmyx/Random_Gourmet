package com.randomgourmet.controller;

import com.randomgourmet.model.User;
import com.randomgourmet.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
import com.randomgourmet.dto.UserRegistrationRequest;
import com.randomgourmet.service.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
/* 
    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
     */
     
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