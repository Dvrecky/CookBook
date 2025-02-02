import {useState} from "react";
import {RecipeValidator} from "./RecipeValidator.ts";
import {Category} from "../../models/Category.tsx";
import "./AddRecipeForm.css"
import {Tag} from "../../models/Tag.ts";
import {Recipe} from "../../models/Recipe.tsx";
import axios from "axios";

interface Props {
    onSubmit: (data: any) => void;
    onCancel: () => void;
    categories: Category[];
    tags: Tag[]
}
const initialFormData = {
    name: "",
    cookingTime: "",
    description: "",
    ingredients: "",
    categories: [],
    tags: [],
    imgPath: ""
};

const AddRecipeForm = ({onSubmit, onCancel, categories, tags} : Props) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const [formData, setFormData]= useState({
        name: "",
        cookingTime: "",
        description: "",
        ingredients: "",
        categories: [] as number[],
        tags: [] as number[],
        imgPath: ""
    });


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = RecipeValidator(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Format data for POST request
            const newRecipe: Recipe = {
                name: formData.name,
                description: formData.description,
                cookingTime: parseInt(formData.cookingTime), // Ensure it's an integer
                imgPath: formData.imgPath,
                categories: formData.categories,
                tags: formData.tags,
                ingredients: formData.ingredients.split(",").map((ingredient: string) => {
                    return {
                        name: ingredient.trim(),
                        quantity: 0, // Assuming a default quantity if you don't want to modify this logic
                        unit: null, // Assuming a default unit; you can change this
                    };
                }),
            };
            console.log(newRecipe);
            try {
                // POST the recipe to the API
                await axios.post("http://localhost:8080/api/recipes", newRecipe);
                console.log("Recipe added successfully");
                onSubmit(newRecipe);
                setFormData(initialFormData); // Reset the form
            } catch (error) {
                console.error("Error adding recipe:", error);
            }
        } else {
            setErrors(validationErrors);
        }
    };


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;

        if (name === "categories") {
            setFormData((prev) => {
                const currentArray = prev.categories;

                if (checked) {
                    // Dodajemy ID kategorii (value) do tablicy categories
                    return {
                        ...prev,
                        categories: [...currentArray, Number(value)], // Używamy Number(value), żeby upewnić się, że jest to typ number
                    };
                } else {
                    // Usuwamy ID kategorii (value) z tablicy categories
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
                    // Dodajemy ID tagu (value) do tablicy tags (zakładając, że value to ID tagu w formie string)
                    return {
                        ...prev,
                        tags: [...currentArray, Number(value)], // Używamy Number(value), żeby upewnić się, że jest to typ number
                    };
                } else {
                    // Usuwamy ID tagu z tablicy tags
                    return {
                        ...prev,
                        tags: currentArray.filter((tagId) => tagId !== Number(value)), // Filtrujemy ID
                    };
                }
            });
        } else {
            // Zmiana innych pól formularza
            setFormData({ ...formData, [e.target.name]: value });
        }
    };





    const handleCloseForm = () => {
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

export default AddRecipeForm;