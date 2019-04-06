import generateReleaseName from '../src/generateReleaseName';

jest.mock('../src/generateReleaseName', () => jest.fn());

describe('When app is imported', () => {
    beforeEach(() => {
        require('../src/app');
    });
    it('Should call generateReleaseName', () => {
        expect(generateReleaseName).toHaveBeenCalled();
    });
});
