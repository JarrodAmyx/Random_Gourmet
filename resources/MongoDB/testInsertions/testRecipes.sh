db.recipes.insertMany([
    {
      "name": "Spaghetti Bolognese",
      "percentMatch": 0.85,
      "nutrition": {
        "fat": 15.5,
        "protein": 20.1,
        "calories": 350
      },
      "totalCookTime": 30,
      "requiredIngredients": [
        ObjectId("6536cfe2778dec66de81f151"), // ObjectID of "Ground Beef"
        ObjectId("6536d125778dec66de81f168"), // ObjectID of "Onion"
        ObjectId("insert_actual_ObjectID_of_Spaghetti") // ObjectID of "Spaghetti"
      ]
    },
    {
      "name": "Chicken Stir-Fry",
      "percentMatch": 0.92,
      "nutrition": {
        "fat": 7.2,
        "protein": 24.3,
        "calories": 250
      },
      "totalCookTime": 20,
      "requiredIngredients": [
        ObjectId("6536d125778dec66de81f164"), // ObjectID of "Broccoli"
        ObjectId("6536d125778dec66de81f163"), // ObjectID of "Carrot"
        ObjectId("6536d393778dec66de81f1e7") // ObjectID of "Soy Sauce"
      ]
    }
  ]);
  