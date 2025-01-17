package com.ReactProjects.cookbook.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "shopping_list")
public class ShoppingList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private long id;

    @OneToOne
    @JoinColumn(name = "product_id")
    private Product products;

    @Column(name = "quantity")
    private int quantity;
}
