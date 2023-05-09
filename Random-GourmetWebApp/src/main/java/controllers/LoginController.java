package controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class LoginController {
    
    // Handler method to display the login page
    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    // Handler method to process the login form submission
    @PostMapping("/login")
    public String processLoginForm() {
        // Redirect to the home page after successful login
        return "redirect:/home";
    }

    // Handler method to display the home page
    @GetMapping("/home")
    public String showHomePage() {
        return "home";
    }
}
