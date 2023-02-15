/**
 * @overview PE04 code refactoring
 * @author Max Lama <mkl1328@rit.edu>
 */

import {getRandomColor, getRandomInt} from "./utils.js";
import {drawArc, drawLine, drawRectangle} from "./canvas-utils.js";

let ctx;
let canvas;
let paused = false;
let createRectangles = true;
let createArcs = true;
let createLines = true;

/** Initial drawing to screen, initialize canvas + context, call update and setupUI */
const init = () => {
  console.log("page loaded!");
  
  canvas = document.querySelector("canvas");
  ctx = canvas.getContext("2d");

  drawRectangle(ctx,20,20,600,440,"red");
  drawRectangle(ctx,120,120,400,300,"red",1,"blue");

  for(let i = 0; i < canvas.width / 20; i++) {
    for(let j = 0; j < canvas.height / 10; j++) {
      if((i + j) % 2 == 0) ctx.setLineDash([2,2]);
      else ctx.setLineDash([]);

      ctx.strokeRect(i*30 + 5, j*20 + 3, 15, 7);
      drawRectangle(ctx, i*30 + 5, j*20 + 3, 15, 7, "red", 5, "lime");
    }
  }

  ctx.setLineDash([]);
  drawRectangle(ctx, 100,100,250,250,"orange", 5, "white");

  drawLine(ctx, 400,100,640,0,5,"black");
  drawLine(ctx, 500, 100,640,0,5,"black");

  drawArc(ctx,500,250,60,0,Math.PI * 2, "magenta", 5, "white");

  drawArc(ctx, 250, 250, 40, 0, Math.PI, "purple", 5, "white", true);

  drawArc(ctx,300, 150, 25, 0, Math.PI * 2, "black", 5, "white");
  drawArc(ctx,150, 150, 25, 0, Math.PI * 2, "black", 5, "white");
  
  drawLine(ctx,20,400,620,400,20,"black");

  setupUI(ctx);
  update();
}

/** Calls itself if unpaused and draws each shape */
const update = () => {
  if(paused) return;
  requestAnimationFrame(update);
  if(createRectangles) drawRandomRect(ctx);
  if(createArcs) drawRandomArc(ctx);
  if(createLines) drawRandomLine(ctx);
}


//TODO: [OPTIONAL]     - Make these pure functions and moove to canvas-utils.
//                     - Additionally - maybe import the canvas-utils as a namespace.

/** Following 3 functions are self explanitory */
const drawRandomRect = (ctx) => drawRectangle(ctx,getRandomInt(0,640), getRandomInt(0,480), getRandomInt(10,90), getRandomInt(10,90),getRandomColor(),getRandomInt(0,5),getRandomColor());

const drawRandomArc = (ctx) => drawArc(ctx,getRandomInt(0,640), getRandomInt(0,480), getRandomInt(10,90),getRandomInt(0,360),getRandomInt(0,360),getRandomColor(),getRandomInt(0,5),getRandomColor());

const drawRandomLine = (ctx) => drawLine(ctx,getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,640),getRandomInt(0,480),getRandomInt(0,5),getRandomColor());

/**
 * Assigns DOM elements eventhandlers.
 * @param {object} ctx canvas context 
 */
const setupUI = (ctx) => {
  document.querySelector("#clear-screen").onclick = () => ctx.clearRect(0,0,640,480);
  document.querySelector("#btn-pause").onclick = () => paused = true;
  document.querySelector("#btn-play").onclick = () => {
    if(paused) {
      paused = false;
      update();
    }
  }
  document.querySelector("#cb-rectangles").onclick = (e) => {createRectangles = e.target.checked};
  document.querySelector("#cb-arcs").onclick = (e) => {createArcs = e.target.checked};
  document.querySelector("#cb-lines").onclick = (e) => {createLines = e.target.checked};

  canvas.onclick = canvasClicked;
}

/**
 * Draws arcs around the mouse when canvas is clicked
 * @param {object} e event object 
 */
const canvasClicked = (e) => {
  let rect = e.target.getBoundingClientRect();
  let mouseX = e.clientX - rect.x;
  let mouseY = e.clientY - rect.y;
  console.log(mouseX,mouseY);

  for(let i=0; i<10; i++) {
    let x = getRandomInt(-100,100) + mouseX;
    let y = getRandomInt(-100,100) + mouseY;
    let radius = getRandomInt(20,50);
    let start = getRandomInt(0,360);
    let end = getRandomInt(0,360);
    let color = getRandomColor();
    drawArc(ctx,x,y,radius,start,end,color);
  }
} 

init();