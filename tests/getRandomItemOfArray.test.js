import getRandomItemOfArray from '../src/getRandomItemOfArray';

describe('When getRandomItemOfArray is called', () => {
    it('Should return any item of array', () => {
        const array = [1, 2, 3];
        expect(getRandomItemOfArray(array)).toEqual(expect.any(Number));
    });
    it('Shoul return the 3th element of array', () => {
        global.Math.random = () => 0.5;

        const array = ['a', 'b', 'c', 'd'];
        expect(getRandomItemOfArray(array)).toEqual('c');
    });
});
