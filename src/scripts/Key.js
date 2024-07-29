import { createElement } from "./helpers.js";

class Key {
  constructor(container, keyData, /*audio*/) {
    this.container = container;
    this.data = keyData;
    const keyButton = createElement('div', 'key');

    const text = (Object.keys(this.data)[0]);
    this.color = this.data.color;
    const key = Object.keys(this.data)[0]

    this.finger = (this.data[key].finger);
    this.color = (this.data[key].color);
    this.size = this.data[key].size;

    console.log(this.finger, this.color)
    keyButton.textContent = text;
    this.container.keys.push(keyButton);


    keyButton.style.width = `${this.size * 4.2}rem`;
    if (keyButton.textContent === 'Backspace' || keyButton.textContent === 'Caps Lock') {
      keyButton.style.fontSize = "1rem";
    }

    this.container.keysWrapper.append(keyButton);

    // ToDo: add audio
  }    

}


export default Key;