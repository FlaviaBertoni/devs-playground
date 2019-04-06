import getRandomItemOfArray from './getRandomItemOfArray';

const isNameValid = (blackList, history, name) => {
    return blackList.filter((n) => { return n === name }).length === 0
        && history.filter((n) => { return n === name }).length === 0;
};

const getRandomName = (names, adjectives, blackList, history) => {
    const name = getRandomItemOfArray(names) + " " + getRandomItemOfArray(adjectives);
    return isNameValid(blackList, history, name)
        ? name
        : getRandomName(names, adjectives, blackList, history);
};

export default getRandomName;
