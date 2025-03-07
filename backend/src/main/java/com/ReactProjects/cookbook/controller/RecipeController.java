package com.ReactProjects.cookbook.controller;

import com.ReactProjects.cookbook.dto.RecipeRequestDto;
import com.ReactProjects.cookbook.entity.Recipe;
import com.ReactProjects.cookbook.service.RecipeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/recipes")
public class RecipeController {

    private final RecipeService recipeService;

    public RecipeController(RecipeService recipeService) {
        this.recipeService = recipeService;
    }

    @GetMapping
    public ResponseEntity<List<Recipe>> getRecipes() {
        List<Recipe> recipes = recipeService.getRecipes();

        return ResponseEntity.ok(recipes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Recipe> getRecipeById(@PathVariable Long id) {
        Optional<Recipe> recipe = recipeService.getRecipe(id);

        return recipe.isPresent() ? ResponseEntity.ok(recipe.get()) : ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<Recipe> addRecipe(@RequestBody RecipeRequestDto recipeDto) {
        Recipe savedRecipe = recipeService.addRecipe(recipeDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecipe);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecipe(@PathVariable long id) {
        recipeService.deleteRecipe(id);

        return ResponseEntity.ok("Recipe with id: " + id + " has been deleted successfully");
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateRecipe(@PathVariable long id, @RequestBody RecipeRequestDto recipeDto) {
        recipeService.updateRecipe(id, recipeDto);

        return ResponseEntity.ok("Recipe: " + id + " changed successfully");
    }
}
