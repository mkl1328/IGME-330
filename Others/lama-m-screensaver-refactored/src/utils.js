/**
 * Creates a random color and returns it with 80% opacity
 * @returns random color string
 */
export const getRandomColor = () => {
  const getByte = () => 55 + Math.round(Math.random() * 200);
return `rgba(${getByte()},${getByte()},${getByte()},0.8)`
}

/**
 * Selects a random number between the given parameters
 * @param {number} min minimum range 
 * @param {number} max maximum range
 * @returns {number} random number between range
 */
export const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;