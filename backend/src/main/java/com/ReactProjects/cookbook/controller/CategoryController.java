package com.ReactProjects.cookbook.controller;

import com.ReactProjects.cookbook.entity.Category;
import com.ReactProjects.cookbook.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getCategories() {
        List<Category> categories = categoryService.getCategories();

        return ResponseEntity.ok(categories);
    }
}
