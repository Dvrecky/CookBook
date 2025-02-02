package com.ReactProjects.cookbook.service;

import com.ReactProjects.cookbook.entity.Recipe;

import java.util.List;
import java.util.Optional;

public interface RecipeService {
    List<Recipe> getRecipes();
    Optional<Recipe> getRecipe(Long id);
}
