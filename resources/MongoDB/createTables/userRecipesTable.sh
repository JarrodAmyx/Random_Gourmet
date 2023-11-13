db.userRecipes.drop();
db.createCollection("userRecipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "recipeId"],
      properties: {
        userId: { bsonType: "string" },
        recipeId: { bsonType: "string" }
      },
    },
  },
});
