/**
 * @author Max Lama <mkl1328@rit.edu>
 * @description Class that calculates and displays a Phyllo Flower
 */

export class PhylloFlower {
  /**
   * Create new PhylloFlower
   * @param {number} centerX - xCord of the center 
   * @param {number} centerY - yCord of the center
   * @param {number} divergence - divergence angle
   * @param {number} c - :O something that affects the phyllo
   * @param {number} rad - radius of dots
   */
  constructor(centerX, centerY, divergence, c, rad = 4) {
    this.n = 0;
    this.rad = rad;
    this.centerX = centerX;
    this.centerY = centerY;
    this.defaultDivergence = divergence
    this.divergence = this.defaultDivergence;
    this.c = c;
    this.oscillate;
  }

  /**
   * Draw the circles in the Phyllo Flower pattern
   * @param {object} ctx - canvas context 
   * @param {boolean} ramp - wether or not to ramp the divergence value
   */
  draw = (ctx, ramp) => {
    // console.log("ran")
    let a = this.n * this.dtr(this.divergence);
    let r = this.c * Math.sqrt(this.n);
    let x = r * Math.cos(a) + this.centerX;
    let y = r * Math.sin(a) + this.centerY;
    let aDegrees = (this.n * this.divergence) % 361;
    let color = `hsl(${aDegrees},100%,50%)`;
  
    if(ramp) this.divergence += 0.05;
  
    this.drawCircle(ctx,x,y,this.rad,color);
  
    if(this.oscillate) this.n++
      else this.n--;
    if(this.n > 800) this.oscillate = false;
    if(this.n < 0) this.oscillate = true;
  }

  /**
   * Translates radians to degrees
   * @param {number} degrees - degrees to turn to radians 
   * @returns {number} degree value. 
   */
  dtr = (degrees) => {
    return degrees * (Math.PI/180);
  }

  /**
   * Draws a circle to the canvas
   * @param {object} ctx - canvas context 
   * @param {number} x - xpos of circle
   * @param {number} y - ypos of circle
   * @param {number} radius - radius of circle
   * @param {color} color - color of circle 
   */
  drawCircle = (ctx,x,y,radius,color) => {
    // console.log('Drawn')
    ctx.save();
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,radius,0,Math.PI * 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  /**
   * Resets the Phyllo Flower's values.
   */
  reset = () => {
    this.divergence = this.defaultDivergence;
    this.n = 0;
  }
  
}

