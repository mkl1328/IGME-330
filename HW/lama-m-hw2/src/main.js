/*
	main.js is primarily responsible for hooking up the UI to the rest of the application 
	and setting up the main event loop
*/

// We will write the functions in this file in the traditional ES5 way
// In this instance, we feel the code is more readable if written this way
// If you want to re-write these as ES6 arrow functions, to be consistent with the other files, go ahead!

import * as utils from './utils.js';
import * as audio from './audio.js';
import * as canvas from './visualizer.js';

const drawParams = {
  showGradient  : true,
  showBars      : true,
  showCircles   : true,
  showNoise     : false,
  showInvert    : false,
  showEmboss    : false,
};

let highshelf = false;

// 1 - here we are faking an enumeration
const DEFAULTS = Object.freeze({
	sound1  :  "media/New Adventure Theme.mp3"
});

function init(){
  audio.setupWebaudio(DEFAULTS.sound1);
	console.log("init called");
	console.log(`Testing utils.getRandomColor() import: ${utils.getRandomColor()}`);
	let canvasElement = document.querySelector("canvas"); // hookup <canvas> element
	setupUI(canvasElement);
  canvas.setupCanvas(canvasElement, audio.analyserNode);
  loop();
}

function setupUI(canvasElement){
  // Checkboxes
  document.querySelector("#gradientCB").onchange = () => { drawParams.showGradient = document.querySelector("#gradientCB").checked;}
  document.querySelector("#barsCB").onchange = () => { drawParams.showBars = document.querySelector("#barsCB").checked;}
  document.querySelector("#circlesCB").onchange = () => { drawParams.showCircles = document.querySelector("#circlesCB").checked;}
  document.querySelector("#noiseCB").onchange = () => { drawParams.showNoise = document.querySelector("#noiseCB").checked;}

  document.querySelector("#invertCB").onchange = () => { drawParams.showInvert = document.querySelector("#invertCB").checked;}
  document.querySelector("#embossCB").onchange = () => { drawParams.showEmboss = document.querySelector("#embossCB").checked;}

  document.querySelector('#cb-highshelf').checked = highshelf;
  document.querySelector('#cb-highshelf').onchange = e => {
    highshelf = e.target.checked;
    toggleHighshelf();
  };
  toggleHighshelf();

  // A - hookup fullscreen button
  const fsButton = document.querySelector("#fsButton");
  const playButton = document.querySelector("#playButton");
	
  // add .onclick event to button
  fsButton.onclick = e => {
    console.log("init called");
    utils.goFullscreen(canvasElement);
  };

  function toggleHighshelf(){
    if(highshelf){
      audio.biquadFilter.frequency.setValueAtTime(1000, audioCtx.currentTime); // we created the `biquadFilter` (i.e. "treble") node last time
      audio.biquadFilter.gain.setValueAtTime(25, audioCtx.currentTime);
    }else{
      audio.biquadFilter.gain.setValueAtTime(0, audioCtx.currentTime);
    }
  }

  // add .onclick event to button
  playButton.onclick = e => {
    console.log(`audioCtx.state before = ${audio.audioCtx.state}`);       // This is always double printing "running"???

    //check if context is in suspended state (autoplay policy)
    if (audio.audioCtx.state == "suspended") {
      audio.audioCtx.resume();
    }
    console.log(`audioCtx.state after = ${audio.audioCtx.state}`);
    if(e.target.dataset.playing == "no") {
      // if track is currently paused, play it
      audio.playCurrentSound();
      e.target.dataset.playing = "yes"; // our CSS will cet the text to "Pause"
      // if track IS playing, pause it
    } else {
      audio.pauseCurrentSound();
      e.target.dataset.playing = "no"; // our CSS will set the text to "Play"
    }
  }

  // C - hookup volume slider & label
  let volumeSlider = document.querySelector("#volumeSlider");
  let volumeLabel = document.querySelector("#volumeLabel");

  // add .oninput event to slider
  volumeSlider.oninput = e => {
    // set the gain
    audio.setVolume(e.target.value);
    // update value of label to match value of slider
    volumeLabel.innerHTML = Math.round((e.target.value/2 * 100));
  };

  // set value of label to match initial value of slider
  volumeSlider.dispatchEvent(new Event("input"));

  // D - hookup track <select>
  let trackSelect = document.querySelector("#trackSelect");
  // add .onchange event to <select>
  trackSelect.onchange = e => {
    audio.loadSoundFile(e.target.value);
    // pause the current track if it is playing
    if (playButton.dataset.playing == "yes") {
      playButton.dispatchEvent(new Event("click"));
    }
  }
	
} // end setupUI

function loop(){
 
    requestAnimationFrame(loop);
    canvas.draw(drawParams);
  }

export {init};