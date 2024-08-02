import { createElement } from "./helpers.js";
import Key from "./Key.js";
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
    this.keys = [];
    this.initKeyboard(this.keysConfig);

    
  }

setCorrectKey(keyName) {

  console.log(keyName)
  // let keyName = this.textPanel

  // console.log(keyName.texInp)
  
 

  console.log(Array.from(this.keys).filter((el) => el.textContent ===  keyName))

  Array.from(this.keys).filter((el) => el.textContent ===  keyName).forEach(el => {
    el.classList.add('gray')
    const handImage = createElement('div', 'hand');
    handImage.src = '/src/assets/images/hand.png'
    el.append(handImage )
    // доделать нужный палец
  })
 }

  initKeyboard(keysConfig) {
    this.keyBoardWrapper = createElement("div", "keyboard-container", "fade" );
    setTimeout(() => this.keyBoardWrapper.classList.remove("fade"), 200);
    
    document.querySelector(".app").append(this.keyBoardWrapper);    
    keysConfig.forEach((obj, indx) => {
      const key = new Key(this, this.keysConfig[indx]);
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