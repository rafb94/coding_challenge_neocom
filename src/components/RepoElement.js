// External imports
import {useState} from 'react';

// Own imports
import './RepoElement.css';

function RepoElement({repo, addStarsToRepo}) {

    // use info about the "starred" status if available, otherwise the repo is not "starred"
    let [starred, setStarred] = useState(repo && repo.starred? repo.starred: false);

    let toggleStarred = () =>
    {
        let newStarred = !starred;
        setStarred(newStarred);

        let starCountToBeAdded = 0;
        if (starred === true)
        {
            starCountToBeAdded = -1000;
        }
        else
        {
            starCountToBeAdded = 1000;
        }
        
        addStarsToRepo(repo, starCountToBeAdded, newStarred);
    }

    return (
        <div className={`container${starred? " starred": ""}`} >
            <div>
                <span><a href={repo.html_url}>{repo.name? repo.name: "No name available."}</a></span>
            </div>

            <div>
                <span>{repo.stargazers_count? repo.stargazers_count: "No star info available."}</span>
            </div>

            <div>
                {
                    starred?
                    <button onClick={toggleStarred}>
                        <span>unstar</span>
                    </button>
                    :
                    <button onClick={toggleStarred}>
                        <span>star</span>
                    </button>
                }
            </div>
        </div>
    );
}

export default RepoElement;