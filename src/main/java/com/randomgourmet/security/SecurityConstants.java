package com.randomgourmet.security;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SecurityConstants {
    @Value("${jwt.secretKey}")
    private String secretKey;

    public static final long EXPIRATION_TIME = 864_000_000; // 10 days in milliseconds
    public static final String TOKEN_PREFIX = "Bearer ";
    public static final String HEADER_STRING = "Authorization";

    // Define the method to get the JWT secret key
    public String getTokenSecret() {
        return secretKey;
    }
}