db.userIngredients.drop();
db.createCollection("userIngredients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["userId", "ingredientId"],  // Corrected the field names
      properties: {
        userId: { bsonType: "string" },
        ingredientId: { bsonType: "string" }
      },
    },
  },
});
