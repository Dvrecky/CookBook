package com.ReactProjects.cookbook.controller;

import com.ReactProjects.cookbook.dto.ShoppingListDTO;
import com.ReactProjects.cookbook.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/shopping-list")
public class ShoppingListController {

    private final ItemService itemService;

    public ShoppingListController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public ResponseEntity<ShoppingListDTO> getShoppingList() {
        return ResponseEntity.ok(itemService.getShoppingList());
    }
}
