package com.randomgourmet.controller;

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