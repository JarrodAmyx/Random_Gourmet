package com.randomgourmet.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// import com.randomgourmet.security.LoginRequest;
// import com.randomgourmet.security.JwtAuthenticationResponse;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // Authenticate the user and generate a JWT token in one step
        String token = authService.authenticateAndGenerateToken(loginRequest.getUsername(), loginRequest.getPassword());

        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }
}
