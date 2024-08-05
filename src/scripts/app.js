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
    _colors = false,
    _isKeyboard = true,
  ) {  
    this.textPanel = new TextPanel(document.querySelector(".app"), this);
    this.fetchData("/data.json");
    this.keysConfig = keysConfig;
    this.keyboard = new Keyboard(document.querySelector(".app"));
    this.keys = [];

    this.colorButton = document.querySelector(".paint")
    this.boardButton = document.querySelector(".keyboard-add")

    this.boardButton.addEventListener('click', () => this.isKeyboard = this.isKeyboard)
    this.colorButton.addEventListener('click', () => this.colors = this.colors)
    
    this.textPanel.textPanel.append(document.querySelector(".additional-settings"));
    document.addEventListener("keypress", e => {
      console.log(e);
      Key.defineKey(e, this);
     });


       
   window.addEventListener("beforeunload", () => {  
      console.log('sended');
      setLocalStorage  ("safe", JSON.stringify({data : "kek"}));
     // отправка состояния игры
  });
  }


  set isKeyboard (value) {
     if (value) {
      this._isKeyboard = true;
      this.keyboard.board.classList.add('none')
     } else {
      this._isKeyboard = false;
      this.keyboard.board.classList.remove('none')
     }
  }

  get isKeyboard() {
    return !this._isKeyboard;
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

  get colors() {
    return !this._colors ;
  }



  set colors (value) {
   console.log(value)
    if (value) { 
      this._colors = true;
      this.keyboard.addColors()
    } else {
      this._colors = false;
      this.keyboard.removeColors()
    }
  }

  checkKeyDown(keyName) {

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