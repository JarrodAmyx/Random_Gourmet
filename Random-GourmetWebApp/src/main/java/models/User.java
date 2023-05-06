package models;

import java.util.Optional;
import java.util.Set;

public class User {

    private long id;
    private String name;
    private String username;
    private String email;
    private String password;
    public Optional<User> getRoles() {
        return null;
    }
    public String getName() {
        return null;
    }
    public String getEmail() {
        return null;
    }
    public String getPassword() {
        return null;
    }
    public void setRoles(Set<Role> singleton) {
    }
    public void setName(String name2) {
    }
    public void setEmail(String email2) {
    }
    public void setPassword(String encode) {
    }
    public void setUsername(String username2) {
    }

}