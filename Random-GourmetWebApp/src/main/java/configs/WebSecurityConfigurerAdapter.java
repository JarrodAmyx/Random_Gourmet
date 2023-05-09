package configs;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;

@Configuration
@EnableWebSecurity
public class WebSecurityConfigurerAdapter {

    // Configure the security filter chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests((requests) -> requests
                .requestMatchers("/", "/home").permitAll() // Allow access to home page without authentication
                .anyRequest().authenticated() // Require authentication for any other request
            )
            .formLogin((form) -> form
                .loginPage("/login") // Specify the custom login page URL
                .permitAll() // Allow access to the login page without authentication
            )
            .logout((logout) -> logout.permitAll()); // Enable logout functionality

        return http.build();
    }

    // Configure the user details service
    @Bean
    public UserDetailsService userDetailsService() {
        UserDetails user =
             User.builder()
                .username("user") // Set the username
                .password(passwordEncoder().encode("password")) // Set the password and encode it
                .roles("USER") // Assign roles to the user
                .build();

        return new InMemoryUserDetailsManager(user); // In-memory implementation of UserDetailsService
    }
    
    // Configure the password encoder
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use the BCrypt password encoder
    }
    
    // Configure the authentication provider
    @Bean
    public DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, BCryptPasswordEncoder passwordEncoder) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService); // Set the user details service
        authProvider.setPasswordEncoder(passwordEncoder); // Set the password encoder

        return authProvider;
    }
    
    // Configure the authentication manager
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider(userDetailsService(), passwordEncoder())); // Set the authentication provider
        return auth.build();
    }

    
}
