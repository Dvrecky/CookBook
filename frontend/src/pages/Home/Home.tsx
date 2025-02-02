import {useEffect, useMemo, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard.tsx"
import {Recipe} from "../../models/Recipe.tsx";
import {Category} from "../../models/Category.tsx";
import Categories from "../../components/Categories/Categories.tsx";
import './Home.css'
import TypeFilterForm from "../../components/Filters/Filter.tsx";
import SearchEngine from "../../components/SearchEngine/SearchEngine.tsx";
import Sorter from "../../components/Sorter/Sorter.tsx";
import {SorterOption} from "../../models/SorterOption.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";
import AddRecipeForm from "../../components/Forms/AddRecipeForm.tsx";
import axios from "axios";
import {Tag} from "../../models/Tag.ts";


const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [state, setState] = useState({
        selectedCategory: 1,
        filters: {typeFilter: [] as string[], timeFilter: null as string | null},
        searchPhrase: null as string | null,
        sorter: null as string | null,
    });
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8080/api/recipes')
            .then(response=> setRecipes(response.data))
            .catch(error => console.log(error))
    }, []);

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

    const filteredRecipes  = useMemo(() => {
        let result = recipes;


        if(state.selectedCategory !== null) {
            if (state.selectedCategory === 1) {
                result = recipes;
            } else {
                result = result.filter((recipe) => recipe.categories.find((c) => c.id === state.selectedCategory));
            }
        }

        if(state.searchPhrase) {
            result = result.filter((recipe) => {
                return (
                    recipe.name.toLowerCase().includes(state.searchPhrase.toLowerCase()) ||
                    recipe.ingredients.includes(state.searchPhrase.toLowerCase())
                )
            });
        }

        if (state.filters.typeFilter.length > 0) {
            result = result.filter((recipe) =>
                state.filters.typeFilter.every(filterTag =>
                    recipe.tags.some(recipeTag => recipeTag.name === filterTag)
                )
            );
        }


        if (state.filters.timeFilter) {
            result = result.filter((recipe) => {
                switch (state.filters.timeFilter) {
                    case "do 15 min": return recipe.cookingTime <= 15;
                    case "do 30 min": return recipe.cookingTime <= 30;
                    case "do 60 min": return recipe.cookingTime <= 60;
                    case "ponad 60 min": return recipe.cookingTime > 60;
                    default: return false;
                }
            });
        }

        if (state.sorter) {
            result = [...result].sort((a, b) => {
                switch (state.sorter) {
                    case SorterOption.TIME_ASC: return a.cookingTime - b.cookingTime;
                    case SorterOption.TIME_DESC: return b.cookingTime - a.cookingTime;
                    case SorterOption.INGREDIENTS_ASC: return a.ingredients.length - b.ingredients.length;
                    case SorterOption.INGREDIENTS_DESC: return b.ingredients.length - a.ingredients.length;
                    case SorterOption.ALPHABETICALLY: return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                    default: return 0;
                }
            });
        }

        return result;
    }, [recipes, state])


    const handleSelectCategory = (categoryId: number) => {
        setState(prevState => ({ ...prevState, selectedCategory: categoryId }));
    }

    const handleFilterChange = (selectedFilters: {typeFilter: string[], timeFilter: string | null}) => {
        setState(prevState => ({...prevState, filters: selectedFilters}));
        console.log(state.filters.typeFilter);
    }

    const handleSearchPhraseChange = (newPhrase: string | null) => {
        setState(prevState => ({ ...prevState, searchPhrase: newPhrase }));
    };

    const handleSorterChange = (sortAlg: string) => {
        setState(prevState => ({...prevState, sorter: sortAlg}));
    }

    const handleFormSubmit = () => {

        setDialog(false);
    }

    const timeFilters = ["do 15 min", "do 30 min", "do 60 min", "ponad 60 min"];
    const typeFilters: string[] = tags.map((tag) => tag.name);

    return (
        <div className="home-container">
            <div className="categories-container">
                <Categories categories={categories} onCategoryClick={handleSelectCategory}/>
            </div>


            <div className="middle-column">
                <div className="filters-container">
                    <TypeFilterForm
                        typeFilters={typeFilters}
                        timeFilters={timeFilters}
                        onFilterChange={handleFilterChange}
                    />
                </div>

                    <button className="open-dialog-button" onClick={() => setDialog(true)}>Dodaj przepis</button>

                <Dialog
                    openDialog={dialog}
                    closeDialog={() => setDialog(false)}
                >
                    <AddRecipeForm
                        onSubmit={handleFormSubmit}
                        onCancel={() => setDialog(false)}
                        categories={categories}
                        tags={tags}/>
                </Dialog>
            </div>
            <div className="recipes-container">
                <h1>Przepisy</h1>

                <div className="searchEngine-sorter-container">
                    <div className="search-engine-container">
                    <SearchEngine
                            onSubmit={handleSearchPhraseChange}
                        />
                    </div>

                    <div>
                        <Sorter onSorterChange={handleSorterChange}/>
                    </div>
                </div>

                <div className="recipes-list">
                    {filteredRecipes.length === 0 && <p id="lack-recipes-mess"> Brak przepisów </p>}

                    {filteredRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            id={recipe.id}
                            image={recipe.imgPath}
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