package com.randomgourmet.service;

import com.randomgourmet.dto.UserRegistrationRequest;
import com.randomgourmet.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {
    void registerUser(UserRegistrationRequest registrationRequest);
    Optional<User> getUserById(String userId);
    Optional<User> getUserByUsername(String username);
    Optional<User> getUserByEmail(String email);
    List<User> getAllUsers();
    void updateUser(User user);
    void changePassword(User user, String newPassword);
    void deleteUser(String userId);
}