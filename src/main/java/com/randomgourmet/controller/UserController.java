package com.randomgourmet.controller;

import com.randomgourmet.model.User;
// import com.randomgourmet.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
import com.randomgourmet.dto.UserRegistrationRequest;
// import com.randomgourmet.service.UserService;
import com.randomgourmet.repository.UserRepository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserController(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegistrationRequest registrationRequest) {
        try {
            // Validate registration request (e.g., check for duplicate usernames or emails)
            User user = new User(registrationRequest.getUsername(), registrationRequest.getEmail(), registrationRequest.getPassword());
            validateUser(user);

            // Encode the user's password before saving it to the database
            String encodedPassword = passwordEncoder.encode(user.getPassword());
            user.setPassword(encodedPassword);

            // Generate a unique ID for the user
            user.generateUniqueId();

            // Save the user to the database using the UserRepository
            userRepository.save(user);

            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
        }
    }

    private void validateUser(User user) {
        if (isUsernameTaken(user.getUsername())) {
          throw new IllegalArgumentException("Username is already taken.");
        }
        if (isEmailTaken(user.getEmail())) {
          throw new IllegalArgumentException("Email is already registered.");
        }
    }
      
    // Check if a username is already taken
    private boolean isUsernameTaken(String username) {
    Optional<User> existingUser = userRepository.findByUsername(username);
    return existingUser.isPresent();
    }
    
    // Check if an email is already registered
    private boolean isEmailTaken(String email) {
    Optional<User> existingUser = userRepository.findByEmail(email);
    return existingUser.isPresent();
    }

    // Other controller methods for user management
}