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

import com.randomgourmet.dto.UserRegistrationRequest;

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
