package com.randomgourmet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.randomgourmet.dto.UserRegistrationRequest;
import com.randomgourmet.model.User;
import com.randomgourmet.repository.UserRepository;
import java.util.Optional;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void registerUser(UserRegistrationRequest registrationRequest) {
        // Validate registration request (e.g., check for duplicate usernames or emails)
        
        // Create a new user entity and populate its fields
        User newUser = new User();
        newUser.setUsername(registrationRequest.getUsername());
        newUser.setEmail(registrationRequest.getEmail());

        // Encode the user's password before saving it to the database
        String encodedPassword = passwordEncoder.encode(registrationRequest.getPassword());
        newUser.setPassword(encodedPassword);

        // Save the user to the database using the UserRepository
        userRepository.save(newUser);
    }

    @Override
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Optional<User> getUserByUsername(String username) {
        // Implement logic to find a user by username.
        return userRepository.findByUsername(username);
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        // Implement logic to find a user by email.
        return userRepository.findByEmail(email);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void updateUser(User user) {
        // Implement logic to update user information.
        userRepository.save(user);
    }

    @Override
    public void changePassword(User user, String newPassword) {
        // Implement logic to change a user's password.
        user.setPassword(hashPassword(newPassword)); // Hash the new password
        userRepository.save(user);
    }

    @Override
    public void deleteUser(String userId) {
        // Implement logic to delete a user by their ID.
        userRepository.deleteById(userId);
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

    // Validate user data before creation
    private void validateUser(User user) {
      if (isUsernameTaken(user.getUsername())) {
        throw new IllegalArgumentException("Username is already taken.");
        }
        if (isEmailTaken(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }
    }

    // Hash user password using BCrypt
    private String hashPassword(String password) {
        return passwordEncoder.encode(password);
    }

    // Implement other methods as needed for user management, authentication, and authorization.
}
