/**
 * @overview Phyllo Flower ES6 Class Checkoff
 * @author Max Lama <mkl1328@rit.edu>
 */

/** canvas variables */
const canvasWidth = 640, canvasHeight = 480;
let ctx

/** general Variables */
const fps = 60;
let ramp = true;

/** Array of phylloFlowers */
let sprites = [];

import { PhylloFlower } from "./PhylloFlower.js";

/** 
 * Initializes Canvas and Flowers, and starts draw loop 
 */
const init = () => {
  ctx = canvas.getContext("2d");
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  ctx.fillRect(0,0,canvasWidth,canvasHeight);

  ramp = document.querySelector("#ramp").checked;
  document.querySelector("#restart").onclick = reset;

  sprites.push(new PhylloFlower(200, 200, 137.5, 4));
  sprites.push(new PhylloFlower(450, 200, 18.1, 3));

  loop();
}

/**
 * resets the flowers on buttonpress.
 */
const reset = () => {
  ctx.save();
  ctx.fillStyle = "black";
  ctx.fillRect(0,0,canvasWidth,canvasHeight)
  ctx.restore();
  //FIX
  sprites.forEach( sprite => sprite.reset());
}

/**
 * draws / animates the flowers.
 */
const loop = () => {
  ctx.save();
  ctx.fillStyle = "black"
  ctx.globalAlpha = 0.1
  ctx.fillRect(0,0,canvasWidth,canvasHeight);
  ctx.restore();

  setTimeout(loop,1000/fps);
  ramp = document.querySelector("#ramp").checked; 

  sprites.forEach( sprite => sprite.draw(ctx, ramp));
}

window.onload = init;
