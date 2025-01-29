import "./Sorter.css"

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
                <option value="time-asc">czas przygotowania - rosnąco</option>
                <option value="time-dsc">czas przygotowania - malejąco</option>
                <option value="ingredients-asc">ilość składników - rosnąco</option>
                <option value="ingredients-dsc">ilość składników - malejąco</option>
                <option value="alphabetically">alfabetycznie</option>
            </select>
        </div>
    )
}

export default Sorter;