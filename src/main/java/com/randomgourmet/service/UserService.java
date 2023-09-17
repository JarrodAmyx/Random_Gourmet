package com.randomgourmet.service;

import com.randomgourmet.model.User;
import com.randomgourmet.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User createUser(User user) {
        // Implement user creation logic here (e.g., validation, hashing passwords).
        validateUser(user); // Example validation method
        user.setPassword(hashPassword(user.getPassword())); // Hash the password
        return userRepository.save(user);
    }

    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    public Optional<User> getUserByUsername(String username) {
        // Implement logic to find a user by username.
        return userRepository.findByUsername(username);
    }

    public Optional<User> getUserByEmail(String email) {
        // Implement logic to find a user by email.
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void updateUser(User user) {
        // Implement logic to update user information.
        userRepository.save(user);
    }

    public void changePassword(User user, String newPassword) {
        // Implement logic to change a user's password.
        user.setPassword(hashPassword(newPassword)); // Hash the new password
        userRepository.save(user);
    }

    public void deleteUser(String userId) {
        // Implement logic to delete a user by their ID.
        userRepository.deleteById(userId);
    }

    // Validate user data before creation
    private void validateUser(User user) {
        // Implement validation logic (e.g., check for unique username and email).
        // Throw exceptions or handle validation errors as needed.
    }

    // Hash user password using BCrypt
    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    public boolean isPasswordComplex(String password) {
        // Implement password complexity validation logic here.
        // Example: Check if the password has at least 8 characters and contains a mix of letters, digits, and special characters.
        return password.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{8,}$");
    }

    public void lockUserAccount(String userId) {
        // Implement logic to lock a user's account temporarily after multiple failed login attempts.
        // You can update the user's account status or set a flag in the user's profile.
    }

    public void unlockUserAccount(String userId) {
        // Implement logic to unlock a user's previously locked account.
        // Remove any locks or flags that were set during account locking.
    }

    // public boolean authenticateUser(String username, String password) {
    //     // Implement logic to authenticate a user based on their username and password.
    //     // Example: Use Spring Security's authentication manager.
    //     try {
    //         Authentication authentication = authenticationManager.authenticate(
    //             new UsernamePasswordAuthenticationToken(username, password)
    //         );
    //         SecurityContextHolder.getContext().setAuthentication(authentication);
    //         return true;
    //     } catch (AuthenticationException e) {
    //         return false;
    //     }
    // }

    public void registerUser(User user) {
        // Implement logic to register a new user, including validation and account creation.
        // Example: Save the user in the database after validation.
        validateUser(user);
        user.setPassword(hashPassword(user.getPassword()));
        userRepository.save(user);
    }

    public void logoutUser(String userId) {
        // Implement logic to log out a user by invalidating their session or access token.
        // Example: Use Spring Security's logout functionality.
        SecurityContextHolder.clearContext();
    }

    public void deleteUserProfile(String userId) {
        // Implement logic to allow users to delete their profiles, including associated data.
        // Example: Delete the user's data from the database.
        userRepository.deleteById(userId);
    }

    // Additional utility methods and error handling should be included.

    // ...
    // Implement other methods as needed for user management, authentication, and authorization.

    // ...
}
