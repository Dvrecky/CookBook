import {useEffect, useMemo, useState} from "react";
import RecipeCard from "../../components/RecipeCard/RecipeCard.tsx"
import {getRecipes} from "../../services/RecipeService.tsx";
import {Recipe, Tags} from "../../models/Recipe.tsx";
import {Category} from "../../models/Category.tsx";
import {getCategoreis} from "../../services/CategoryService.tsx";
import Categories from "../../components/Categories/Categories.tsx";
import './Home.css'
import TypeFilterForm from "../../components/Filters/Filter.tsx";
import SearchEngine from "../../components/SearchEngine/SearchEngine.tsx";
import Sorter from "../../components/Sorter/Sorter.tsx";
import {SorterOption} from "../../models/SorterOption.tsx";
import Dialog from "../../components/Dialog/Dialog.tsx";


const Home = () => {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [state, setState] = useState({
        selectedCategory: 0,
        filters: {typeFilter: [] as string[], timeFilter: null as string | null},
        searchPhrase: null as string | null,
        sorter: null as string | null,
    });
    const [dialog, setDialog] = useState(false);

    useEffect(() => {
    const fetchedRecipes = getRecipes();
    setRecipes(fetchedRecipes);
    }, []);

    useEffect(() => {
        const fetchedCategories = getCategoreis();
        setCategories(fetchedCategories);
    }, []);

    const filteredRecipes  = useMemo(() => {
        let result = recipes;

        if(state.selectedCategory !== null && state.selectedCategory !== 0) {//id 0 to "Wszytskie"
            result = result.filter((recipe) => recipe.categoriesIds.includes(state.selectedCategory));
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
            result = result.filter((recipe) => {
                return state.filters.typeFilter.every((filter) => recipe.tags.includes(filter as Tags))
            });
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
    }

    const handleSearchPhraseChange = (newPhrase: string | null) => {
        setState(prevState => ({ ...prevState, searchPhrase: newPhrase }));
    };

    const handleSorterChange = (sortAlg: string) => {
        setState(prevState => ({...prevState, sorter: sortAlg}));
    }

    const typeFilters = [Tags.Vege, Tags.BezGlutenu, Tags.BezNabialu, Tags.BezCukru, Tags.DanieRybne];
    const timeFilters = ["do 15 min", "do 30 min", "do 60 min", "ponad 60 min"];

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
                />
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