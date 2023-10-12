package com.randomgourmet.config;

// import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebMvc
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
      registry.addMapping("/api/**") // Specify the endpoint(s) to allow CORS for
              .allowedOrigins("http://localhost:4200") // Allow requests from this origin
              .allowedMethods("GET", "POST", "PUT", "DELETE")
              .allowCredentials(true);
  }
}
