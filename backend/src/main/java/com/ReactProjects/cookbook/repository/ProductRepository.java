package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository <Product, Long> {
}
