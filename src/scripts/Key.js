import { createElement, getColor } from "./helpers.js";


class Key {
  constructor(container, keyData) {
    this.container = container;
    this.data = keyData;

    this.render()
    // ToDo: addaudio
  }   

  static defineKey(event, parent) {
    console.log(event.key);
    switch (event.key) {
      case " ":
      parent.checkKeyDown('WHITESPACE');
      break;
      case "Backspace":
      event.preventDefault(); 
      parent.checkKeyDown('BACKSPACE');
      break;
      default : 
      parent.checkKeyDown(event.key)
      break;
    }
  }

  render() {
    this.keyButton = createElement('div', 'key');
    this.text = (Object.keys(this.data)[0]);
    this.keyButton.textContent = this.text;

    const key = Object.keys(this.data)[0];    

    this.finger = (this.data[key]).finger;
    this.color = (this.data[key]).color;
    this.size = (this.data[key]).size;

    this.keyButton.style.width = `${this.size * 4.2}rem`;
    if (this.keyButton.textContent === 'Backspace' || this.keyButton.textContent === 'Caps Lock') {
      this.keyButton.style.fontSize = "1rem";
    }
    this.container.board.append(this.keyButton);
  }

  highLightCorrect() {
    this.keyButton.classList.add('green');
    setTimeout(() => this.keyButton.classList.remove('green'), 500);
  }
}

export default Key;