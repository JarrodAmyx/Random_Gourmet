db.ingredients.drop(); // Drop the collection if it already exists

db.createCollection("ingredients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["ingredientId", "name", "quantity", "unit", "category"],
      properties: {
        "ingredientId": {
          bsonType: "string",
          description: "The ID of the ingredient."
        },
        "name": {
          bsonType: "string",
          description: "The name of the ingredient."
        },
        "quantity": {
          bsonType: "number",
          description: "The quantity of the ingredient."
        },
        "unit": {
          bsonType: "string",
          description: "The unit of measurement for the ingredient."
        },
        "category": {
          bsonType: "string",
          description: "The category of the ingredient",
          enum: ["Meats", "Seafood", "Vegetables", "Fruits", "Berries", "Baking", "Grains and Cereals", "Juices", "Condiments", "Herbs and Spices"]
        }
      }
    }
  }
});


// Sample user_id update, replace "your_user_id_here" with the actual user ID
db.ingredients.updateMany({}, { $set: { user_id: ObjectId("your_user_id_here") } });
