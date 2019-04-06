import { getAllJSONRepositories, writeHistory } from './namesRepository';
import getRandomName from './getRandomName';

const doNotHaveItems = array => !Array.isArray(array) || array.length === 0;

const checkIfAllPossibleReleaseNamesWasUsed = (names, adjectives, blackList = [], history) =>
    (names.length * adjectives.length - blackList.length) === history.length;

const isAbleToGenerateReleaseName = (names, adjectives, blackList, history) => {
    if (doNotHaveItems(names) || doNotHaveItems(adjectives)) {
        console.log('Não existe nenhum nome ou adjetivo cadastrado! ' +
            '\nPor favor adicione dados no aquivo names da pasta repository.');
        return false;
    }

    if (checkIfAllPossibleReleaseNamesWasUsed(names, adjectives, blackList, history)) {
        console.log('Todos os nomes já foram usados.');
        return false;
    }

    return true;
};

const updateHistory = (releaseName, history) => {
    const updatedHistory = history.concat(releaseName);
    writeHistory(updatedHistory);
};

const generateReleaseName = () => {
    const {
        names,
        adjectives,
        blackList,
        history
    } = getAllJSONRepositories();

    if (isAbleToGenerateReleaseName(names, adjectives, blackList, history)) {
        const releaseName = getRandomName(names, adjectives, blackList, history);
        updateHistory(releaseName, history);
        console.log(releaseName);
    }
};

export default generateReleaseName;
