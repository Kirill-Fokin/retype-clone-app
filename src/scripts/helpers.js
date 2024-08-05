const getRandomNumber = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  
  return Math.floor(rand);
}


const getColor = (elem, finger) => {
   console.log('work')
    switch (finger) {
      case "1":
      elem.classList.add('violet');
      break;
      case "2":
        elem.classList.add('blue')
      break;
      case "3":
        elem.classList.add('green')
      break;
      case "4":
        elem.classList.add('orange')
      break;
      case "5":
        elem.classList.add('yelow')
      break;
      case "6":
        elem.classList.add('green')
      break;
      case "7":
        elem.classList.add('blue')
      break;
      case "8":
        elem.classList.add('violet')
      break;
      case "10":
        elem.classList.add('light-gray')
      break;
    }
}






const createElement = (tagName, ...classNames) => {
    const element = document.createElement(tagName);
    element.classList.add(...classNames);
  
    return element;
  };


  const setLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getLocalStorage = key => localStorage.getItem(key);

export {
    getRandomNumber, 
    createElement, 
    setLocalStorage, 
    getLocalStorage,
    getColor

};
  