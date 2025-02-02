package com.ReactProjects.cookbook.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "ingredients")
public class Ingredient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @Column(name = "quantity")
    private int quantity;

    @Column(name = "unit")
    private String unit;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "recipe_id")
    private Recipe recipe;

    public Ingredient(String unit, int quantity) {
        this.unit = unit;
        this.quantity = quantity;

    }

    public Ingredient() {
    }
}
