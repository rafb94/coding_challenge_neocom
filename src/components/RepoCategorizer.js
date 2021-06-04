// External imports
import {useEffect, useState} from 'react';
import axios from 'axios';

// Own imports
import RepoElement from './RepoElement.js';


function RepoCategorizer() {

    // Repos is set to undefined to express that no information has been fetched yet
    let [repos, setRepos] = useState(undefined);
    let [message, setMessage] = useState("Loading...");
  
    useEffect(
        () =>
        {
            let configuration = {
                method: 'get',
                url : 'https://api.github.com/users/octocat/repos'
            }
            
            axios(configuration)
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

    let filterRepos = (lowerLimit, upperLimit) =>
    {
        let returnValue = repos.filter(
            (repo) =>
            {
                if (repo.stargazers_count >= lowerLimit && upperLimit && repo.stargazers_count <= upperLimit)
                {
                    return true;
                }

                return false;
            }
        )

        return returnValue;
    }

    let createRepoElements = (repos) =>
    {
        let returnValue = repos.map(
            (repo) =>
            {
                return <RepoElement key={repo.id} repo={repo} />;
            }
        )

        return returnValue;
    }

    let addStarsToRepo = (specifiedRepo) =>
    {
        let newRepos = repos.map(
            (repo) =>
            {
                if (repo.id === specifiedRepo.id)
                {
                    return blup
                }

                return repo;
            }
        )

        setRepos(repos);
    }


    return (
        <div>
            <div>
                <h1> More than 10.000 stars</h1>
                {
                    repos !== undefined? 
                    createRepoElements(filterRepos(10001)):
                    message
                }
            </div>

            <div>
                <h1> 1.000 to 10.000 stars</h1>
                {
                    repos !== undefined? 
                    createRepoElements(filterRepos(1000, 10000)):
                    message
                }
            </div>

            <div>
                <h1> Below 1.000 stars</h1>
                {
                    repos !== undefined? 
                    createRepoElements(filterRepos(0, 999)):
                    message
                }
            </div>
            
        </div>
    );
}

export default RepoCategorizer;