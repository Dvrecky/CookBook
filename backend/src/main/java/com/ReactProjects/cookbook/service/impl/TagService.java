package com.ReactProjects.cookbook.service.impl;

import com.ReactProjects.cookbook.entity.Tag;
import com.ReactProjects.cookbook.repository.TagRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TagService implements com.ReactProjects.cookbook.service.TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    @Override
    public List<Tag> getTags() {
        return tagRepository.findAll();
    }
}
