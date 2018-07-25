
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
  settings = JSON.parse(window.localStorage.getItem('settings'));
  if(!settings) settings = {};
  if(!settings.time)
    settings.time = 60000;
  if(!settings.categories)
    settings.categories = 'cyberpunk';
  setSettings(settings);
  // settings = JSON.parse(settings);
  return settings;
}

// init();

function getBingDetails() {
  bingDetails = window.localStorage.getItem('bingDetails');
  return bingDetails;
}


var myVar = setInterval(randomTextColorChange,15000);
var colorCount = 0;
var backgroundCount = 0;
function randomTextColorChange() {
  var letters = ['#711c91','#ea00d9','#0abdc6','#133e7c','#091833','#dfe6e9'];
  var background = ["#000428,#004e92","#52c234,#061700"," #360033,#0b8793","#c31432,#240b36","#c04848,#480048"]
  // document.body.style.color = letters[colorCount];
  document.body.style.background = "linear-gradient(to bottom left,"+background[colorCount]+")";
  colorCount++;
  if(colorCount > background.length) colorCount = 0;
}

function addTime(ele) {
  var time = document.getElementById('time').value;
  if(time < 5) {
    time = 5;
    document.getElementById('time').value = 5;
  }
  settings.time = time * 60000;
  setSettings(settings);
}
function addSearch(ele) {
  var search = document.getElementById('search').value;
    settings.categories = search;
    setSettings(settings);
    console.log('settings ',settings)
}


function init() {
  getSettings();
  document.getElementById('time').value = settings.time/6000;
  document.getElementById('search').value = settings.categories;
}



function isJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", function(event){
  init();
});
