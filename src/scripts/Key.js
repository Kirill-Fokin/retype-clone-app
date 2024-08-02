import { createElement } from "./helpers.js";

class Key {
  constructor(container, keyData) {
    this.container = container;
    this.data = keyData;

    this.render()
    // ToDo: addaudio
  }    

  render() {
    const keyButton = createElement('div', 'key');

    const text = (Object.keys(this.data)[0]);
    keyButton.textContent = text;

    const key = Object.keys(this.data)[0]    

    this.finger = (this.data[key]).finger;
    this.color = (this.data[key]).color;
    this.size = (this.data[key]).size;

    this.container.keys.push([keyButton, this.finger, this.color, this.size, this.text])

    keyButton.style.width = `${this.size * 4.2}rem`;
    if (keyButton.textContent === 'Backspace' || keyButton.textContent === 'Caps Lock') {
      keyButton.style.fontSize = "1rem";
    }
  }

  addCoordinates() {
    // switch color 
  }
}

export default Key;