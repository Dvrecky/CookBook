export interface Recipe {
    id: number;
    image: string;
    name: string;
    description: string;
    ingredients: string[];
    cookingTime: number;
    categoriesIds: number[];
    tags: Tags[];
}

export enum Tags {
    Vege = "Vege",
    BezNabialu = "Bez Nabialu",
    BezCukru = "Bez Cukru",
    BezGlutenu = "Bez Glutenu",
    DanieRybne = "Danie Rybne"
}
