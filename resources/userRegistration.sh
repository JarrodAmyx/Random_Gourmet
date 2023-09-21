db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["username", "email", "password", "full_name", "skill_level", "gender", "profile_picture", "created_at", "updated_at"],
        properties: {
          _id: { bsonType: "objectId" },
          username: { bsonType: "string" },
          email: { bsonType: "string" },
          password: { bsonType: "string" },
          full_name: { bsonType: "string" },
          skill_level: { bsonType: "string" },
          gender: { bsonType: "string" },
          profile_picture: { bsonType: "string" },
          created_at: { bsonType: "date" },
          updated_at: { bsonType: "date" },
        },
      },
    },
  });