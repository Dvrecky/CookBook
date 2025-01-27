import {useState} from "react";
import './Filiters.css'

interface TypeFilterProps {
    typeFilters: string[];
    timeFilters: string[];
    onFilterChange: (selectedFilters: {typeFilter: string[], timeFilter: string | null}) => void;
}

const TypeFilterForm = ({typeFilters, timeFilters, onFilterChange}: TypeFilterProps ) => {
    const [selectedTypeFilters, setSelectedTypeFiltrs] = useState<string[]>([])
    const [selectedTimeFilter, setSelectedTimeFilter] = useState<string | null>(null)

    const handleCheckBoxChange= (fiter: string) => {
        const updatedFilters = selectedTypeFilters.includes(fiter) ? selectedTypeFilters.filter((t) => t !== fiter) : [...selectedTypeFilters, fiter];

        setSelectedTypeFiltrs(updatedFilters);
        onFilterChange({ typeFilter: updatedFilters, timeFilter: selectedTimeFilter });
    }


    const handleRadioChange = (filter:string) => {
        setSelectedTimeFilter(filter);
        onFilterChange({typeFilter: selectedTypeFilters, timeFilter: filter});
    }

    return (
        <div className="filter-form"
              onSubmit={(e) => {
                  e.preventDefault();
              }}
        >

            <div className="filter-container">
                <label className="filter-label">Filtry</label>
                <div>
                    {typeFilters.map((filter) => (
                        <div className="input-container" key={filter}>
                            <input className="filter-input"
                                   type="checkbox"
                                   id={filter}
                                   value={filter}
                                   checked={selectedTypeFilters.includes(filter)}
                                   onChange={() => handleCheckBoxChange(filter)}
                            />
                            <label htmlFor={filter}>{filter}</label>
                        </div>
                    ))}
                </div>
            </div>


            <div className="filter-container">
                <label className="filter-label">Czas przygotowania</label>
                <div>
                    {timeFilters.map((filter) => (
                        <div className="input-container" key={filter}>
                            <input className="filter-input"
                                   type="radio"
                                   id={filter}
                                   value={filter}
                                   checked={selectedTimeFilter === filter}
                                   onChange={() => handleRadioChange(filter)}
                            />
                            <label htmlFor={filter}>{filter}</label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TypeFilterForm;