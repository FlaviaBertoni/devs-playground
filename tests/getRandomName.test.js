import getRandomName from '../src/getRandomName';
import getRandomItemOfArray from '../src/getRandomItemOfArray';
jest.mock('../src/getRandomItemOfArray', () => jest.fn());

describe('When getRandomName is called', () => {
    it('Should call getRandomItemOfArray with names', () => {
        const names = [ 'n1', 'n2'];
        getRandomName(names, [], [], []);
        expect(getRandomItemOfArray).toHaveBeenCalledWith(names);
    });
    it('Should call getRandomItemOfArray with adjectives', () => {
        const adjectives = ['a1', 'a2'];
        getRandomName([], adjectives, [], []);
        expect(getRandomItemOfArray).toHaveBeenCalledWith(adjectives);
    });
    it('Should return a result with a name and adjective', () => {
        getRandomItemOfArray.mockReturnValueOnce('Nome')
                            .mockReturnValue('adjetivo');
        const result = getRandomName([], [], [], []);
        expect(result).toEqual("Nome adjetivo");
    });
    it('Should try again if random name is in blacklist', () => {
        getRandomItemOfArray.mockReturnValueOnce('Nome')
                            .mockReturnValueOnce('proibido')
                            .mockReturnValueOnce('Nome')
                            .mockReturnValue('permitido');
        const result = getRandomName([], [], ['Nome proibido'], []);
        expect(result).toEqual("Nome permitido");
    });
    it('Should try again if random name is already used', () => {
        getRandomItemOfArray.mockReturnValueOnce('Nome')
            .mockReturnValueOnce('usado')
            .mockReturnValueOnce('Nome')
            .mockReturnValue('novo');
        const result = getRandomName([], [], [], ['Nome usado']);
        expect(result).toEqual("Nome novo");
    });
});
