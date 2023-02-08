  /**
   * Randomly choses a word from provided array
   * @param {array} arr - array of words to chose from
   * @returns {string} randomly chosen word
   */
  export const randomSelect = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  }