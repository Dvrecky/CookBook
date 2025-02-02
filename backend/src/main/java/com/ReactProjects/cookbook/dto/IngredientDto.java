package com.ReactProjects.cookbook.dto;

import lombok.Data;

@Data
public class IngredientDto {
    private String name;
    private int quantity;
    private String unit;

    public String getName() {
        return name;
    }

    public int getQuantity() {
        return quantity;
    }

    public String getUnit() {
        return unit;
    }

    public IngredientDto(String name, int quantity, String unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
}

