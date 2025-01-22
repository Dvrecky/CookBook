import './RecipeCard.css';
import {Link} from "react-router-dom";

type RecipeCardProps = {
    id: number;
    image: string;
    name: string;
    cookingTime: string;
}

const RecipeCard = ({id, image, name, cookingTime }: RecipeCardProps) => {
    return (
        <Link to={`/recipe/${id}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div className="recipe-card-container">
            <img className="recipe-img" src={image}/>
            <h3>{name}</h3>
            <p>Preparation Time: {cookingTime}</p>
        </div>
        </Link>
    );
};

export default RecipeCard;