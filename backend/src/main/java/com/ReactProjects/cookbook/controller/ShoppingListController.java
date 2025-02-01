package com.ReactProjects.cookbook.controller;

import com.ReactProjects.cookbook.dto.ItemDTO;
import com.ReactProjects.cookbook.dto.ShoppingListDTO;
import com.ReactProjects.cookbook.entity.Item;
import com.ReactProjects.cookbook.service.ItemService;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
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

    @PatchMapping("/{id}")
    public ResponseEntity<String> changeQuantity(@PathVariable long id, @RequestParam int quantity) {

        itemService.changeQuantity(id, quantity);

        return ResponseEntity.ok("Quantity for item with id: " + id + " changed successfully");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteItem(@PathVariable long id) {

        itemService.deleteItemById(id);

        return ResponseEntity.ok("Item with id: " + id + " has been deleted successfully");
    }
}
