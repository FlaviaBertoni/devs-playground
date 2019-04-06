import { updateHistorical, getAllJSONRepositories } from '../src/namesRepository';
import { dirRepository, historicalRepository, namesRepository } from "../config";
import fs from 'fs';
jest.mock('fs', () => ({
    writeFile: jest.fn((p1, p2, callback) => callback()),
    readFileSync: jest.fn(),
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn()
}));

describe('When updateHistorical is called', () => {
    test('Should call writeFile with historicalRepository and json string param', () => {
        const spyConsoleError = jest.spyOn(console, 'error');
        const json = [ 'n 1', 'n 2'];
        updateHistorical(json);
        expect(fs.writeFile).toHaveBeenCalledWith(
            historicalRepository,
            JSON.stringify(json),
            expect.any(Function)
        );
        expect(spyConsoleError).not.toHaveBeenCalled();
    });
    test('When an error is returned should log error', () => {
        const spyConsoleError = jest.spyOn(console, 'error');
        const error = new Error('write file fail');
        fs.writeFile = (p1, p2, callback) => {
            callback(error);
        };
        updateHistorical([]);
        expect(spyConsoleError).toHaveBeenCalledWith(error);
    });
});

describe('When getAllJSONRepositories is called', () => {
    const names =  { names: ['n1', 'n2'], adjectives: ['a1', 'a2'], blackList: ['n1 a2'] };
    const historical = ['n1 a1'];
    const spyConsoleError = jest.spyOn(console, 'error');

    beforeEach(() => {
        fs.writeFile = jest.fn();
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
    test('When dir respository do not exists should create it', () => {
        fs.existsSync.mockReturnValue(false);
        getAllJSONRepositories();
        expect(fs.mkdirSync).toHaveBeenCalledWith(dirRepository);
    });
    test('When dir respository exists should not create it', () => {
        fs.existsSync.mockReturnValueOnce(false)
                     .mockReturnValue(true);
        getAllJSONRepositories();
        expect(fs.mkdirSync).not.toHaveBeenCalledWith(dirRepository);
    });
    test('When names respository do not exists should create and initialize it', () => {
        fs.existsSync.mockReturnValue(false);
        fs.writeFile = jest.fn((p1, p2, callback) => { callback() });
        getAllJSONRepositories();
        expect(fs.writeFile).toHaveBeenCalledWith(
            namesRepository,
            JSON.stringify({
                    names: [],
                    adjectives: [],
                    blackList: []
                }
            ),
            expect.any(Function)
        );
        expect(spyConsoleError).not.toHaveBeenCalled();
    });
    test('When historical respository do not exists should return empty array', () => {
        fs.existsSync.mockReturnValue(false);
        const result = getAllJSONRepositories();
        expect(result).toEqual(expect.objectContaining([]));
    });
    test('When an error is returned on writeFile should log error', () => {
        const error = new Error('write file fail');
        fs.writeFile = (p1, p2, callback) => {
            callback(error);
        };
        getAllJSONRepositories();
        expect(spyConsoleError).toHaveBeenCalledWith(error);
    });
});
