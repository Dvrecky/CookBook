package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.ShoppingList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListRepository extends JpaRepository <ShoppingList, Long> {
}
