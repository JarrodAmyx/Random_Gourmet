package com.randomgourmet.controller;

import com.randomgourmet.model.User;
import com.randomgourmet.service.UserService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Other controller methods for user management
}