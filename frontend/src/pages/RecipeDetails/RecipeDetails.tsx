import {useParams} from "react-router-dom";
import {getRecipeById} from "../../services/RecipeService.tsx";
import './RecipeDetails.css'

const RecipeDetails = () => {
    const { id } = useParams<{ id: string }>();

    const recipe = getRecipeById(Number(id));

    if(!recipe) {
        return <p>Recipe not found</p>
    }

    return (
        <div className="recipe-details-container">
            <div className="recipe">
                <div className="recipe-details-header">
                    <img className="recipe-img" src={recipe.image}/>
                    <h2 className="recipe-name">{recipe.name}</h2>
                </div>

                <div className="details">
                    <div className="ingredients-container">
                        <p>Składniki</p>
                        <ul className="ingredients-list-ul">
                            {recipe.ingredients.map((ingredient, index) => (
                                <li className="ingredients-list-li" key={index}>{ingredient}</li>
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
        </div>
    )
}

export default RecipeDetails;