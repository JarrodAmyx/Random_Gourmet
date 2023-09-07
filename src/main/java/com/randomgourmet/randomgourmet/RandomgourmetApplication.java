package com.randomgourmet.randomgourmet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RandomgourmetApplication {

	public static void main(String[] args) {
		SpringApplication.run(RandomgourmetApplication.class, args);
	}

}


// User.java - MongoDB Entity
package randomgourmet.randomgourmet.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String email;

    // Getters and setters
}



// UserService.java - Service
package randomgourmet.randomgourmet.service;

import randomgourmet.randomgourmet.model.User;
import randomgourmet.randomgourmet.repository.UserRepository;
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

// UserController.java - Controller
package randomgourmet.randomgourmet.controller;

import randomgourmet.randomgourmet.model.User;
import randomgourmet.randomgourmet.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }

    // Other controller methods for user management
}
