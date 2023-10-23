db.createCollection("recipes", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "percentMatch", "nutrition", "totalCookTime", "requiredIngredients"],
      properties: {
        name: { bsonType: "string" },
        percentMatch: { bsonType: "double" },
        nutrition: {
          bsonType: "object",
          required: ["fat", "protein", "calories"],
          properties: {
            fat: { bsonType: "double" },
            protein: { bsonType: "double" },
            calories: { bsonType: "double" },
          },
        },
        totalCookTime: { bsonType: "int" }, // Represents time in minutes
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
