import { createElement, getRandomNumber } from "./helpers.js";

 


export default class TextPanel {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;
    // this.advice = advice;
    this.letter = null;

    this.initPanel();
  }

  checkLetter() {
  }
  
  initPanel() {
    this.textPanel = createElement('div', "text-panel");
    this.textInp = createElement('input', "text-inp");
    this.textInp.type = "text";
    this.subText = createElement("div", "subtext");
    document.querySelector(".app").append(this.textPanel);
    
  }

  clear() {
    this.advice.textContent = '';
    // i ll need to add by letter
  }

  update(data) {
    this.subTextChecked = createElement("span", "checked");
    this.textPanel.prepend(this.textInp, this.subText);
    this.sentence = createElement("span", "sentence");
    this.subText.append(this.subTextChecked, this.sentence);
    const word = (data.rus1[getRandomNumber(0,data.rus1.length - 1)]);
    let i = 0;

    while (this.sentence.textContent.length < 50) {
      this.sentence.textContent += ` ${word}`
      i++;
    }

    if (this.sentence.textContent.length > 50) {
      this.sentence.textContent =  this.sentence.textContent
                                                .slice(0, this.sentence.textContent.length - word.length);
    }
    
    this.nextLetter = this.sentence.textContent.slice(0,2);
    console.log(this.nextLetter)
    this.parent.setCorrectKey("А");
  }
}