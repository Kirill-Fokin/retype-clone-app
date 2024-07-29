const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

const createElement = (tagName, ...classNames) => {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
  
    return element;
  };

export {
    getRandomNumber, 
    createElement
};
  