package controllers;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


@Controller
public class LoginController {
    
    @GetMapping("/login")
    public String showLoginPage() {
        return "login";
    }

    @PostMapping("/login")
    public String processLoginForm() {
        return "redirect:/home";
    }

    @GetMapping("/home")
    public String showHomePage() {
        return "home";
    }
}
