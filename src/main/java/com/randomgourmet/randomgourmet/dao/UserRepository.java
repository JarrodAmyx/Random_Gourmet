// UserRepository.java - MongoDB Repository
package com.randomgourmet.randomgourmet.dao;

import com.randomgourmet.randomgourmet.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // Custom query methods can be defined here
}