// package com.randomgourmet.config;

// import com.randomgourmet.repository.UserRepository;

// import java.util.Arrays;

// import org.springframework.context.annotation.Bean;
// import org.springframework.http.HttpMethod;
// import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.config.http.SessionCreationPolicy;
// import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.web.cors.CorsConfiguration;
// import org.springframework.web.cors.CorsConfigurationSource;
// import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
// import com.randomgourmet.service.UserService;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.beans.factory.annotation.Qualifier;
// import org.springframework.security.authentication.AuthenticationManager;
// import org.springframework.security.web.SecurityFilterChain;
// import static org.springframework.security.config.Customizer.withDefaults;

// @Configuration
// @EnableWebSecurity
// @EnableMethodSecurity(prePostEnabled = true)
// public class WebSecurity {
//     private final UserService userDetailsService;
//     private final BCryptPasswordEncoder bCryptPasswordEncoder;
//     private final UserRepository userRepository;

//     @Autowired
//     public WebSecurity(@Qualifier("userService") UserService userDetailsService,
//                        BCryptPasswordEncoder bCryptPasswordEncoder,
//                        UserRepository userRepository) {
//         this.userDetailsService = userDetailsService;
//         this.bCryptPasswordEncoder = bCryptPasswordEncoder;
//         this.userRepository = userRepository;
//     }

//     @Bean
//     public SecurityFilterChain configure(HttpSecurity http) throws Exception {

//         // Configure AuthenticationManagerBuilder
//         AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
//         authenticationManagerBuilder.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder);

//         // Get AuthenticationManager
//         AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
//         http
//                 .cors(withDefaults())
//                 .csrf((csrf) -> csrf.disable())
//                 .authorizeHttpRequests((authz) -> authz
//                 .requestMatchers(HttpMethod.POST, SecurityConstants.SIGN_UP_URL).permitAll()
//                 .anyRequest().authenticated().and()
                
//                 // User Authentication with custom login URL path 
//                 .addFilter(getAuthenticationFilter(authenticationManager))

//                 // User Authorization with JWT 
//                 .addFilter(new AuthorizationFilter(authenticationManager, userRepository))
//                 .authenticationManager(authenticationManager)
//                 .sessionManagement((session) -> session
//                 .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
  
//         return http.build();
//     }

//     // Configure custom login URL path
//     protected AuthenticationFilter getAuthenticationFilter(AuthenticationManager authenticationManager) throws Exception {
//         final AuthenticationFilter filter = new AuthenticationFilter(authenticationManager);
//         filter.setFilterProcessesUrl("/users/login");
//         return filter;
//     }
//     @Bean
//     CorsConfigurationSource corsConfigurationSource() {
//         CorsConfiguration configuration = new CorsConfiguration();
//         configuration.setAllowedOrigins(Arrays.asList("*"));
//         configuration.setAllowedMethods(Arrays.asList("POST", "PUT", "GET", "OPTIONS", "DELETE", "PATCH")); // or simply "*"
//         configuration.setAllowedHeaders(Arrays.asList("*"));
//         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//         source.registerCorsConfiguration("/**", configuration);
//         return source;
//     }
// }