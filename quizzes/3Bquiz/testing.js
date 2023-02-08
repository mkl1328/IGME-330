const colors = "red,green,blue";

/*
window.onload = () => {
  let colorArr = colors.split(",");
  let outputString = '<ol>';
  for(const color of colorArr) {
    outputString += `<li>${color}</li>`;
  }
  outputString += '</ol>'
  document.querySelector("#output").innerHTML = outputString;
}
*/

window.onload = () => {
  let colorArr = colors.split(',');
  let outputString = colorArr.map(x => `<li>${x}</li>`).join('');
  outputString = `<ol>${outputString}</ol>`;
  document.querySelector('#output').innerHTML = outputString;
}