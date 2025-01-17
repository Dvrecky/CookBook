package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository <Category, Long> {
}
