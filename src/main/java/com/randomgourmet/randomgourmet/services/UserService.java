package com.randomgourmet.randomgourmet.services;

import com.randomgourmet.randomgourmet.models.User;
import com.randomgourmet.randomgourmet.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    // Other service methods for user management

}