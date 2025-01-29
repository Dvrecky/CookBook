import "./Sorter.css"
import {SorterOption} from "../../models/SorterOption.tsx";

interface SorterProps {
    onSorterChange: (sortAlg: string) => void;
}

const Sorter = ({onSorterChange}: SorterProps) => {

    const handleSortAlgChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onSorterChange(event.target.value);
    }

    return (
        <div>
            <label className="sorter-label">Sortuj: </label>
            <select className="sorter-select" onChange={handleSortAlgChange}>
                <option value={SorterOption.TIME_ASC}>czas przygotowania - rosnąco</option>
                <option value={SorterOption.TIME_DESC}>czas przygotowania - malejąco</option>
                <option value={SorterOption.INGREDIENTS_ASC}>ilość składników - rosnąco</option>
                <option value={SorterOption.INGREDIENTS_DESC}>ilość składników - malejąco</option>
                <option value={SorterOption.ALPHABETICALLY}>alfabetycznie</option>
            </select>
        </div>
    )
}

export default Sorter;