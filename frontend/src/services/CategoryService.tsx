import {Category} from "../models/Category.tsx";

const categories: Category[] = [
    {
        id: 1,
        name: "Śniadanie"
    },
    {
        id: 2,
        name: "Lunch"
    },
    {
        id: 3,
        name: "Obiad"
    },
    {
        id: 4,
        name: "Deser"
    },
    {
        id: 5,
        name: "Kolacja"
    },
    {
        id: 6,
        name: "Przekąska"
    }
]

export const getCategoreis = (): Category[] => {
    return categories;
}

