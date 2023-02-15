/**
 * Draws a rectangle with given parameters
 * @param {object} ctx canvas context 
 * @param {number} x x coordinate of rectangle's origin
 * @param {number} y y coordinate of rectangle's origin
 * @param {number} width width of rectangle
 * @param {number} height height of rectangle
 * @param {color} fillStyle color of fill
 * @param {number} lineWidth stroke weight
 * @param {color} strokeStyle coolor of line
 */
export const drawRectangle = (ctx,x,y,width,height,fillStyle="black",lineWidth=0,strokeStyle="black") => {
  ctx.save();
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.rect(x,y,width,height);
  ctx.fill();
  if (lineWidth > 0) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
  ctx.closePath();
  ctx.restore();
}

/**
 * Draws an arc with given parameters
 * @param {object} ctx canvas context
 * @param {number} x x coordinate of arc's origin
 * @param {number} y y coordinate of arc's origin
 * @param {number} radius radius of arc
 * @param {number} startAngle angle to start drawing arc
 * @param {number} endAngle angle to stop drawing arc
 * @param {color} fillStyle color of fill
 * @param {number} lineWidth stroke weight
 * @param {color} strokeStyle color of line
 * @param {bool} cc wether or not to draw counter-clockwise 
 */
export const drawArc = (ctx, x, y, radius, startAngle = 0, endAngle = Math.PI *2, fillStyle="black",lineWidth=0,strokeStyle="black", cc = true) => {
  ctx.save();
  ctx.fillStyle = fillStyle;
  ctx.beginPath();
  ctx.arc(x,y,radius,startAngle,endAngle, cc);
  ctx.fill();
  if (lineWidth > 0) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
  ctx.closePath();
  ctx.restore();
}

/**
 * Draws a line with given parameters
 * @param {object} ctx canvas context
 * @param {number} x1 beginning x coordinate of line
 * @param {number} y1 beginning y coordinate of line
 * @param {number} x2 ending x coordinate of line
 * @param {number} y2 ending x coordinate of line
 * @param {number} lineWidth stroke weight
 * @param {color} strokeStyle color of line
 */
export const drawLine = (ctx,x1,y1,x2,y2,lineWidth=1,strokeStyle="black") => {
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1,y1);
  ctx.lineTo(x2,y2);
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = strokeStyle;
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}