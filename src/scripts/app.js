import { createElement, setLocalStorage } from "./helpers.js";
import Keyboard from "./keyboard.js";
import TextPanel from "./TextPanel.js";
import Key from "./Key.js";

class App {

  constructor (
    keysConfig, 
    level = "1",
    languagePack= "rus",
    _isFocus = "false",
    _speed = null,
    _mistakes = null,
  ) {  
    this.textPanel = new TextPanel(document.querySelector(".app"), this);
    this.fetchData("/data.json");
    this.keysConfig = keysConfig;
    this.keyboard = new Keyboard(document.querySelector(".app"));
    this.keys = [];
    document.addEventListener("keydown", e => {

     Key.defineKey(e, this);
      // make parametr isActive that reacts on input focus
    });

   window.addEventListener("beforeunload", () => {  
      console.log('sended');
      setLocalStorage  ("safe", JSON.stringify({data : "kek"}));
     // отправка состояния игры
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

  checkKeyDown(keyName) {
    console.log(this)
   this.keyboard.keys.forEach( keyObj => {
    console.log(keyName.toUpperCase())
      if(keyObj.text.toUpperCase() === keyName.toUpperCase()) {
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