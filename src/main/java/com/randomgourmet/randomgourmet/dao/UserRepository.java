// UserRepository.java - MongoDB Repository
package randomgourmet.randomgourmet.repository;

import randomgourmet.randomgourmet.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be defined here
}