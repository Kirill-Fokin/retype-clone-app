import { createElement, getColor } from "./helpers.js";
import Key from "./Key.js";

export default class Keyboard {
  constructor(container , keysConfig, parent) {
    console.log(container)
    this.container = container;
    this.parent = parent;
    this.keysConfig = keysConfig;
    this.prev = null;
    this.counter = 0;
    this.keys = [];

    this.render();
  }

  addColors() {
    this.keys.forEach(keyObj => {
      getColor(keyObj.keyButton, keyObj.finger + "");
    });
  }

  setUpHand() {
    let sentence = document.querySelector(".sentence").textContent;

    this.keys.filter((el) => { 
      if (el.text.toUpperCase()=== sentence[0].toUpperCase()|| (el.text === "Whitespace" && sentence[0] === " " )) {
        el.openHand()
      }
    });
  }

   removeColors() {
     this.keys.forEach(keysObj => {
       keysObj.keyButton.classList.remove("orange", "violet", "green", "orange", "blue", "yelow", "light-gray");
    });
   }

  render() {
    if (document.querySelector(".keyboard-container") !== null) {
      document.querySelector(".keyboard-container").remove();
      this.counter = 0;
      this.keys.length = 0;
      this.prev = null;
    }

    this.board = createElement("div", "keyboard-container", "fade");
    setTimeout(() => this.board.classList.remove("fade"), 200);

    for (let i = 0; i < this.keysConfig.length; i++) {
      const key = new Key(this, this.keysConfig[i]);
      this.keys.push(key);
    }    
    this.container.append(this.board);
  }
}