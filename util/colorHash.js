// function StringToColor(str) {
//     var rand = 1/str.length * Math.pow(255,3);
//     for (var i = 0, colour = "#"; i < 3; colour += ("F0" + ((rand >> i++ * 8) & 0xFF).toString(16)).slice(-2));
//     return colour;
// }
function StringToColor(stringInput,shade=true) {
  if(!shade){
    return '#aaa';
  }
  let stringUniqueHash = [...stringInput].reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);
  return `hsl(${stringUniqueHash % 360}, 35%, 50%)`;
}
function resetColor(str) {
  id("graph").className = "tab";
  id("logs").className = "tab";
  id("summary").className = "tab";
  id("con-graph").style = "display:none";
  id("con-logs").style = "display:none";
  id("con-summary").style = "display:none";
  tab = str;
  id(`con-${str}`).style = "display:block";
  id(str).className = "tab selected";
  render();
}