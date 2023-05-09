package models;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpSession;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;





public class User {
    private String id;
    private String email;
    private String username;
    private String password;
    private ArrayList<String> ingredients;
    private ArrayList<String> favorites;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private UserRepository userRepository;

    private HttpSession session;

    public User(String id, String email, String username, String hashedPassword, ArrayList<String> ingredients, ArrayList<String> favorites) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.password = hashedPassword;
        this.ingredients = ingredients;
        this.favorites = favorites;
    }

    public User(String email, String username, String hashedPassword, ArrayList<String> ingredients, ArrayList<String> favorites) {
        this.email = email;
        this.username = username;
        this.password = hashedPassword;
        this.ingredients = ingredients;
        this.favorites = favorites;
    }

    // getters and setters for id, email, username, password, ingredients, and favorites

    public User createUser(String email, String username, String password) {
        // Check if the email and username are already taken
        if (userRepository.findByEmail(email) != null || userRepository.findByUsername(username) != null) {
            throw new IllegalArgumentException("User with that email or username already exists");
        }

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

    public void setSession(HttpSession session) {
        this.session = session;
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

  public void updateEmail(String newEmail) {
    // Check if a user with the new email already exists
    User existingUser = userRepository.findByEmail(newEmail);
    if (existingUser != null) {
        throw new IllegalArgumentException("A user with that email already exists.");
    }

    // Update the email field and save the changes to the database
    this.email = newEmail;
    mongoTemplate.save(this);
}

public void updateUsername(String newUsername) {
    // Check if a user with the new username already exists
    User existingUser = userRepository.findByUsername(newUsername);
    if (existingUser != null) {
        throw new IllegalArgumentException("A user with that username already exists.");
    }

    // Update the username field and save the changes to the database
    this.username = newUsername;
    mongoTemplate.save(this);
}

public void updatePassword(String newPassword) {
    // Hash the new password and save the changes to the database
    this.password = hashPassword(newPassword);
    mongoTemplate.save(this);
}

public List<Document> getFavoriteItems() {
    List<Document> favoriteItems = new ArrayList<>();
    for (String itemId : favorites) {
        // Query the database for the item with the given ID
        Query query = new Query(Criteria.where("id").is(itemId));
        Document item = mongoTemplate.findOne(query, Document.class, "items");
        if (item != null) {
            favoriteItems.add(item);
        }
    }
    return favoriteItems;
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

public Optional<User> getRoles() {
    return null;
}

public String getName() {
    return null;
}

public void setName(String name) {
}

public void setUsername(String username2) {
}

public void setEmail(String email2) {
}

public void setRoles(Set<Role> singleton) {
}
}
