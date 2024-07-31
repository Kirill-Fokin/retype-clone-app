import { createElement } from "./helpers.js";


export default class TextPanel {
  constructor(contianer) {
    this.container = this.container;
    // this.advice = advice;
    this.letter = null;

    this.init();
  }


  init() {
    this.textPanel = createElement('div', "text-panel");
    this.textInp = createElement('input', "text-inp");
    this.textInp.type = "text";
    this.subText = createElement("div", "subtext");
    
    this.textPanel.append(this.textInp, this.subText);
    document.querySelector(".app").append(this.textPanel);
  }

  clear() {
    this.advice.textContent = '';
    // i ll need to add by letter
  }

  update(data) {
    if (data.length < 10)  {

    } else {

    }

    // check(letter) {
    //   return 
    // }
  }
  
 


}

