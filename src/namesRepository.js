const fs = require('fs');

import { historicalRepository, namesRepository, dirRepository } from '../config';

const updateHistorical = (json) => {
    fs.writeFile(historicalRepository, JSON.stringify(json), (err) => {
        if (err) console.error(err);
    });
};

const readNamesRepository = () => {
    if (fs.existsSync(namesRepository)) return JSON.parse(fs.readFileSync(namesRepository));
    if (!fs.existsSync(dirRepository)) fs.mkdirSync(dirRepository);

    fs.writeFile(
        namesRepository,
        JSON.stringify({
                names: [],
                adjectives: [],
                blackList: []
            }
        ),
        (err) => { if (err) console.error(err) }
    );
    return {};
};

const readHistoricalRepository = () => (
    fs.existsSync(historicalRepository)
        ? JSON.parse(fs.readFileSync(historicalRepository))
        : []
);

const getAllJSONRepositories = () => {
    const repositoryNames = readNamesRepository();
    const historical = readHistoricalRepository();
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
