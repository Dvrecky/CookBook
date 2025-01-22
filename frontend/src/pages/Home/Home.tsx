import  {useEffect, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard.tsx"
import {getRecipes} from "../../services/RecipeService.tsx";
import {Recipe} from "../../models/Recipe.tsx";
import {Category} from "../../models/Category.tsx";
import {getCategoreis} from "../../services/CategoryService.tsx";
import Categories from "../../components/Categories/Categories.tsx";
import './Home.css'

const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
    const fetchedRecipes = getRecipes(); // Pobieramy przepisy z serwisu
    setRecipes(fetchedRecipes); // Ustawiamy przepisy w stanie
    }, []);

    const [categories, setCategories] = useState<Category[]>([]);
    useEffect(() => {
        const fetchedCategories = getCategoreis();
        setCategories(fetchedCategories);
    }, []);


    return (
      <div className="home-container">
          <div className="categories-container">
              <Categories categories={categories} />
          </div>
          <div className="recipes-container">
              <h1>Przepisy</h1>
              <div className="recipes-list">
                  {recipes.map((recipe) => (
                      <RecipeCard
                          key={recipe.id}
                          id={recipe.id}
                          image={recipe.image}
                          name={recipe.name}
                          cookingTime={recipe.cookingTime}
                      />
                  ))}
              </div>
          </div>
      </div>
    );
};

export default Home;