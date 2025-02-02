import {useParams} from "react-router-dom";
import './RecipeDetails.css'
import Dialog from "../../components/Dialog/Dialog.tsx";
import EditRecipeForm from "../../components/Forms/EditRecipeForm.tsx";
import {useEffect, useState} from "react";
import {Recipe} from "../../models/Recipe.tsx";
import axios from "axios";

const RecipeDetails = () => {
    const [dialog, setDialog] = useState(false);
    const [recipe, setRecipe] = useState<Recipe | null>(null);

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/recipes/${id}`)
            .then(response=> setRecipe(response.data))
            .catch(error => console.log(error))
    }, []);

    if(!recipe) {
        return <p>Recipe not found</p>
    }


    const handleDeleteRecipe = () => {

    }

    const handleDodajDoUlubionych = () => {

    }

    const handleFormSubmit = () => {
        setDialog(false);
    }

    return (
        <div className="recipe-details-container">
            <div className="recipe">
                <div className="recipe-details-header">
                    <img className="recipe-img" src={recipe.imgPath}/>
                    <h2 className="recipe-name">{recipe.name}</h2>
                </div>

                <div className="details">
                    <div className="ingredients-container">
                        <p>Składniki</p>
                        <ul className="ingredients-list-ul">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li className="ingredients-list-li" key={index}>{ingredient.name}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="steps-container">
                        <p>Czas przygotowania: {recipe.cookingTime} min</p>
                        <p>Sposób przygotowania:</p>
                        <span className="steps">{recipe.description}</span>
                    </div>
                </div>
            </div>
            <div className="buttons-container">
                <button className="opt-button" onClick={handleDodajDoUlubionych}>Dodaj do ulubionych</button>
                <button className="opt-button" type="button" onClick={handleDeleteRecipe}>Usun</button>
                <button className="opt-button" onClick={() => setDialog(true)}>Edytuj</button>

                <Dialog
                    openDialog={dialog}
                    closeDialog={() => setDialog(false)}
                >
                    <EditRecipeForm
                        onSubmit={handleFormSubmit}
                        onCancel={() => setDialog(false)}
                        recipe={recipe}
                    />
                </Dialog>
            </div>
        </div>
    )
}

export default RecipeDetails;