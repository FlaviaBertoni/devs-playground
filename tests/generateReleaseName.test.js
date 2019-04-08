import generateReleaseName from '../src/generateReleaseName';
import getRandomName from '../src/getRandomName';
import * as namesRepository from '../src/namesRepository';

jest.mock('../src/getRandomName', () => jest.fn(() => 'name1 adjective3'));
jest.mock('../src/namesRepository', () => ({
    getAllJSONRepositories: jest.fn( () => ({
        names: [ 'name1', 'name2', 'name3'],
        adjectives: [ 'adjective1', 'adjective2', 'adjective3' ],
        blackList: [ 'name1 adjective2' ],
        history: [ 'name1 adjective1' ]
    })),
    writeHistory: jest.fn(),
}));

describe('When randomizer is called', () => {
    const emptyAlertMessage = 'Não existe nenhum nome ou adjetivo cadastrado! ' +
        '\nPor favor adicione dados no aquivo names da pasta repository.';

    beforeAll(() => {
        console.log = jest.fn();
    });

    it('Should call getAllJSONRepositories', () => {
        generateReleaseName();
        expect(namesRepository.getAllJSONRepositories).toHaveBeenCalled();
    });

    it('Should call getRandomName with the values retrieved from repositories', () => {
        generateReleaseName();
        expect(getRandomName).toHaveBeenCalledWith(
            [ 'name1', 'name2', 'name3'],
            [ 'adjective1', 'adjective2', 'adjective3' ],
            [ 'name1 adjective2' ],
            [ 'name1 adjective1' ]
        );
    });

    it('Should call writeHistory with the updated history', () => {
        generateReleaseName();
        expect(namesRepository.writeHistory).toHaveBeenCalledWith(
            [ 'name1 adjective1' , 'name1 adjective3']
        );
    });

    it('Should log the generated name', () => {
        generateReleaseName();
        expect(console.log).toHaveBeenCalledWith('name1 adjective3');
    });

    describe('When all combinations are used', () => {
        beforeEach(() => {
            namesRepository.getAllJSONRepositories.mockReturnValue({
                names: [ 'name1' ],
                adjectives: [ 'adjective1', 'adjective2' ],
                blackList: [ 'name1 adjective1' ],
                history: [ 'name1 adjective2' ]
            });
        });
        it('Should log an alert message', () => {
            generateReleaseName();
            expect(console.log).toHaveBeenCalledWith('Todos os nomes já foram usados.');
        });
        it('Should not call getRandomName', () => {
            generateReleaseName();
            expect(getRandomName).not.toHaveBeenCalled();
        });
    });

    describe('When is not able to generate release name', () => {
        beforeEach(() => {
            namesRepository.getAllJSONRepositories.mockReturnValue({
                names: null,
                adjectives: [ 'adjective1' ],
                blackList: [],
                history: []
            });
        });

        it('Should not call getRandomName', () => {
            generateReleaseName();
            expect(getRandomName).not.toHaveBeenCalled();
        });

        it('When names are null it should log the empty alert message', () => {
            generateReleaseName();
            expect(console.log).toHaveBeenCalledWith(emptyAlertMessage);
        });

        it('When names are empty should log the empty alert message', () => {
            namesRepository.getAllJSONRepositories.mockReturnValue({
                names: [],
                adjectives: [ 'adjective1' ],
                blackList: [],
                history: []
            });
            generateReleaseName();
            expect(console.log).toHaveBeenCalledWith(emptyAlertMessage);
        });

        it('When adjectives are null it should log the empty alert message', () => {
            namesRepository.getAllJSONRepositories.mockReturnValue({
                names: [ 'name1' ],
                adjectives: null,
                blackList: [],
                history: []
            });
            generateReleaseName();
            expect(console.log).toHaveBeenCalledWith(emptyAlertMessage);
        });

        it('When adjectives are empty it should log the empty alert message', () => {
            namesRepository.getAllJSONRepositories.mockReturnValue({
                names: [ 'name1' ],
                adjectives: [],
                blackList: [],
                history: []
            });
            generateReleaseName();
            expect(console.log).toHaveBeenCalledWith(emptyAlertMessage);
        });
    });
});
