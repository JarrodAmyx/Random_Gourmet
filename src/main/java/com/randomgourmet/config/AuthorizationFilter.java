package com.randomgourmet.config;

import com.randomgourmet.model.User;
import com.randomgourmet.repository.UserRepository;
import com.randomgourmet.security.CustomUserDetails;
import com.randomgourmet.security.SecurityConstants;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import io.jsonwebtoken.Jwts;

public class AuthorizationFilter extends BasicAuthenticationFilter {
    private final UserRepository userRepository;
    private final SecurityConstants securityConstants;

    @Autowired
    public AuthorizationFilter(AuthenticationManager authManager,
                               UserRepository userRepository,
                               SecurityConstants securityConstants) {
        super(authManager);
        this.userRepository = userRepository;
        this.securityConstants = securityConstants;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest req,
                                    HttpServletResponse res,
                                    FilterChain chain) throws IOException, ServletException {
        String header = req.getHeader(SecurityConstants.HEADER_STRING);
        if (header == null || !header.startsWith(SecurityConstants.TOKEN_PREFIX)) {
            chain.doFilter(req, res);
            return;
        }
        UsernamePasswordAuthenticationToken authentication = getAuthentication(req);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        chain.doFilter(req, res);
    }

    private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(SecurityConstants.HEADER_STRING);
        if (token != null) {
            token = token.replace(SecurityConstants.TOKEN_PREFIX, "");
            String user = Jwts.parserBuilder()
                    .setSigningKey(securityConstants.getTokenSecret().getBytes()) // Use the correct constant
                    .build().parseClaimsJws(token)
                    .getBody()
                    .getSubject();
            if (user != null) {
                Optional<User> userEntityOptional = userRepository.findByEmail(user);
                if (userEntityOptional.isPresent()) {
                    User userEntity = userEntityOptional.get();
                    CustomUserDetails userDetails = new CustomUserDetails(userEntity.getUsername(), userEntity.getPassword(), Collections.emptyList()); // You can adapt authorities as needed
                    return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                }
            }
        }
        return null;
    }    
}
