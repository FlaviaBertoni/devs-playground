const getRandomItemOfArray = (array) => {
    const size = array.length;
    const randomIndex = Math.floor(Math.random() * size);
    return array[randomIndex];
};

export default getRandomItemOfArray;
