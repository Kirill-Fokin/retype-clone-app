import { createElement } from "./helpers.js";
import { rusKeys } from "./key-config.js";
import Key from "./Key.js";

export default class Keyboard {
  constructor(container, parent) {
    this.container = container;

    this.keys = [];
    this.render();
  }

  render() {
    this.board = createElement("div", "keyboard-container", "fade");
    setTimeout(() => this.board.classList.remove("fade"), 200);
    
    const  rusKeysKeys = (rusKeys.map(obj => Object.keys(obj)[0]));

    for (let i = 0; i < rusKeys.length; i++) {
      const key = new Key(this, rusKeys[i]);
      this.keys.push(key);
    }
    
    this.container.append(this.board);
  }
}