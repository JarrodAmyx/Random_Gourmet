package com.randomgourmet.randomgourmet.services;

import com.randomgourmet.randomgourmet.models.User;
import com.randomgourmet.randomgourmet.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
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

    // Implement other methods as needed for user management, authentication, and authorization.

    // ...

}
