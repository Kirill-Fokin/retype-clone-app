import { getRandomNumber } from "./src/scripts/helpers.js";

const dataUrl= '/data.json';

fetch(dataUrl)
  .then(response => {
    console.log('2');
    if (!response.ok) {
      throw new Error('Ошибка в fetch' + response.status.Text);
    }
    return response.json();
  })
    .then(jsonData => console.log(jsonData)
    // .catch(error => console.error('Ошибка при исполнении запросп : ', error))
  );


  
