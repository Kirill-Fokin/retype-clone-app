import { createElement } from "./helpers.js";
import Key from "./Key.js";
import Keyboard from "./keyboard.js";
import TextPanel from "./TextPanel.js";

class App {

  constructor (
    keysConfig, 
    level = "1",
    languagePack= "rus"
  ) {  
    this.textPanel = new TextPanel(document.querySelector(".app"), this);
    this.fetchData('/data.json')
    this.keysConfig = keysConfig;
    this.keyboard = new Keyboard(document.querySelector(".app"));
    this.keys = [];
    // this.initKeyboard(this.keysConfig);

    
    // document.addEventListener("keydown", (e) => {
    //   console.log(e.key + ' нажато')
    //   if (this.checkKeyDown(e)) {
    //     console.log('corret button');
    //   } else {
    //     console.log('incorret button');
    //   } 
    // })


    document.addEventListener("keydown", (e) => this.checkKeyDown(e))

    
  }


  setKeyHand() {

  }

  checkKeyDown (e) {
   console.log(e.key)

   this.keyboard.keys.forEach(function(el) {
    console.log(el[4], e.key.toUpperCase())
     if (el[4] === e.key.toUpperCase()) {
      console.log(el[0].classList.add("green"))
      console.log('trueth')
     }
   } 
   )



    // return e.key === this.nextLetter.toLowerCase().trim();
  }


  // initKeyboard(keysConfig) {
    // this.keyBoardWrapper = createElement("div", "keyboard-container", "fade" );
    // setTimeout(() => this.keyBoardWrapper.classList.remove("fade"), 200);
    
      
  //   keysConfig.forEach((obj, indx) => {
  //     const key = new Key(this, this.keysConfig[indx]);
  //   });
  // }

  fetchData(dataUrl) {

  fetch(dataUrl)
   .then(response => {

     if (!response.ok) {
       throw new Error('Ошибка в fetch' + response.status.Text);
     }
     return response.json();
   })
     .then(jsonData => {
      this.textPanel.update(jsonData);
        
      }    
     // .catch(error => console.error('Ошибка при исполнении запросп : ', error))

   )

  }
  deleteKeyboard() {
    this.keyBoardWrapper.classList.add('fade')
  }
}

export default App;