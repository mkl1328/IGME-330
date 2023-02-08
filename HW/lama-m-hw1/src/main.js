/**
 * @overview HW01 - Ultimate TechnoBabble
 * @author Max Lama <mkl1328@rit.edu>
 */
  
  import { randomSelect } from "./utils.js";

  let words1, words2, words3;
  
  /**
   * Generates specified number of technobabble and places it in output div.
   * @param {number} num - how many lines of technobabble to generate
   */
  const generateTechno = (num = 1) => {
    const arrs = [words1, words2, words3];
    let output = "";
    for(let i = 0; i < num; i++) {
      let phrase = "";
      for(const arr of arrs) {
        phrase += `${randomSelect(arr)} `
      }
      // let phrase = `${randomSelect(words1)} ${randomSelect(words2)} ${randomSelect(words3)}`;
      output += `<p>${phrase.trim()}</p>`
    }
    document.querySelector("#output").innerHTML = output;
  };

  /**
   * Parses the JSON file into the word arrays, initializes button events, and populates initial output.
   * @param {string} json - json file loaded as text 
   */
  const babbleLoaded = (json) => {
    [words1, words2, words3] = Object.values(JSON.parse(json));
    document.querySelector("#generate-1-babble").onclick = () => {generateTechno(1)};
    document.querySelector("#generate-5-babble").onclick = () => {generateTechno(5)};
    generateTechno(1);
  }

  /**
   * Loads the json file.
   */
  const loadBabble = () => {
    const url = "../data/babble-data.json";
    const xhr = new XMLHttpRequest();
    xhr.onload = (e) => {
      console.log(`In onload = HTTP Status Code = ${e.target.status}`);
      const json = e.target.responseText;
      if(!json) {
        document.querySelector("#output").innerHTML = "JSON file is null!"
        return;
      }
      babbleLoaded(json);
    }
    xhr.onerror = e => console.log(`In onerror - HTTP Status Code = ${e.target.status}`);
    xhr.open("GET",url);
    xhr.send();
  }

  /**
   * calls the function to load the json file when the window loads
   */
  window.onload = loadBabble;