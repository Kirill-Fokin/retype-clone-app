import { createElement } from "./helpers.js";
import Key from "./Key.js";
import TextPanel from "./TextPanel.js";

class App {
  
  constructor (
    keysConfig, 
    level = "1",
    languagePack= "rus"
  ) {
    
    this.textPanel = new TextPanel(document.querySelector(".app"))
  
    this.keysConfig = keysConfig;
    this.keys = [];
    this.initKeyboard(this.keysConfig);

    
    this.keyBoardWrapper.addEventListener('click', () => this.deleteKeyboard());
    this.addData(this.fetchData('/data.json'));
    
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
     console.log('2');
     if (!response.ok) {
       throw new Error('Ошибка в fetch' + response.status.Text);
     }
     return response.json();
   })
     .then(jsonData => jsonData
     // .catch(error => console.error('Ошибка при исполнении запросп : ', error))
   );

  }

  deleteKeyboard() {
    this.keyBoardWrapper.classList.add('fade')
  }

  adData(data) {
    this.data = data;
  }

  

}

export default App;