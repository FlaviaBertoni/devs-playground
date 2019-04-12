import fs from 'fs';
import { writeHistory, getAllJSONRepositories } from '../src/namesRepository';
import { directoryRepositoryPath, historyRepositoryPath, namesRepositoryPath } from "../config";

jest.mock('fs', () => ({
    writeFile: jest.fn((fileName, data, callback) => callback()),
    readFileSync: jest.fn(),
    existsSync: jest.fn(() => true),
    mkdirSync: jest.fn()
}));

describe('When writeHistory is called', () => {
    beforeAll(() => {
        console.error = jest.fn();
    });

    it('Should call writeFile with historyRepositoryPath and a json string param', () => {
        const json = ['name 1', 'name 2'];
        writeHistory(json);
        expect(fs.writeFile).toHaveBeenCalledWith(
            historyRepositoryPath,
            JSON.stringify(json),
            expect.any(Function)
        );
        expect(console.error).not.toHaveBeenCalled();
    });

    it('When an error is returned it should log an error', () => {
        const error = new Error('failed to write file');
        fs.writeFile = (fileName, data, callback) => {
            callback(error);
        };
        writeHistory([]);
        expect(console.error).toHaveBeenCalledWith(error);
    });
});

describe('When getAllJSONRepositories is called', () => {
    const names =  { names: ['name 1', 'name 2'], adjectives: ['adjective 1', 'adjective 2'], blackList: ['name 1 adjective 2'] };
    const history = ['name 1 adjective 1'];

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

    it('Should return a JSON with names, adjectives, blacklist and history', () => {
        const result = getAllJSONRepositories();
        expect(result).toEqual({
            names: names.names,
            adjectives: names.adjectives,
            blackList: names.blackList,
            history: history,
        });
    });

    it('When the respository directory does not exists it should create it', () => {
        fs.existsSync.mockReturnValue(false);
        getAllJSONRepositories();
        expect(fs.mkdirSync).toHaveBeenCalledWith(directoryRepositoryPath);
    });

    it('When the respository directory exists it should not recreate it', () => {
        fs.existsSync.mockReturnValueOnce(false)
                     .mockReturnValue(true);
        getAllJSONRepositories();
        expect(fs.mkdirSync).not.toHaveBeenCalledWith(directoryRepositoryPath);
    });

    it('When the names respository does not exists it should create and initialize it', () => {
        fs.existsSync.mockReturnValue(false);
        fs.writeFile = jest.fn((fileName, data, callback) => { callback() });
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

    it('When history respository does not exists it should return an empty array', () => {
        fs.existsSync.mockReturnValue(false);
        const result = getAllJSONRepositories();
        expect(result).toEqual(expect.objectContaining([]));
    });

    it('When an error is returned on writeFile it should log an error', () => {
        const error = new Error('failed to write file');
        fs.writeFile = (fileName, data, callback) => {
            callback(error);
        };
        getAllJSONRepositories();
        expect(console.error).toHaveBeenCalledWith(error);
    });
});
