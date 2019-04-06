import { getAllJSONRepositories, updateHistorical } from './namesRepository';
import getRandomName from './getRandomName';

const generateReleaseName = () => {
    const {
        names,
        adjectives,
        blackList,
        historical
    } = getAllJSONRepositories();

    if((names.length * adjectives.length - blackList.length) === historical.names.length) {
        return 'Todos os nomes já foram usados.';
    }

    const name = getRandomName( names, adjectives, blackList, historical.names );
    updateHistorical(historical.names.concat(name));

    return name;
};

export default generateReleaseName;
