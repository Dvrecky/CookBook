package com.ReactProjects.cookbook.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "recipes")
public class Recipe {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    // Relacja OneToMany z składnikami
    @OneToMany(mappedBy = "recipe", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ingredient> ingredients = new ArrayList<>();

    @ManyToMany
    @JoinTable(
            name = "recipe_category",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id")
    )
    private List<Category> categories;

    @ManyToMany
    @JoinTable(
            name = "recipe_tag",
            joinColumns = @JoinColumn(name = "recipe_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<Tag> tags;

    @Column(name = "cooking_time")
    private int cookingTime;

    @Column(name = "is_favourite")
    private boolean isFavourite;

    @Column(name = "imgPath")
    private String imgPath;

    public Recipe() {
    }


    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public List<Ingredient> getIngredients() {
        return ingredients;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public int getCookingTime() {
        return cookingTime;
    }

    public boolean isFavourite() {
        return isFavourite;
    }

    public String getImgPath() {
        return imgPath;
    }
}
