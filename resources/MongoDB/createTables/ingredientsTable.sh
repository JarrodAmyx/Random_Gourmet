db.createCollection("ingredients", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["name", "quantity", "unit", "category"],
      properties: {
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

//added user id to not share ingredients across users
db.ingredients.updateMany({}, { $set: { user_id: ObjectId("your_user_id_here") } });
