// External imports
import {describe, expect, test} from '@jest/globals';
import {shallow} from 'enzyme';

// Own imports
import RepoCategorizer from './RepoCategorizer.js';
import RepoElement from './RepoElement.js';

describe("Test RepoCategorizer with 4 repos",
    () =>
    {
        let repos = [
            {
              "id": 132935648,
              "name": "repo123",
              "stargazers_count": 14,
            },
            {
              "id": 18221276,
              "name": "halloWelt",
              "stargazers_count": 20,
            },
            {
              "id": 20978623,
              "name": "hello-worId",
              "stargazers_count": 46,
            },
            {
                "id": 1000,
                "name": "hello-worId1",
                "stargazers_count": 10001,
            },
        ]

        const container = shallow(<RepoCategorizer repos={repos} />);

        it('should match snapshot', () => {
            expect(container).toMatchSnapshot();
        });

        it('should contain three h1 titles', () => {
            expect(container.find('h1').length).toEqual(3);
        });

        it('should contain four RepoElements', () => {
            expect(container.find(RepoElement).length).toEqual(4);
        });

        it('First category should contain one element', () => {
            expect(container.find('div').at(0).childAt(0).find(RepoElement).length).toEqual(1);
        });

        it('Second category should contain zero elements', () => {
            expect(container.find('div').at(0).childAt(1).find(RepoElement).length).toEqual(0);
        });

        it('Third category should contain three elements', () => {
            expect(container.find('div').at(0).childAt(2).find(RepoElement).length).toEqual(3);
        });
    }
)

describe("Test RepoCategorizer with no repos",
    () =>
    {
        const container = shallow(<RepoCategorizer />);

        it('should match snapshot', () => {
            expect(container).toMatchSnapshot();
        });

        it('should contain three h1 titles', () => {
            expect(container.find('h1').length).toEqual(3);
        });

        it('should contain zero RepoElements', () => {
            expect(container.find(RepoElement).length).toEqual(0);
        });
    }
)
