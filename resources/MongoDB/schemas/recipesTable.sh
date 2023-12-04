db.recipes.drop(); // Drop the collection if it already exists

db.createCollection("recipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["recipeId", "title", "description", "requiredIngredients", "recipeImage"], // Added "recipeImage" to the required fields
      properties: {
        recipeId: { bsonType: "string" },
        title: { bsonType: "string" },
        description: { bsonType: "string" },
        requiredIngredients: {
          bsonType: "array",
          items: {
            bsonType: "string" // References to ingredients in the "ingredients" table
          },
        },
        recipeImage: {
          bsonType: "string" // Assuming a string data type for storing image URLs or references
          // You might consider using a different data type or a different approach based on your image storage method
        }
      },
    },
  },
});
