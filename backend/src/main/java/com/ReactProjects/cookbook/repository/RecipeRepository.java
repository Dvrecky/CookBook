package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Recipe;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecipeRepository extends JpaRepository <Recipe, Long> {
}
