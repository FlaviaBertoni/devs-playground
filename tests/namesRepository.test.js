import { updateHistorical, getAllJSONRepositories } from '../src/namesRepository';
import { historicalRepository, namesRepository } from "../src/config";
import fs from 'fs';
jest.mock('fs', () => ({ writeFile: jest.fn(), readFileSync: jest.fn() }));

describe('When updateHistorical is called', () => {
    test('Should call writeFile with historicalRepository and json string param', () => {
        const json = [ 'n 1', 'n 2'];
        updateHistorical(json);
        expect(fs.writeFile).toHaveBeenCalledWith(
            historicalRepository,
            JSON.stringify(json),
            'utf8',
            expect.any(Function)
        );
    });
});

describe('When getAllJSONRepositories is called', () => {
    const names =  { names: ['n1', 'n2'], adjectives: ['a1', 'a2'], blackList: ['n1 a2'] };
    const historical = { names: ['n1 a1']};
    beforeEach(() => {
        fs.readFileSync.mockReturnValueOnce(JSON.stringify(names))
                        .mockReturnValue(JSON.stringify(historical));
    });
    test('Should call readFileSync with namesRepository', () => {
        getAllJSONRepositories();
        expect(fs.readFileSync).toHaveBeenCalledWith(namesRepository);
    });
    test('Should call readFileSync with historicalRepository', () => {
        getAllJSONRepositories();
        expect(fs.readFileSync).toHaveBeenCalledWith(historicalRepository);
    });
    test('Should return an json with names, adjectives, blacklist and historical', () => {
        const result = getAllJSONRepositories();
        expect(result).toEqual({
            names: names.names,
            adjectives: names.adjectives,
            blackList: names.blackList,
            historical,
        });
    });
});
