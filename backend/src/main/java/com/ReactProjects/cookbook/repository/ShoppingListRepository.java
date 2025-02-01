package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShoppingListRepository extends JpaRepository <Item, Long> {
}
