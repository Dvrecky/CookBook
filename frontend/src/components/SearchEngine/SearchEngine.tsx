import './SearchEngine.css'

interface SearchEngineProps {
    onSubmit: (phrase: string) => void;
}

const searchEngine= ({ onSubmit } : SearchEngineProps) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const submitForm = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const phrase = formData.get("phrase") as string;
        onSubmit(phrase);
    }

    return (
        <form className="search-engine-form" onSubmit={submitForm}>
            <input className="search-input"
                type="search"
                name="phrase"
                placeholder="Wyszukaj przepis"
            />
            {/*<button className="search-button" type="submit">Wyszukaj</button>*/}
        </form>

    )
        ;
}

export default searchEngine;