import { createElement, getColor } from "./helpers.js";
import { rusKeys } from "./key-config.js";
import Key from "./Key.js";

export default class Keyboard {
  constructor(container) {
    this.container = container;
    this.keys = [];
    this.render();
    this.counter = 0;
    
    setTimeout(() => this.setUpHand(), 500);
    
  }

  addColors() {
    this.keys.forEach(keyObj => {
      getColor(keyObj.keyButton, keyObj.finger + "");
    });
  }

  setUpHand() {
    if (this.prev) {
      this.prev.classList.remove("pressed");
    }

    let num;
    // сверху костыль
    num = this.counter == 0 ? 0 : 1
    const litera = document.querySelector('.sentence').textContent[ num]

    this.keys.forEach(el => {
       if (el.text == litera.toUpperCase()) {
        console.log(el)
         el.keyButton.classList.add('pressed')
         this.prev = el.keyButton;
       }
    })
    this.counter++;
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