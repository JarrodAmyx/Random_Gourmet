package models;

import java.util.Optional;
import java.util.Set;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;
import java.util.ArrayList;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.models.User;

public class User {
    private String id;
    private String email;
    private String username;
    private String password;
    private ArrayList<String> ingredients;
    private ArrayList<String> favorites;

    public User(String id, String email, String username, String hashedPassword, ArrayList<String> ingredients, ArrayList<String> favorites) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = hashedPassword;
        this.ingredients = ingredients;
        this.favorites = favorites;
    }

  public Optional<User> getRoles() {
    return null;
  }

  // getters and setters for username, password, ingredients, and favorites
  @Autowired
  private MongoTemplate mongoTemplate;

  public User createUser(String email, String username, String password) {
    // Generate a unique ID for the user
    ObjectId id = new ObjectId();

    // Create a new user object with the specified fields
    User user = new User(id.toHexString(), email, username, hashPassword(password), new ArrayList<String>(), new ArrayList<String>());

    // Save the user object to the database
    mongoTemplate.save(user);

    return user;
}

  public void setPassword(String password) {
    String hashedPassword = hashPassword(password);
    this.password = hashedPassword;
  }

  public String getPassword() {
    return password;
}

public String getEmail() {
    return email;
}

public void setRoles(Set<Role> singleton) {
}

  private String hashPassword(String password) {
      String salt = BCrypt.gensalt(12);
      String hashedPassword = BCrypt.hashpw(password, salt);
      return hashedPassword;
  }

  public void addIngredient(String ingredient) {
    this.ingredients.add(ingredient);
  }

  public void removeIngredient(String ingredient) {
      this.ingredients.remove(ingredient);
  }

  public List<String> getIngredients() {
      return this.ingredients;
  }

  public void addFavorite(String itemId) {
      this.favorites.add(itemId);
  }

  public void removeFavorite(String itemId) {
      this.favorites.remove(itemId);
  }

  public List<String> getFavorites() {
      return this.favorites;
  }

  public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
    User findByUsername(String username);
  }

  public boolean login(String username, String password) {
    // Check if the user exists in the database
    User user = userRepository.findByUsername(username);
    if (user == null) {
        return false;
    }
  
    // Verify the password using a hashing algorithm such as bcrypt
    String hashedPassword = hashPassword(password);
    if (!hashedPassword.equals(user.getPassword())) {
        return false;
    }
  
    // Set the user as logged in
    session.setAttribute("user", user);
    return true;
  }
  
  public void logout() {
    session.invalidate();
  }
  
  public boolean verifyUser() {
    User user = (User) session.getAttribute("user");
    if (user == null) {
        return false;
    }
    return true;
  }
}
