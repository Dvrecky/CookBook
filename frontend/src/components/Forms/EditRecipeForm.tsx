import {useEffect, useState} from "react";
import {Recipe} from "../../models/Recipe.tsx";
import {Category} from "../../models/Category.tsx";
import {Tag} from "../../models/Tag.ts";
import axios from "axios";
import {RecipeValidator} from "./RecipeValidator.ts";

interface Props {
    onSubmit: (data: any) => void,
    onCancel: () => void,
    recipe: Recipe
}


const EditRecipeForm = ({onSubmit, onCancel, recipe}: Props) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);

    const [formData, setFormData] = useState({
        name: recipe.name,
        cookingTime: recipe.cookingTime,
        description: recipe.description,
        ingredients: recipe.ingredients.map((ingredient) => `${ingredient.quantity} ${ingredient.name}`).join(", "),
        categories: recipe.categories.map((c) => c.id),
        tags: recipe.tags.map((c) => c.id),
        imgPath: recipe.imgPath
    })

    const initialFormData = {
        name: recipe.name,
        cookingTime: recipe.cookingTime,
        description: recipe.description,
        ingredients: recipe.ingredients.map((ingredient) => `${ingredient.quantity} ${ingredient.name}`).join(", "),
        categories: recipe.categories.map((c) => c.id),
        tags: recipe.tags.map((c) => c.id),
        imgPath: recipe.imgPath
    }

    useEffect(() => {
        axios.get('http://localhost:8080/api/categories')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);


    useEffect(() => {
        axios.get('http://localhost:8080/api/tags')
            .then(response => setTags(response.data))
            .catch(error => console.error('Error fetching tags:', error));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const validationErrors = RecipeValidator(formData);
        if (Object.keys(validationErrors).length === 0) {

            const newRecipe: Recipe = {
                name: formData.name,
                description: formData.description,
                cookingTime: formData.cookingTime,
                imgPath: formData.imgPath,
                categories: formData.categories,
                tags: formData.tags,
                ingredients: formData.ingredients.split(",").map((ingredient: string) => {
                    return {
                        name: ingredient.trim(),
                        quantity: 0,
                        unit: null,
                    };
                }),
            };


            await axios.put(`http://localhost:8080/api/recipes/${recipe.id}`, newRecipe)
            .then(() => {
                console.log("Recipe updated successfully");
                onSubmit(newRecipe);  // Assuming this updates the state or form submission
                setFormData(initialFormData);  // Reset form data
            })
            .catch((error) => {
                console.error("Error updating recipe:", error);
            });

        }
        else {
            setErrors(validationErrors);
        }
    }

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        if (name === "categories") {
            setFormData((prev) => {
                const currentArray = prev.categories;

                if (checked) {
                    return {
                        ...prev,
                        categories: [...currentArray, Number(value)],
                    };
                } else {
                    return {
                        ...prev,
                        categories: currentArray.filter((id) => id !== Number(value)), // Filtrujemy ID
                    };
                }
            });
        } else if (name === "tags") {
            setFormData((prev) => {
                const currentArray = prev.tags;
                if (checked) {
                    return {
                        ...prev,
                        tags: [...currentArray, Number(value)],
                    };
                } else {
                    return {
                        ...prev,
                        tags: currentArray.filter((tagId) => tagId !== Number(value)),
                    };
                }
            });
        } else {
            setFormData({ ...formData, [e.target.name]: value });
        }

        console.log(formData)
    };

    const handleCloseForm = () => {
        setErrors({});
        setFormData(initialFormData);
        onCancel();
    }

    return (
        <form className={"add-recipe-form"} onSubmit={handleSubmit}>

            <label>Nazwa: </label>
            <input
                className="form-text-input"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                type="text"
            />
            {errors.name && <span style={{color: "red", fontSize: "25px"}}>{errors.name}</span>}


            <label>Czas przygotowania</label>
            <input
                className="form-text-input"
                id="cookingTime"
                name="cookingTime"
                value={formData.cookingTime}
                onChange={handleFormChange}
                type="number"
                min={1}
                step={1}
            />
            {errors.cookingTime && <span style={{color: "red", fontSize: "25px"}}>{errors.cookingTime}</span>}


            <label>Sposob przygotowania</label>
            <textarea
                className="form-text-input"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleFormChange}
                rows={4}
                cols={30}
            />
            {errors.description && <span style={{color: "red", fontSize: "25px"}}>{errors.description}</span>}


            <label>Skladniki</label>
            <input className="form-text-input"
                   id="ingredients"
                   name="ingredients"
                   value={formData.ingredients}
                   placeholder={"Wprowadź składniki po przecinku!"}
                   onChange={handleFormChange}
                   type="text"
            />
            {errors.ingredients && <span style={{color: "red", fontSize: "25px"}}>{errors.ingredients}</span>}


            <label>Kategorie</label>
            <div className="checkboxes-container">
                {categories.map((category) => (
                    <label key={category.id}>
                        <input
                            className="checkbox"
                            id="category"
                            name="categories"
                            type="checkbox"
                            value={category.id}
                            onChange={handleFormChange}
                            checked={formData.categories.includes(category.id)}
                        />
                        {category.name}
                    </label>
                ))}
            </div>
            {errors.categoriesIds && <span style={{color: "red", fontSize: "25px"}}>{errors.categoriesIds}</span>}


            <label>Tagi</label>
            <div className="checkboxes-container">
                {tags.map((tag, index) => (
                    <label key={index}>
                        <input
                            className="checkbox"
                            type="checkbox"
                            name="tags"
                            value={tag.id}
                            onChange={handleFormChange}
                            checked={formData.tags.includes(tag.id)}
                        />
                        {tag.name}
                    </label>
                ))}
            </div>
            {errors.tags && <span style={{color: "red", fontSize: "25px"}}>{errors.tags}</span>}

            <label>Adres zdjęcia</label>
            <input
                className="form-text-input"
                id="imgPath"
                name="imgPath"
                value={formData.imgPath}
                onChange={handleFormChange}
                type="text"
            />
            {errors.imgPath && <span style={{color: "red", fontSize: "25px"}}>{errors.imgPath}</span>}

            <div className="recipe-form-buttons-container">
                <button className="recipe-form-button" type="submit">Zapisz</button>
                <button className="recipe-form-button" type="button" onClick={handleCloseForm}>Zamknij</button>
            </div>

        </form>
    )
}

export default EditRecipeForm;