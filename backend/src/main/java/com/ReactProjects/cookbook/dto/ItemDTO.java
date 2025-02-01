package com.ReactProjects.cookbook.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class ItemDTO {

    private long id;
    private String name;
    private int quantity;
}
