import  {useEffect, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard.tsx"
import {getRecipes} from "../../services/RecipeService.tsx";
import {Recipe, Tags} from "../../models/Recipe.tsx";
import {Category} from "../../models/Category.tsx";
import {getCategoreis} from "../../services/CategoryService.tsx";
import Categories from "../../components/Categories/Categories.tsx";
import './Home.css'
import TypeFilterForm from "../../components/Filters/Filter.tsx";
import SearchEngine from "../../components/SearchEngine/SearchEngine.tsx";



const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [filters, setFilters] = useState<{typeFilter: string[], timeFilter: string | null }>({
        typeFilter: [],
        timeFilter: null,
    })
    const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes)
    const [searchPhrase, setSearchPhrase] = useState<string | null>(null);

    useEffect(() => {
    const fetchedRecipes = getRecipes();
    setRecipes(fetchedRecipes);
    }, []);

    useEffect(() => {
        const fetchedCategories = getCategoreis();
        setCategories(fetchedCategories);
    }, []);

    useEffect(() => {
        let filteredRecipes = recipes;

        if(selectedCategory !== null && selectedCategory !== 0) { //id 0 to "Wszytskie"
            filteredRecipes = recipes.filter((recipe) => recipe.categoriesIds.includes(selectedCategory));
        }

        if (filters.typeFilter.length > 0) {

            if (filters.typeFilter.length > 0) {
                filteredRecipes = filteredRecipes.filter((recipe) => {
                    return filters.typeFilter.every((filter) => recipe.tags.includes(filter as Tags));
                });
            }

        }


        if(filters.timeFilter) {
            filteredRecipes = filteredRecipes.filter((recipe) => {
                switch(filters.timeFilter) {
                    case "do 15 min":
                        return recipe.cookingTime <= 15;
                    case "do 30 min":
                        return recipe.cookingTime <= 30;
                    case "do 60 min":
                        return recipe.cookingTime <= 60;
                    case "ponad 60 min":
                        return recipe.cookingTime > 60;
                    default:
                        return false}
            })
        }

        if(searchPhrase && searchPhrase.length > 0) {
            filteredRecipes = filteredRecipes.filter((recipe) => {
                return (
                    recipe.name.toLowerCase().includes(searchPhrase.toLowerCase()) ||
                    recipe.ingredients.some((ingredient) => ingredient.toLowerCase().includes(searchPhrase.toLowerCase()))
                );
            })
        }

        setFilteredRecipes(filteredRecipes);

    }, [recipes, filters, selectedCategory, searchPhrase]);

    const handleSelectCategory = (categoryId: number) => {
        setSelectedCategory(categoryId);
    }

    const handleFilterChange = (selectedFilters: {typeFilter: string[], timeFilter: string | null}) => {
        setFilters(selectedFilters);
    }

    const handleSearchPhraseChange = (newPhrase: string | null) => {
        setSearchPhrase(newPhrase);
        console.log("Wyszukiwane hasło:", newPhrase); // Możesz wykorzystać to wedle potrzeb
    };

    const typeFilters = [Tags.Vege, Tags.BezGlutenu, Tags.BezNabialu, Tags.BezCukru, Tags.DanieRybne];
    const timeFilters = ["do 15 min", "do 30 min", "do 60 min", "ponad 60 min"];


    return (
        <div className="home-container">
            <div className="categories-container">
                <Categories categories={categories} onCategoryClick={handleSelectCategory}/>
            </div>

            <div className="filters-container">
                <TypeFilterForm
                typeFilters={typeFilters}
                timeFilters={timeFilters}
                onFilterChange={handleFilterChange}
                />
            </div>

            <div className="recipes-container">
                <h1>Przepisy</h1>

                <div className="search-engine-container">
                    <SearchEngine
                        onSubmit={handleSearchPhraseChange}
                    />
                </div>

                <div className="recipes-list">
                    {filteredRecipes.length === 0 && <p id="lack-recipes-mess"> Brak przepisów </p>}

                    {filteredRecipes.map((recipe) => (
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