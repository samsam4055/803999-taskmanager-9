const getRandomNumber = (max, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const shuffleList = (list) => {
  const array = Array.from(list);
  for (let i = 0; i < array.length; i++) {
    const j = getRandomNumber(i + 1);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
const getRandomElement = (arr) => {
  return arr[getRandomNumber(arr.length - 1)];
};
const getRandomBoolean = () => {
  return Boolean(Math.round(Math.random()));
};

export {getRandomNumber, shuffleList, getRandomElement, getRandomBoolean};