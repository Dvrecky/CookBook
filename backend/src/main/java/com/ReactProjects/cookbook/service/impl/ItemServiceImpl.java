package com.ReactProjects.cookbook.service.impl;

import com.ReactProjects.cookbook.dto.ItemDTO;
import com.ReactProjects.cookbook.dto.ShoppingListDTO;
import com.ReactProjects.cookbook.entity.Item;
import com.ReactProjects.cookbook.repository.ShoppingListRepository;
import com.ReactProjects.cookbook.service.ItemService;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService {

    private final ShoppingListRepository shoppingListRepository;
    private final ModelMapper modelMapper;

    public ItemServiceImpl(ShoppingListRepository shoppingListRepository, ModelMapper modelMapper) {
        this.shoppingListRepository = shoppingListRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public ShoppingListDTO getShoppingList() {

        List<Item> items = shoppingListRepository.findAll();
        List<ItemDTO> itemDTOS = items.stream()
                .map( item -> modelMapper.map(item, ItemDTO.class)).toList();

        ShoppingListDTO shoppingListDTO = new ShoppingListDTO();
        shoppingListDTO.setItemDTOS(itemDTOS);

        return shoppingListDTO;
    }

    @Override
    public void changeQuantity(long id, int newQuantity) {
        shoppingListRepository.changeItemQuantity(id, newQuantity);
    }

    @Transactional
    @Override
    public void deleteItemById(long id) {

        Optional<Item> itemOptional = shoppingListRepository.findById(id);

        if(itemOptional.isPresent()) {
            shoppingListRepository.deleteById(id);
        }
    }
}
