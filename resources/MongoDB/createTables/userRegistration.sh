db.users.drop(); // Drop the collection if it already exists

db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "email", "name", "password"],
      properties: {
        userId: { bsonType: "string" },
        email: { bsonType: "string" },
        name: { bsonType: "string" },
        password: { bsonType: "string" },
      },
    },
  },
});
