import {Tag} from "./Tag.ts";
import {Category} from "./Category.tsx";

export interface Recipe {
    id: number;
    imgPath: string;
    name: string;
    description: string;
    ingredients: string[];
    cookingTime: number;
    categories: Category[];
    tags: Tag[];
}
