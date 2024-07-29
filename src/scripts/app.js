import { createElement } from "./helpers.js";
import Key from "./Key.js";

class App {
  constructor (
    keysConfig, level, languagePack
  ) {
    this.keysWrapper = document.querySelector(".keyboard-container");
    this.keysConfig = keysConfig;
    this.keys = [];
    this.initKeyboard(this.keysConfig);
    
  }

  initKeyboard(keysConfig) {

    keysConfig.forEach((obj, indx) => {
      console.log()
      const key = new Key(this, this.keysConfig[indx]);
    })

    this.keys.forEach((key, indx) => {

      // const configKey = (Object.keys(keysConfig[indx])[0])       
      // const keyObj = (this.keysConfig[indx][this.configKey]) 

      

    
     
      
    })
  }

  deleteKeyboard() {
    // this.keys 
  }

  

}

export default App;