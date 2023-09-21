package com.randomgourmet.security;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class UserPrincipal implements UserDetails {
    private Long id;
    private String username;
    private String password;
    private Collection<? extends GrantedAuthority> authorities;
    private boolean isEnabled = true; // You can set this according to your application's logic
    private boolean isAccountNonExpired = true; // You can set this according to your application's logic
    private boolean isAccountNonLocked = true; // You can set this according to your application's logic
    private boolean isCredentialsNonExpired = true; // You can set this according to your application's logic

    // Constructors, getters, and setters

    // Constructor to map a CustomUserDetails to UserPrincipal
    public UserPrincipal(CustomUserDetails customUserDetails) {
        this.username = customUserDetails.getUsername();
        this.password = customUserDetails.getPassword();
        this.authorities = customUserDetails.getAuthorities();
        this.isEnabled = customUserDetails.isEnabled();
        this.isAccountNonExpired = customUserDetails.isAccountNonExpired();
        this.isAccountNonLocked = customUserDetails.isAccountNonLocked();
        this.isCredentialsNonExpired = customUserDetails.isCredentialsNonExpired();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return isCredentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
