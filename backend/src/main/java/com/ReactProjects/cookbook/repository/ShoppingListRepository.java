package com.ReactProjects.cookbook.repository;

import com.ReactProjects.cookbook.entity.Item;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ShoppingListRepository extends JpaRepository <Item, Long> {

    @Transactional
    @Modifying
    @Query("UPDATE Item SET quantity = :newQuantity WHERE id = :itemId")
    void changeItemQuantity(@Param("itemId") long id, @Param("newQuantity") int quantity);
}
