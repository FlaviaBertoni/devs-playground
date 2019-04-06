import generateReleaseName from '../src/generateReleaseName';
import getRandomName from '../src/getRandomName';
const namesRepository = require('../src/namesRepository');

jest.mock('../src/getRandomName', () => jest.fn(() => 'n1 a3'));
jest.mock('../src/namesRepository', () => ({
    getAllJSONRepositories: jest.fn( () => ({
        names: [ 'n1', 'n2', 'n3'],
        adjectives: [ 'a1', 'a2', 'a3' ],
        blackList: [ 'n1 a2' ],
        historical: [ 'n1 a1' ]
    })),
    updateHistorical: jest.fn(),
}));

describe('When randomizer is called', () => {
    const emptyAlertMessage = 'Não existe nenhum nome ou adjetivo cadastrado! ' +
        '\nPor favor adicione dados no aquivo names da pasta repository.';

    test('Should call getAllJSONRepositories', () => {
        generateReleaseName();
        expect(namesRepository.getAllJSONRepositories).toHaveBeenCalled();
    });
    test('Should call getRandomName', () => {
        generateReleaseName();
        expect(getRandomName).toHaveBeenCalledWith(
            [ 'n1', 'n2', 'n3'],
            [ 'a1', 'a2', 'a3' ],
            [ 'n1 a2' ],
            [ 'n1 a1' ]
        );
    });
    test('Should call updateHistorical with updated historical', () => {
        generateReleaseName();
        expect(namesRepository.updateHistorical).toHaveBeenCalledWith(
            [ 'n1 a1' , 'n1 a3']
        );
    });
    test('Should return the generated name', () => {
        const result = generateReleaseName();
        expect(result).toEqual('n1 a3');
    });
    test('When all combinations are used should print a alert message', () => {
        namesRepository.getAllJSONRepositories.mockReturnValue({
            names: [ 'n1' ],
            adjectives: [ 'a1', 'a2' ],
            blackList: [ 'n1 a1' ],
            historical: [ 'n1 a2' ]
        });
        const result = generateReleaseName();
        expect(result).toEqual('Todos os nomes já foram usados.');
    });
    test('When names are null should print the empty alert message', () => {
        namesRepository.getAllJSONRepositories.mockReturnValue({
            names: null,
            adjectives: [ 'a1' ],
            blackList: [],
            historical: []
        });
        const result = generateReleaseName();
        expect(result).toEqual(emptyAlertMessage);
    });
    test('When names are empty should print the empty alert message', () => {
        namesRepository.getAllJSONRepositories.mockReturnValue({
            names: [],
            adjectives: [ 'a1' ],
            blackList: [],
            historical: []
        });
        const result = generateReleaseName();
        expect(result).toEqual(emptyAlertMessage);
    });
    test('When adjectives are null should print the empty alert message', () => {
        namesRepository.getAllJSONRepositories.mockReturnValue({
            names: [ 'n1' ],
            adjectives: null,
            blackList: [],
            historical: []
        });
        const result = generateReleaseName();
        expect(result).toEqual(emptyAlertMessage);
    });
    test('When adjectives are empty should print the empty alert message', () => {
        namesRepository.getAllJSONRepositories.mockReturnValue({
            names: [ 'n1' ],
            adjectives: [],
            blackList: [],
            historical: []
        });
        const result = generateReleaseName();
        expect(result).toEqual(emptyAlertMessage);
    });
});
