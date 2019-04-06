const fs = require('fs');

import { historicalRepository, namesRepository } from '../config';

const updateHistorical = (json) => {
    fs.writeFile(historicalRepository, JSON.stringify(json), 'utf8', (err) => {
        if (err) console.error(err);
    });
};

const getAllJSONRepositories = () => {
    const repositoryNames = JSON.parse(fs.readFileSync(namesRepository));
    const historical = JSON.parse(fs.readFileSync(historicalRepository));
    const {
        names,
        adjectives,
        blackList,
    } = repositoryNames;

    return {
        names,
        adjectives,
        blackList,
        historical,
    };
};

export { updateHistorical, getAllJSONRepositories }
