import {useEffect, useState} from "react";
import {RecipeValidator} from "./RecipeValidator.ts";
import {Category} from "../../models/Category.tsx";
import {getCategoreis} from "../../services/CategoryService.tsx";
import {Tags} from "../../models/Recipe.tsx";
import "./AddRecipeForm.css"

interface Props {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}
const initialFormData = {
    name: "",
    cookingTime: "",
    description: "",
    ingredients: "",
    categoriesIds: [],
    tags: [],
    imgPath: ""
};

const AddRecipeForm = ({onSubmit, onCancel} : Props) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchedCategories = getCategoreis();
        setCategories(fetchedCategories);
    }, []);

    const tags = [Tags.Vege, Tags.BezGlutenu, Tags.BezNabialu, Tags.BezCukru, Tags.DanieRybne];

    const [formData, setFormData]= useState({
        name: "",
        cookingTime: "",
        description: "",
        ingredients: "",
        categoriesIds: [] as number[],
        tags: [] as string[],
        imgPath: ""
    });


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = RecipeValidator(formData);
        if (Object.keys(validationErrors).length === 0) {
            // Formularz jest poprawny - można wysłać dane, np. do API lub innej funkcji
            console.log("Dane formularza:", formData);

            const separatedIngredients = formData.ingredients.split(',');
            console.log(separatedIngredients);

            onSubmit(formData);
            setFormData(initialFormData)
        }
        else {
            setErrors(validationErrors);
        }
    }


    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked } = e.target;
        if (name === "categories") {
            setFormData((prev) => {
                const currentArray = prev.categoriesIds;
                if (checked) {
                    return {
                        ...prev,
                        categoriesIds: [...currentArray, Number(value)],
                    };
                } else {
                    return {
                        ...prev,
                        categoriesIds: currentArray.filter((id) => id !== Number(value)),
                    };
                }
            });
        } else if (name === "tags") {
            setFormData((prev) => {
                const currentArray = prev.tags;
                if (checked) {
                    return {
                        ...prev,
                        tags: [...currentArray, value],
                    };
                } else {
                    return {
                        ...prev,
                        tags: currentArray.filter((tag) => tag !== value),
                    };
                }
            });
        }
        else {
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
                            value={tag}
                            onChange={handleFormChange}
                        />
                        {tag}
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