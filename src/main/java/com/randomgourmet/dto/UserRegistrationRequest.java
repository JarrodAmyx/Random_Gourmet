package com.randomgourmet.dto;

public class UserRegistrationRequest {

    private String username;
    private String email;
    private String password;

    // Constructors, getters, and setters

    public UserRegistrationRequest() {
        // Default constructor
    }

    public UserRegistrationRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }

    // Getters and setters for username, email, and password

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}