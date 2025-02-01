package com.ReactProjects.cookbook.service;

import com.ReactProjects.cookbook.dto.ShoppingListDTO;

import java.util.List;

public interface ItemService {

    ShoppingListDTO getShoppingList();

    void changeQuantity(long id, int newQuantity);

    void deleteItemById(long id);
}
