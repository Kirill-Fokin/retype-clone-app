import { createElement, getRandomNumber } from "./helpers.js";

export default class TextPanel {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;
    this.nextLetter = null;
    
    this.initPanel();
    this.textInp.addEventListener('input', () => this.checkLetter());
    // TODO focus change on input
  }

  checkLetter() {
    const lastInpLetter =  this.textInp.value[this.textInp.value.length - 1];
    // добавить поддержку пробела

    if (lastInpLetter !==  this.nextLetter) {
      setTimeout(() => {
        const currenValue = this.textInp.value;
        this.textInp.value = currenValue.slice(0, -1);
      }, 300)
    } else {
      if (this.sentence.textContent.length === 1) {
        console.log('последняя буква');
        this.parent.changeWord() 
      } else {
        this.changeLetter() 
      }
      
      
      
    }

    
  }


  isFinalLetter() {
    if (this.sentence.textContent.length === 1) {
      this.parent.changeWord() 
    }
  }


  changeLetter() {
    const firstSubtextLetter = this.sentence.textContent[0];
    console.log(firstSubtextLetter);
    this.sentence.textContent = this.sentence.textContent.slice(1);
    console.log(this.sentence.textContent);
    this.subTextChecked.textContent  +=  firstSubtextLetter;
    this.nextLetter = this.sentence.textContent[0];
  }
  
  initPanel() {
    this.textPanel = createElement('div', "text-panel");
    this.textInp = createElement('input', "text-inp");
    this.textInp.setAttribute('autofocus', '');
    this.textInp.type = "text";
    this.subTextChecked = createElement("span", "checked");
    this.subText = createElement("div", "subtext");
    document.querySelector(".app").append(this.textPanel);
  }

  clear() {
   this.textInp.value = '';
  }

  updateData(data) {
    this.textPanel.prepend(this.textInp,  this.subText);
    this.sentence = createElement("span", "sentence");
    this.subText.append(this.subTextChecked, this.sentence);
    const word = (data.rus1[getRandomNumber(0, data.rus1.length - 1)]);

    let i = 0;
    while (this.sentence.textContent.length < 50) {
      if (i == 0) {
        this.sentence.textContent += `${word}`
      } else {
        this.sentence.textContent += ` ${word}`
      }
      i++;
    }

    if (this.sentence.textContent.length > 50) {
      this.sentence.textContent =  this.sentence.textContent.slice(0, this.sentence.textContent.length - word.length);
    }
      this.nextLetter = this.sentence.textContent.slice(0, 1);
      console.log(this.nextLetter)
  }
}