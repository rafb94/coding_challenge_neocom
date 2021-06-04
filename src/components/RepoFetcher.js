// External imports
import {useEffect, useState} from 'react';
import axios from 'axios';

//Own imports
import RepoCategorizer from './RepoCategorizer.js';


function RepoFetcher() {

    // Repos is set to undefined to express that no information has been fetched yet
    let [repos, setRepos] = useState(undefined);
    let [message, setMessage] = useState("Loading...");
  
    useEffect(
        () =>
        {            
            axios.get('https://api.github.com/users/octocat/repos')
            .then(
                (response) =>
                {
                    setRepos(response.data);
                }
            )
            .catch(
                (error) =>
                {
                    setMessage("There was a problem fetching the data!")
                }
            )
        }, 
        // effect doesn’t depend on any values from props or state, so it never needs to re-run 
        []
    )

    return (
        <div>
            <RepoCategorizer repos={repos} message={message} setRepos={setRepos} />
        </div>
    );
}

export default RepoFetcher;