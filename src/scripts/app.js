import { createElement } from "./helpers.js";
import Key from "./Key.js";
import Keyboard from "./keyboard.js";
import TextPanel from "./TextPanel.js";

class App {

  constructor (
    keysConfig, 
    level = "1",
    languagePack= "rus",
    _isFocus = "false",
  ) {  
    this.textPanel = new TextPanel(document.querySelector(".app"), this);
    this.fetchData("/data.json");
    this.keysConfig = keysConfig;
    this.keyboard = new Keyboard(document.querySelector(".app"));
    this.keys = [];
    document.addEventListener("keydown", (e) => {
      (e.key === "Backspace") ? e.preventDefault() : this.checkKeyDown(e);
      // make parametr isActive that reacts on input focus
    });
  }
  
  set isFocus(value) {
     value == true ? this.keyboard.board.classList.remove('none') : this.keyboard.board.classList.add('none');
   }

   get isFocus() {
     return _isFocus;
   }

  changeWord() {
    this.fetchData('/data.json');
  }

  checkKeyDown(e) {
   this.keyboard.keys.forEach(keyObj => {

      if(keyObj.text === e.key.toUpperCase()) {
        keyObj.highLightCorrect();
      } 
   });
  }

  fetchData(dataUrl) {
    
  fetch(dataUrl)
   .then(response => {

     if (!response.ok) {
       throw new Error('Ошибка в fetch' + response.status.Text);
     }
     return response.json();
   })
     .then(jsonData => {
      this.textPanel.updateData(jsonData);
    });
  }
}

export default App;