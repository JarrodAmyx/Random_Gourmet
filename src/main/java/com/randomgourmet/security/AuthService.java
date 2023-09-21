package com.randomgourmet.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import javax.crypto.SecretKey;
import org.springframework.stereotype.Service;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.util.Collections;
import java.util.Optional;
import com.randomgourmet.repository.UserRepository;
import com.randomgourmet.model.User;

@Service
public class AuthService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Autowired
    private UserRepository userRepository; // Inject UserRepository

    public String authenticateAndGenerateToken(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (new BCryptPasswordEncoder().matches(password, user.getPassword())) {
                // User is authenticated; generate a token
                UserDetails userDetails = new CustomUserDetails(username, user.getPassword(), Collections.emptyList());
                String token = generateToken(userDetails);
                return token;
            }
        }

        // User authentication failed
        throw new UsernameNotFoundException("User not found or invalid credentials");
    }

    private String generateToken(UserDetails userDetails) {
        // Generate a new secret key using HMAC SHA-256
        byte[] keyBytes = secretKey.getBytes();
        SecretKey secretKey = Keys.hmacShaKeyFor(keyBytes);

        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .signWith(secretKey, SignatureAlgorithm.HS256)
                .compact();
    }
}
