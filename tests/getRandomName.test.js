import getRandomName from '../src/getRandomName';
import getRandomItemOfArray from '../src/getRandomItemOfArray';
jest.mock('../src/getRandomItemOfArray', () => jest.fn());

const names = [ 'n1', 'n2'];
const adjectives = ['a1', 'a2'];
const blackList = ['n1 a1'];
const historical = ['n1 a2'];

describe('When getRandomName is called', () => {
    test('Should call getRandomItemOfArray with names', () => {
        getRandomName(names,
            adjectives,
            blackList,
            historical
        );
        expect(getRandomItemOfArray).toHaveBeenCalledWith(names);
    });
    test('Should call getRandomItemOfArray with adjectives', () => {
        getRandomName(names,
            adjectives,
            blackList,
            historical
        );
        expect(getRandomItemOfArray).toHaveBeenCalledWith(adjectives);
    });
    test('Should return a result with a name and adjective', () => {
        getRandomName(names,
            adjectives,
            blackList,
            historical
        );
        expect(getRandomItemOfArray).toHaveBeenCalledWith(adjectives);
    });
});
