const fs = require('fs');

import { historyRepositoryPath, namesRepositoryPath, directoryRepositoryPath } from '../config';

const writeHistory = (json) => {
    fs.writeFile(historyRepositoryPath, JSON.stringify(json), (err) => {
        if (err) console.error(err);
    });
};

const readNamesRepository = () => {
    if (fs.existsSync(namesRepositoryPath)) return JSON.parse(fs.readFileSync(namesRepositoryPath));
    if (!fs.existsSync(directoryRepositoryPath)) fs.mkdirSync(directoryRepositoryPath);

    fs.writeFile(
        namesRepositoryPath,
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

const readhistoryRepositoryPath = () => (
    fs.existsSync(historyRepositoryPath)
        ? JSON.parse(fs.readFileSync(historyRepositoryPath))
        : []
);

const getAllJSONRepositories = () => {
    const repositoryNames = readNamesRepository();
    const history = readhistoryRepositoryPath();
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
