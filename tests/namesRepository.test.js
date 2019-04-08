import { writeHistory, getAllJSONRepositories } from '../src/namesRepository';
import { directoryRepositoryPath, historyRepositoryPath, namesRepositoryPath } from "../config";
import fs from 'fs';

jest.mock('fs', () => ({
    writeFile: jest.fn((p1, p2, callback) => callback()),
    readFileSync: jest.fn(),
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn()
}));

describe('When writeHistory is called', () => {
    beforeAll(() => {
        console.error = jest.fn();
    });

    it('Should call writeFile with historyRepositoryPath and a json string param', () => {
        const json = [ 'n 1', 'n 2'];
        writeHistory(json);
        expect(fs.writeFile).toHaveBeenCalledWith(
            historyRepositoryPath,
            JSON.stringify(json),
            expect.any(Function)
        );
        expect(console.error).not.toHaveBeenCalled();
    });
    it('When an error is returned should log error', () => {
        const error = new Error('write file fail');
        fs.writeFile = (p1, p2, callback) => {
            callback(error);
        };
        writeHistory([]);
        expect(console.error).toHaveBeenCalledWith(error);
    });
});

describe('When getAllJSONRepositories is called', () => {
    const names =  { names: ['n1', 'n2'], adjectives: ['a1', 'a2'], blackList: ['n1 a2'] };
    const history = ['n1 a1'];

    beforeEach(() => {
        fs.writeFile = jest.fn();
        fs.readFileSync.mockReturnValueOnce(JSON.stringify(names))
                        .mockReturnValue(JSON.stringify(history));
    });
    it('Should call readFileSync with namesRepositoryPath', () => {
        getAllJSONRepositories();
        expect(fs.readFileSync).toHaveBeenCalledWith(namesRepositoryPath);
    });
    it('Should call readFileSync with historyRepositoryPath', () => {
        getAllJSONRepositories();
        expect(fs.readFileSync).toHaveBeenCalledWith(historyRepositoryPath);
    });
    it('Should return an json with names, adjectives, blacklist and history', () => {
        const result = getAllJSONRepositories();
        expect(result).toEqual({
            names: names.names,
            adjectives: names.adjectives,
            blackList: names.blackList,
            history: history,
        });
    });
    it('When dir respository do not exists should create it', () => {
        fs.existsSync.mockReturnValue(false);
        getAllJSONRepositories();
        expect(fs.mkdirSync).toHaveBeenCalledWith(directoryRepositoryPath);
    });
    it('When dir respository exists should not create it', () => {
        fs.existsSync.mockReturnValueOnce(false)
                     .mockReturnValue(true);
        getAllJSONRepositories();
        expect(fs.mkdirSync).not.toHaveBeenCalledWith(directoryRepositoryPath);
    });
    it('When names respository do not exists should create and initialize it', () => {
        fs.existsSync.mockReturnValue(false);
        fs.writeFile = jest.fn((p1, p2, callback) => { callback() });
        getAllJSONRepositories();
        expect(fs.writeFile).toHaveBeenCalledWith(
            namesRepositoryPath,
            JSON.stringify({
                    names: [],
                    adjectives: [],
                    blackList: []
                }
            ),
            expect.any(Function)
        );
        expect(console.error).not.toHaveBeenCalled();
    });
    it('When history respository do not exists should return empty array', () => {
        fs.existsSync.mockReturnValue(false);
        const result = getAllJSONRepositories();
        expect(result).toEqual(expect.objectContaining([]));
    });
    it('When an error is returned on writeFile should log error', () => {
        const error = new Error('write file fail');
        fs.writeFile = (p1, p2, callback) => {
            callback(error);
        };
        getAllJSONRepositories();
        expect(console.error).toHaveBeenCalledWith(error);
    });
});
