package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {
}
