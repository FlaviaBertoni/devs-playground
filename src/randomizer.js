import { getAllJSONRepositories, updateHistorical } from './namesRepository';
import getRandomName from './getRandomName';

const printRelaseName = () => {
    const {
        names,
        adjectives,
        blackList,
        historical
    } = getAllJSONRepositories();

    if((names.length * adjectives.length - blackList.length) === historical.names.length) {
        return 'Todos os nomes já forão usados.';
    }

    const name = getRandomName( names, adjectives, blackList, historical.names);

    historical.names.push(name);
    updateHistorical(historical);

    return name;
};

console.log(printRelaseName());
