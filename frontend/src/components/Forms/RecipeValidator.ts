
export interface RecipeFormData {
    name: string;
    cookingTime: number;
    description: string;
    ingredients: string;
    categories: number[];
    tags: number[];
    imgPath: string;
}

export interface ValidationErrors {
    [key: string]: string;
}

export const RecipeValidator = (data: RecipeFormData): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    const nameAndDescriptionPattern = /^[a-zA-Z0-9\s\-,.]+$/;
    // const ingredientPattern = /^(\d*\s*[a-zA-Z]+)(,\s*\d*\s*[a-zA-Z]+)*$/;


    if (!data.name.trim()) {
        newErrors.name = "Nazwa jest wymagana";
    } else if (!nameAndDescriptionPattern.test(data.name)) {
        newErrors.name = "Nieprawidłowy format nazwy";
    }

    if (!data.cookingTime || Number(data.cookingTime) < 0) {
        newErrors.cookingTime = "Czas przygotowania musi być liczbą większą lub równą 0";
    }

    if (!data.description.trim()) {
        newErrors.description = "Opis jest wymagany";
    } else if (!nameAndDescriptionPattern.test(data.description)) {
        newErrors.description = "Nieprawidłowy format opisu";
    }

    if (!data.ingredients.trim()) {
        newErrors.ingredients = "Składniki są wymagane";

    } else if (!nameAndDescriptionPattern.test(data.ingredients)) {
        console.log(data.ingredients);
        newErrors.ingredients = "Nieprawidłowy format składników";

    }

    if (!data.categories || (Array.isArray(data.categories) && data.categories.length === 0)) {
        newErrors.categoriesIds = "Wybierz co najmniej jedną kategorię";

    }

    if (!data.tags || (Array.isArray(data.tags) && data.tags.length === 0)) {
        newErrors.tags = "Wybierz co najmniej jeden tag";
    }

    if (!data.imgPath.trim()) {
        newErrors.imgPath = "Adres zdjęcia jest wymagany";

    }

    return newErrors;
}
