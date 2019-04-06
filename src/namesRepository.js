const fs = require('fs');

import { historyRepository, namesRepository, dirRepository } from '../config';

const writeHistory = (json) => {
    fs.writeFile(historyRepository, JSON.stringify(json), (err) => {
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

const readhistoryRepository = () => (
    fs.existsSync(historyRepository)
        ? JSON.parse(fs.readFileSync(historyRepository))
        : []
);

const getAllJSONRepositories = () => {
    const repositoryNames = readNamesRepository();
    const history = readhistoryRepository();
    const {
        names,
        adjectives,
        blackList,
    } = repositoryNames;

    return {
        names,
        adjectives,
        blackList,
        history,
    };
};

export { writeHistory, getAllJSONRepositories }
