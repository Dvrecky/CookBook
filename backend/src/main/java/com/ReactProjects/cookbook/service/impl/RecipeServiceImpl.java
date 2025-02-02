package com.ReactProjects.cookbook.service.impl;

import com.ReactProjects.cookbook.entity.Recipe;
import com.ReactProjects.cookbook.repository.RecipeRepository;
import com.ReactProjects.cookbook.service.RecipeService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }


    public Optional<Recipe> getRecipe(Long id) {
        return recipeRepository.findById(id);
    }
}
