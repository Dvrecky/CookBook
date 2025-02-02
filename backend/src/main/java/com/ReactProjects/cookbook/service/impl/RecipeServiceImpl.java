package com.ReactProjects.cookbook.service.impl;

import com.ReactProjects.cookbook.dto.RecipeRequestDto;
import com.ReactProjects.cookbook.entity.Category;
import com.ReactProjects.cookbook.entity.Ingredient;
import com.ReactProjects.cookbook.entity.Recipe;
import com.ReactProjects.cookbook.entity.Tag;
import com.ReactProjects.cookbook.repository.CategoryRepository;
import com.ReactProjects.cookbook.repository.IngredientRepository;
import com.ReactProjects.cookbook.repository.RecipeRepository;
import com.ReactProjects.cookbook.repository.TagRepository;
import com.ReactProjects.cookbook.service.RecipeService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RecipeServiceImpl implements RecipeService {

    private final RecipeRepository recipeRepository;
    private final CategoryRepository categoryRepository;
    private final TagRepository tagRepository;
    private final IngredientRepository ingredientRepository;

    public RecipeServiceImpl(RecipeRepository recipeRepository, CategoryRepository categoryRepository, TagRepository tagRepository, IngredientRepository ingredientRepository) {
        this.recipeRepository = recipeRepository;
        this.categoryRepository = categoryRepository;
        this.tagRepository = tagRepository;
        this.ingredientRepository = ingredientRepository;
    }

    @Override
    public List<Recipe> getRecipes() {
        return recipeRepository.findAll();
    }


    public Optional<Recipe> getRecipe(Long id) {
        return recipeRepository.findById(id);
    }

    @Transactional
    public Recipe addRecipe(RecipeRequestDto recipeDto) {

        System.out.println(recipeDto);
        Recipe recipe = new Recipe();
        recipe.setName(recipeDto.getName());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setCookingTime(recipeDto.getCookingTime());
        recipe.setFavourite(recipeDto.isFavourite());
        recipe.setImgPath(recipeDto.getImgPath());

        // Pobranie kategorii z bazy po ID
        List<Category> categories = categoryRepository.findAllById(recipeDto.getCategories());
        recipe.setCategories(categories);

        // Pobranie tagów po nazwie (zakładamy, że tagi już istnieją w bazie)
        List<Tag> tags = tagRepository.findByNameIn(recipeDto.getTags());
        recipe.setTags(tags);

        // Tworzenie i przypisanie składników
        List<Ingredient> ingredients = recipeDto.getIngredients().stream()
                .map(dto -> {
                    Ingredient ingredient = new Ingredient();
                    ingredient.setName(dto.getName());
                    ingredient.setQuantity(dto.getQuantity());
                    ingredient.setUnit(dto.getUnit());
                    ingredient.setRecipe(recipe);
                    return ingredient;
                })
                .collect(Collectors.toList());

        recipe.setIngredients(ingredients);

        // Zapis przepisu i składników w bazie
        return recipeRepository.save(recipe);
    }
}
