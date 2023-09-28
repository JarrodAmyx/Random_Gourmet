package com.randomgourmet.model;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class API {
    private static final String API_URL = "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients";
    private static final String API_KEY = "2685366d4cmshbf587d1a8086269p165433jsn9e400cd19841";
    private static final String API_HOST = "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com";

    public String recipesByIngredients(String[] ingredients, int numberOfRecipes) throws IOException, InterruptedException {
        String ingredientsStr = String.join(",", ingredients);

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(API_URL + "?ingredients=" + ingredientsStr + "&number=" + numberOfRecipes + "&ignorePantry=true&ranking=1"))
                .header("X-RapidAPI-Key", API_KEY)
                .header("X-RapidAPI-Host", API_HOST)
                .GET()
                .build();

        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String recipeInfo( int id )  throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/information"))
        .header("X-RapidAPI-Key", API_KEY)
        .header("X-RapidAPI-Host", API_HOST)
        .method("GET", HttpRequest.BodyPublishers.noBody())
        .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }

    public String similarRecipe( int id )  throws IOException, InterruptedException {
        HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create("https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/" + id + "/similar"))
        .header("X-RapidAPI-Key", API_KEY)
        .header("X-RapidAPI-Host", API_HOST)
        .method("GET", HttpRequest.BodyPublishers.noBody())
        .build();
        HttpResponse<String> response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString());
        return response.body();
    }
}