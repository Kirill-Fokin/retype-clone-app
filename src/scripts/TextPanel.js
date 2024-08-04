import { createElement, getRandomNumber } from "./helpers.js";

export default class TextPanel {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;
    this.nextLetter = null;

    this.initPanel();
    this.textInp.addEventListener('input', () => this.checkLetter());
  }

  checkLetter() {
    const lastInpLetter =  this.textInp.value.slice(-1);
    // добавить поддержку пробела



    if (lastInpLetter !==  this.nextLetter) {

      setTimeout(() => {
        const currenValue = this.textInp.value;
        this.textInp.value = currenValue.slice(0, -1);
      }, 200)
    } else {
      if (this.sentence.textContent.length === 1) {
        this.parent.changeWord() 
        this.subTextChecked.textContent = '';
        this.textInp.value = '';
      } else {
        this.changeLetter() 
      }
    }
  }

  changeLetter() {
    const firstSubtextLetter = this.sentence.textContent[0];
    this.sentence.textContent = this.sentence.textContent.slice(1);
    this.subTextChecked.textContent  +=  firstSubtextLetter;
    this.nextLetter = this.sentence.textContent[0];
  }
  
  initPanel() {
    this.textPanel = createElement('div', "text-panel");
    this.textInp = createElement('input', "text-inp");
    this.textInp.setAttribute('autofocus', '');
    this.textInp.setAttribute('outline', 'none');
    this.textInp.type = "text";
    this.subTextChecked = createElement("span", "checked");
    this.subText = createElement("div", "subtext");
    document.querySelector(".app").append(this.textPanel);

    this.textPanel.prepend(this.textInp,  this.subText);
    this.sentence = createElement("span", "sentence");
    this.subText.append(this.subTextChecked, this.sentence);
  }

  clear() {
   this.textInp.value = '';
  }

  updateData(data) {
    const word = (data.rus1[getRandomNumber(0, data.rus1.length - 1)]);

    let i = 0;
    while (this.sentence.textContent.length < 10) {
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
  }
}