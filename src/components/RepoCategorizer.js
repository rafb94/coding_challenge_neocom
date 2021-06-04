// Own imports
import RepoElement from './RepoElement.js';


function RepoCategorizer({repos, message, setRepos}) {

    let addStarsToRepo = (specifiedRepo, starCount, starred) =>
    {
        let newRepos = repos.map(
            (repo) =>
            {
                if (repo.id === specifiedRepo.id)
                {
                    let newRepo = {
                        ...repo, 
                        stargazers_count: repo.stargazers_count + starCount, 
                        starred: starred
                    };

                    return newRepo
                }

                return repo;
            }
        )

        setRepos(newRepos);
    }


    let filterRepos = (lowerLimit, upperLimit) =>
    {
        let returnValue = repos.filter(
            (repo) =>
            {
                // conditionally filter when both the lower and upper limit are defined
                if (repo.stargazers_count >= lowerLimit && upperLimit && repo.stargazers_count <= upperLimit)
                {
                    return true;
                }
                // conditionally filter when only the lower limit is defined
                else if (repo.stargazers_count >= lowerLimit && !upperLimit)
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
                return <RepoElement key={repo.id} repo={repo} addStarsToRepo={addStarsToRepo} />;
            }
        )

        return returnValue;
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