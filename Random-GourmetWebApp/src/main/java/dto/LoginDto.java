package dto;

import lombok.Data;


//DTO login/signup is for transfering data or payload between client and server and vice-versa.
@Data
public class LoginDto {
    private String usernameOrEmail;
    private String password;
}