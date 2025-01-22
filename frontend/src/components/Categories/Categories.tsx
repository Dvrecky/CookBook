import {Category} from "../../models/Category.tsx";
import "./Categories.css"

interface CategoriesProps {
    categories: Category[];
    onCategoryClick: (id: number) => void;
}

const Categories= ({categories, onCategoryClick}: CategoriesProps) => {
    return (
        <div className="categories-component-container">
            <h2 className="category-titel">Kategorie</h2>
                <ul className="categories-list">
                    {categories.map(category => (
                            <li className="category-element"
                                key={category.id}
                                onClick={() => onCategoryClick(category.id)}
                            >
                                {category.name}
                            </li>
                    ))}
                </ul>
        </div>
    )
}

export default Categories;