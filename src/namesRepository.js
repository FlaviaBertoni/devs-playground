import fs from 'fs';
import { historyRepositoryPath, namesRepositoryPath, directoryRepositoryPath } from '../config';

const handleError = error => {
    if (error) console.error(error);
};

const writeHistory = history => {
    const stringHistory = JSON.stringify(history);
    fs.writeFile(historyRepositoryPath, stringHistory, handleError);
};

const initializeNamesRepository = () => {
    if (!fs.existsSync(directoryRepositoryPath)) fs.mkdirSync(directoryRepositoryPath);
    fs.writeFile(
        namesRepositoryPath,
        JSON.stringify({
                names: [],
                adjectives: [],
                blackList: []
            }
        ),
        handleError
    );
};

const readNamesRepository = () => {
    if (fs.existsSync(namesRepositoryPath)) return JSON.parse(fs.readFileSync(namesRepositoryPath));
    initializeNamesRepository();
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
    return {
        ...repositoryNames,
        history,
    };
};

export { writeHistory, getAllJSONRepositories }
