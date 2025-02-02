package com.ReactProjects.cookbook.service.impl;

import com.ReactProjects.cookbook.entity.Category;
import com.ReactProjects.cookbook.repository.CategoryRepository;
import com.ReactProjects.cookbook.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }
}
