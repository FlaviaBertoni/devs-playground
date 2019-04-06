import { getAllJSONRepositories, updateHistorical } from './namesRepository';
import getRandomName from './getRandomName';

const generateReleaseName = () => {
    const {
        names,
        adjectives,
        blackList,
        historical
    } = getAllJSONRepositories();

    if(!names || names.length === 0 || !adjectives || adjectives.length === 0) {
        return 'Não existe nenhum nome ou adjetivo cadastrado! ' +
            '\nPor favor adicione dados no aquivo names da pasta repository.';
    }

    if((names.length * adjectives.length - blackList.length) === historical.length) {
        return 'Todos os nomes já foram usados.';
    }

    const name = getRandomName( names, adjectives, blackList, historical );
    updateHistorical(historical.concat(name));

    return name;
};

export default generateReleaseName;
