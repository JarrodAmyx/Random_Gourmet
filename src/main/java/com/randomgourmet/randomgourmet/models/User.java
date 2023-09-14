// User.java - MongoDB Entity
package com.randomgourmet.randomgourmet.models;

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