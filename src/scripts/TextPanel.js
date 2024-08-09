import { createElement, getRandomNumber, getSimpleAnimated} from "./helpers.js";
import Stopwatch from "./stopwatch.js";

export default class TextPanel {
  constructor(container, parent) {
    this.container = container;
    this.parent = parent;
    this.nextLetter = null;
    this.letters = 0;
    this.failures = 0;
    this.initPanel();
    this._errors = 0;
    //
    this._pressedSymbols = 0;
    this.stopWach = new Stopwatch();
    this.stopWach.start();

    this.speedText = document.querySelector(".speed-text");
    this.speedText.textContent = 0;
    
    this.textInp.addEventListener('input', () => this.checkLetter());
    this.textInp.addEventListener('click', () => this.highlightMistake());
  }


  clearStatisic() {
    this.stopWach.reset()
    this.errPercent =
    this._pressedSymbols = 0;
    this.speedText.textContent = 0;
    this.countspeedText()

    document.querySelector(".err-text").textContent  = 0
  }

  countspeedText() {
    const time = this.stopWach.getData()
    const symbCounter = this.lettersCounter;

    return  Math.round(symbCounter / time * 60);
  }

  checkLetter() {
    this._pressedSymbols++;
    const lastInpLetter =  this.textInp.value.slice(-1);
    if (lastInpLetter !==  this.nextLetter) {
      this._errors++;

      setTimeout(() => {
        const currenValue = this.textInp.value;
        this.highlightMistake() 
        this.textInp.value = currenValue.slice(0, -1);
      }, 200)
      } else {
      if (this.sentence.textContent.length === 1) {
        this.clear();
      } else {
        this.changeLetter() 
      }
    }
    console.log('доходит', this.errPercent)
    document.querySelector(".err-text").textContent =  this.errPercent + '%';
  }
  
  set errPercent(val) {
    this._errors = val;
    this._pressedSymbols = val;
    document.querySelector(".err-text").textContent = 0;
  }

  get lettersCounter() {
    if (this._pressedSymbols ) {
      return this._pressedSymbols - this._errors;
    }
    return 0;
  }


   

  get errPercent() {
    return Math.ceil(this._errors * (100 / this._pressedSymbols));
  }

  changeLetter() {
    this.speedText.textContent  = this.countspeedText()
    
    const firstSubtextLetter = this.sentence.textContent[0];
    this.sentence.textContent = this.sentence.textContent.slice(1);
    this.subTextChecked.textContent  += firstSubtextLetter;
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
    this.textPanel.append(document.querySelector(".additional-settings"));
  }

  clear() {
    this.sentence.textContent = '';
    this.parent.changeWord();
    this.subTextChecked.textContent = '';
    this.textInp.value = '';
    getSimpleAnimated(this.textInp, "green", 200) 
  }

  highlightMistake() {
    this.sentence.style.color = "red";
    this.textInp.style.backgroundColor = "yellow";
    setTimeout(() => this.textInp.style.backgroundColor = "unset", 200);
    setTimeout(() => this.sentence.style.color = "white", 200);
    
  }

  updateData(data) {
    if (this.parent.level === "sentence") {
      const word = (data.rus2[getRandomNumber(0, data.rus2.length - 1)]);
      this.sentence.textContent = word;
    } else  {

      console.log('kjk')
      this.sentence.textContent = ""
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
      // this.sentence.textContent  = 
    }
      this.nextLetter = this.sentence.textContent.slice(0, 1);
    }
}