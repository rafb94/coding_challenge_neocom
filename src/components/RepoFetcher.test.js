// External imports
import {describe, expect, test} from '@jest/globals';
import {mount} from 'enzyme';
import axios from 'axios';
import { waitFor } from '@testing-library/react';

// Own imports
import RepoElement from './RepoElement.js';
import RepoFetcher from './RepoFetcher.js';
import { act } from '@testing-library/react';

describe("Test category change after click on RepoElement 'star' button",
    () =>
    // In here I intended to test if the repo elements changed category after being clicked on and receiving more stars
    // However I ran into this problem: "Warning: An update to RepoFetcher inside a test was not wrapped in act(...)" and had no time left to correct it
    {
        jest.mock('axios');

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
        
        axios.get = jest.fn();
        axios.get.mockResolvedValue({
            data: repos
        });

        
        const containerFetcher = mount(<RepoFetcher />);
        const containerCategorizer = containerFetcher.childAt(0).childAt(0);
        
        //containerCategorizer.find('div').at(0).find('div').at(0).childAt(2).find(RepoElement).at(0).find('button').at(0).simulate('click');


        test('should contain four RepoElements and three titles', async () => {
            // element is initially not present...
            
            // wait for appearance inside an assertion
            await waitFor(() => {
                expect(containerCategorizer.find('h1').length).toEqual(3);
                expect(containerCategorizer.find(RepoElement).length).toEqual(4);
            })
        })
        
//
        //it('First category should contain one element', () => {
        //    expect(containerCategorizer.find('div').at(0).childAt(0).find(RepoElement).length).toEqual(1);
        //});
//
        //it('Second category should contain zero elements', () => {
        //    expect(containerCategorizer.find('div').at(0).childAt(1).find(RepoElement).length).toEqual(0);
        //});
//
        //it('Third category should contain three elements', () => {
        //    expect(containerCategorizer.find('div').at(0).childAt(2).find(RepoElement).length).toEqual(3);
        //});

        axios.get.mockClear();
    }
)