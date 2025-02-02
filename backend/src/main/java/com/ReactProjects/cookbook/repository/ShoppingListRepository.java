package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Item;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ShoppingListRepository extends JpaRepository <Item, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Item SET quantity = :newQuantity WHERE id = :itemId")
    void changeItemQuantity(@Param("itemId") long id, @Param("newQuantity") int quantity);

    @Transactional
    @Modifying
    @Query("UPDATE Item SET quantity = :newQuantity WHERE name = :itemName")
    void changeItemQuantityByName(@Param("itemName") String name, @Param("newQuantity") int quantity);

    Optional<Item> findByName(String name);
}
