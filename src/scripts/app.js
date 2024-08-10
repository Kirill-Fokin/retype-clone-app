import { createElement, fetchData, setLocalStorage } from "./helpers.js";
import Keyboard from "./Keyboard.js";
import TextPanel from "./TextPanel.js";
import Key from "./Key.js";
import { rusKeys, engKeys} from "./key-config.js";

class App {

  constructor (
    keysConfig = rusKeys, 
    _isFocus = "false",
    _speed = null,
    _mistakes = null,
    _colors = false,
    _isKeyboard = true,
    _mute = false
    
  ) {
      this.level = "word";    
      this.keysConfig = keysConfig;  
      this.textPanel = new TextPanel(document.querySelector(".app"), this);

      this.mute = false;
      
      fetch("data.json")
        .then(response => {
          if (!response.ok) {         
            throw new Error('Ошибка в fetch' + response.status.Text);
          }
          return response.json();
          }).then(
             jsonData => {
               this.textPanel.updateData(jsonData);
             });
      
      this.keyboard = new Keyboard(document.querySelector(".app"), this.keysConfig, this);

      
      
      this.render();
      this.addListeners()
    }

    set mute (value) {
      this._mute = value;
    }

    get mute () {
      return this._mute;
    }

    render() {
      this.settingButton = document.querySelector('.settings-button');      
      this.colorButton = document.querySelector(".paint")
      this.boardButton = document.querySelector(".keyboard-add")
      this.refreshButton =  document.querySelector('.refresh__image');
      this.closeButton = document.querySelector(".close-button")
    }

    addListeners() {
      document.querySelector(".sound").addEventListener("click", () => this.mute = !this.mute)
      document.querySelector('.checkbox__inp').addEventListener("click", () => this.isFocus = !this.isFocus);
      this.boardButton.addEventListener('click', () => this.isKeyboard = this.isKeyboard);
      this.colorButton.addEventListener('click', () => this.colors = this.colors);
      document.addEventListener("keypress", e => Key.defineKey(e, this));
      this.refreshButton.addEventListener("click", () => {
        this.textPanel.clear()
        this.textPanel.clearStatisic()
      }); 

      window.addEventListener("beforeunload", () => setLocalStorage  ("safe", JSON.stringify({data : "kek"})));
      this.settingButton.addEventListener("click", () => document.querySelector(".settings").classList.remove("fade-out"));
      this.closeButton.addEventListener('click', () =>   document.querySelector(".settings").classList.add("fade-out"));
      document.querySelectorAll('.setting__subitem')[0].addEventListener('click', () => {this.changeWord('word')});
      document.querySelectorAll('.setting__subitem')[1].addEventListener('click', () => {this.changeWord('sentence')});
    }




  set isKeyboard (value) {
    if (value) {
      this._isKeyboard = true;
      this.keyboard.board.classList.add('none');
    } else {
      this._isKeyboard = false;
      this.keyboard.board.classList.remove('none');
    }
  }

  get isKeyboard() {
    return !this._isKeyboard;
  }
  
  set isFocus(value) {
    if (value) {
      this._isFocus = value;
      document.querySelector(".header").classList.add("blur");
      this.keyboard.board.classList.add("blur");
    } else {
      this._isFocus = value;
      this.keyboard.board.classList.remove("blur");
      document.querySelector(".header").classList.remove("blur");
    }
  }

  get isFocus() {
    return this._isFocus;
  }

  changeWord(level) {

    if (level === 'sentence') {
      
      this.level = "sentence"
    }

    if (level === 'word') {
      console.log('kek')
      this.level = "word";
    }
    fetch("data.json")
    .then(response => {
     
      if (!response.ok) {         
        throw new Error('Ошибка в fetch' + response.status.Text);
      }
      return response.json();
    }).then(
      jsonData => {
        this.textPanel.updateData(jsonData);
      });
  }

  get colors() {
    return !this._colors ;
  }

  set colors (value) {
    if (value) { 
      this._colors = true;
      this.keyboard.addColors()
    } else {
      this._colors = false;
      this.keyboard.removeColors()
    }
  }

  checkKeyDown(keyName) {
   this.keyboard.keys.forEach(keyObj => {
      if(keyObj.text.toUpperCase() === keyName.toUpperCase()) {
        keyObj.highLightCorrect();
      } 
   });
  }
}

export default App;