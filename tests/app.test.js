jest.mock('../src/generateReleaseName', () => jest.fn(() => 'Release name'));

describe('When app is imported', () => {
    beforeEach(() => {
        console.log = jest.fn();
        require('../src/app');
    });
    it('Should log the generated release name', () => {
        expect(console.log).toHaveBeenCalledWith('Release name');
    });
});
