import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import java.util.List;

public class User {
  private String username;
  private String password;
  private List<String> ingredients;
  private List<String> favorites;

  public User(String username, String password) {
      this.username = username;
      this.password = password;
      this.ingredients = new ArrayList<>();
      this.favorites = new ArrayList<>();
  }

  // getters and setters for username, password, ingredients, and favorites
  @Autowired
  private MongoTemplate mongoTemplate;

  public User createUser(String username, String password) {
      // Create a new user object
      User user = new User(username, hashPassword(password));

      // Save the user object to the database
      mongoTemplate.save(user);

      return user;
  }

  public void setPassword(String password) {
    String hashedPassword = hashPassword(password);
    this.password = hashedPassword;
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