db.users.insertMany([
  {
    userId: "John",
    email: "user1@example.com",
    name: "John Doe",
    password: "password123"
  },
  {
    userId: "Jane",
    email: "user2@example.com",
    name: "Jane Smith",
    password: "securePass456"
  }
]);

//queries
db.users.find().pretty(); //grabs all

db.users.findOne({ email: "user1@example.com" });
