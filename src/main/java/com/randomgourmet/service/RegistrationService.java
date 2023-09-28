package com.randomgourmet.service;

import com.randomgourmet.dto.UserRegistrationRequest;

public interface RegistrationService {
    void registerUser(UserRegistrationRequest registrationRequest);
}