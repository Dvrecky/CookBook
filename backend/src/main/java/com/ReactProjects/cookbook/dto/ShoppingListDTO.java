package com.ReactProjects.cookbook.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class ShoppingListDTO {

    private List<ItemDTO> itemDTOS;
}
