
// UserRepository.java - MongoDB Repository
package com.randomgourmet.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import com.randomgourmet.model.User;
import java.util.List;
import java.util.Optional;


@Repository
public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);

    Optional<User> findByEmail(String email);

    List<User> findByOrderByUsernameAsc();

    @Query("{ 'username' : ?0, 'email' : ?1 }")
    Optional<User> findByUsernameAndEmail(String username, String email);

    // Custom update query using @Query annotation
    @Query("{ '_id' : ?0 }")
    void updateUserPassword(String userId, String newPassword);
}