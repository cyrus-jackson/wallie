
var settings;
var bingDetails;

function setSettings(settings) {
  var strSettings = JSON.stringify(settings);
  window.localStorage.setItem('settings',strSettings);
}

function setBingDetails(bing) {
  var strBing = JSON.stringify(bing);
  window.localStorage.setItem('bingDetails',strBing);
}
function getSettings() {
  settings = window.localStorage.getItem('settings');
  return settings;
}

function getBingDetails() {
  bingDetails = window.localStorage.getItem('bingDetails');
  return bingDetails;
}


var myVar = setInterval(randomTextColorChange,10000);
var colorCount = 0;
function randomTextColorChange() {
  var letters = ['#cfe0e8','#85144B','#ffeaa7','#dfe6e9','#d63031','#dfe6e9'];
  document.body.style.color = letters[colorCount];
  colorCount++;
  if(colorCount > letters.length) colorCount = 0;
}
