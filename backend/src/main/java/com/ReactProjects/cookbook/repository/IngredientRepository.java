package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Ingredient;
import org.springframework.boot.json.JacksonJsonParser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IngredientRepository extends JpaRepository <Ingredient, Long> {
}
