import getRandomItemOfArray from './getRandomItemOfArray';

const isNameValid = (blackList, historical, name) => {
    return blackList.filter((n) => { return n === name }).length === 0
        && historical.filter((n) => { return n === name }).length === 0;
};

const getRandomName = (names, adjectives, blackList, historical) => {
    const name = getRandomItemOfArray(names) + " " + getRandomItemOfArray(adjectives);
    return isNameValid(blackList, historical, name)
        ? name
        : getRandomName(names, adjectives, blackList, historical);
};

export default getRandomName;
