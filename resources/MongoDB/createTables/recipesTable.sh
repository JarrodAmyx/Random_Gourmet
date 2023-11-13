db.recipes.drop(); // Drop the collection if it already exists
db.createCollection("recipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["recipeId", "userId", "title", "description", "requiredIngredients"],
      properties: {
        recipeId: { bsonType: "string" },
        userId: { bsonType: "string" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        requiredIngredients: {
          bsonType: "array",
          items: {
            bsonType: "string" // References to ingredients in the "ingredients" table
          },
        },
      },
    },
  },
});
