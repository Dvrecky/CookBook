import {Recipe, Tags} from "../models/Recipe.tsx";

const recipes:Recipe[] = [
    {
        id: 1,
        name: 'Jajecznica',
        description:
            "Jajka rozbić, przyprawić solą i pieprzem," +
            " następnie wymieszać i wlać na nagrzaną patelnię." +
            " Jajecznice mieszać aż do ścięcia.",
        ingredients: ["3 jajka", "olej", "sól", "pieprz"],
        cookingTime: 5,
        image: "https://naukajedzenia.pl/wp-content/uploads/2023/03/jajecznica-z-cebula2glowne.jpg",
        categoriesIds: [1],
        tags: [Tags.Vege, Tags.BezCukru, Tags.BezNabialu, Tags.BezGlutenu]
    },
    {
        id: 2,
        name: 'Kanapka z serem',
        description:
            "Kromki chleba posmarować masłem, dodać plaster sera." +
            " Opcjonalnie można dodać warzywa takie jak pomidor lub sałata.",
        ingredients: ["2 kromki chleba", "masło", "ser żółty", "pomidor (opcjonalnie)", "sałata (opcjonalnie)"],
        cookingTime: 3,
        image: "https://cdn.kalkulatorkalorii.net/photos/Depositphotos_45844395_L.jpg",
        categoriesIds: [1, 5],
        tags: [Tags.Vege, Tags.BezCukru, Tags.BezNabialu]
    },
    {
        id: 3,
        name: 'Makaron z pesto',
        description:
            "Makaron ugotować według instrukcji na opakowaniu." +
            " Po odcedzeniu dodać pesto i wymieszać." +
            " Na wierzch można posypać startym parmezanem.",
        ingredients: ["200g makaronu", "3 łyżki pesto", "parmezan (opcjonalnie)"],
        cookingTime: 15,
        image: "https://staticsmaker.iplsc.com/smaker_production_2023_09_20/1e33f18e5570cb63deb001a9c33aeff6-content.png",
        categoriesIds: [3],
        tags: [Tags.Vege, Tags.BezCukru, Tags.BezNabialu]
    },
    {
        id: 4,
        name: 'Sałatka grecka',
        description:
            "Pomidory, ogórki i paprykę pokroić w kostkę." +
            " Dodać oliwki, ser feta i polać oliwą z oliwek." +
            " Całość przyprawić oregano, solą i pieprzem.",
        ingredients: ["2 pomidory", "1 ogórek", "1 papryka", "oliwki", "ser feta", "oliwa z oliwek", "oregano", "sól", "pieprz"],
        cookingTime: 10,
        image: "https://saproduwielbiaplmmedia.blob.core.windows.net/media/recipes/images/1699973171491.jpeg",
        categoriesIds: [2],
        tags: [Tags.Vege, Tags.BezCukru, Tags.BezGlutenu]
    },
    {
        id: 5,
        name: 'Naleśniki',
        description:
            "W misce wymieszać mąkę, mleko, jajko i szczyptę soli." +
            " Na rozgrzaną patelnię wlać porcję ciasta i smażyć z obu stron na złoty kolor.",
        ingredients: ["1 szklanka mąki", "1 szklanka mleka", "1 jajko", "szczypta soli", "olej do smażenia"],
        cookingTime: 20,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ1olJ3ugu3r68imoAd4tmDolecUWlhYIxRg&s",
        categoriesIds: [1,5],
        tags: [Tags.Vege]
    },
    {
        id: 6,
        name: 'Zupa pomidorowa',
        description:
            "Do bulionu dodać passatę pomidorową i przyprawy." +
            " Gotować przez 10 minut, a następnie podać z makaronem lub ryżem.",
        ingredients: ["1 litr bulionu", "500 ml passaty pomidorowej", "makaron lub ryż", "sól", "pieprz", "cukier (opcjonalnie)"],
        cookingTime: 25,
        image: "https://img.wprost.pl/_thumb/1f/1a/c69122a80c37084cbe83608f4120.jpeg",
        categoriesIds: [2,3],
        tags: [Tags.Vege, Tags.BezNabialu]
    }
];

export const getRecipes = (): Recipe[] => {
    return recipes;
}

export const getRecipeById = (id: number) => {
    return recipes.find((recipe) => recipe.id === id);
}