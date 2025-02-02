package com.ReactProjects.cookbook.dto;

import lombok.Data;

import java.util.List;

@Data
public class RecipeRequestDto {
    private String name;
    private String description;
    private int cookingTime;
    private boolean isFavourite;
    private String imgPath;
    private List<Long> categories;
    private List<String> tags;
    private List<IngredientDto> ingredients;

    public RecipeRequestDto(String name, String description, int cookingTime, boolean isFavourite, String imgPath, List<Long> categories, List<String> tags, List<IngredientDto> ingredients) {
        this.name = name;
        this.description = description;
        this.cookingTime = cookingTime;
        this.isFavourite = isFavourite;
        this.imgPath = imgPath;
        this.categories = categories;
        this.tags = tags;
        this.ingredients = ingredients;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public boolean isFavourite() {
        return isFavourite;
    }

    public String getImgPath() {
        return imgPath;
    }

    public List<Long> getCategories() {
        return categories;
    }

    public List<String> getTags() {
        return tags;
    }

    public List<IngredientDto> getIngredients() {
        return ingredients;
    }

    @Override
    public String toString() {
        return "RecipeRequestDto{" +
                "name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", cookingTime=" + cookingTime +
                ", isFavourite=" + isFavourite +
                ", imgPath='" + imgPath + '\'' +
                ", categories=" + categories +
                ", tags=" + tags +
                ", ingredients=" + ingredients +
                '}';
    }
}
