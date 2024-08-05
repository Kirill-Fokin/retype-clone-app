import { createElement, getColor } from "./helpers.js";
import { rusKeys } from "./key-config.js";
import Key from "./Key.js";

export default class Keyboard {
  constructor(container) {
    this.container = container;
    this.keys = [];
    this.render();
  }

  addColors() {
    this.keys.forEach(keyObj => {
      getColor(keyObj.keyButton, keyObj.finger + "");
    })
  }

   removeColors() {
    this.keys.forEach(keysObj => {
      keysObj.keyButton.classList.remove("orange", "violet", "green", "orange", "blue", "yelow", "light-gray" );
    })
   }

  render() {
    this.board = createElement("div", "keyboard-container", "fade");
    setTimeout(() => this.board.classList.remove("fade"), 200);

    for (let i = 0; i < rusKeys.length; i++) {
      const key = new Key(this, rusKeys[i]);
      this.keys.push(key);
    }    
    this.container.append(this.board);
  }
}