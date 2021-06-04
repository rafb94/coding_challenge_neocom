// External imports
import {useState} from 'react';

// Own imports
import './RepoElement.css';

function RepoElement({repo}) {

    let [starred, setStarred] = useState(false);

    let toggleStarred = () =>
    {
        setStarred(!starred)
    }

    return (
        <div className="container">
            <div>
                <span>{repo.name? repo.name: "No name available."}</span>
            </div>

            <div>
                <span>{repo.stargazers_count? repo.stargazers_count: "No star info available."}</span>
            </div>


            <button onClick={toggleStarred}>
                <span>star</span>
            </button>
                
        </div>
    );
}

export default RepoElement;