package com.randomgourmet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user (e.g., check credentials against a database)
        Authentication authentication = authService.authenticate(loginRequest.getUsername(), loginRequest.getPassword());

        // Generate a JWT token if authentication is successful
        String token = authService.generateToken(authentication);

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }
}