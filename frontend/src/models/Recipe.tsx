import {Tag} from "./Tag.ts";
import {Category} from "./Category.tsx";
import {Product} from "./Product.tsx";

export interface Recipe {
    id: number;
    imgPath: string;
    name: string;
    description: string;
    ingredients: Product[];
    cookingTime: number;
    categories: Category[];
    tags: Tag[];
}
