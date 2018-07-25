// Based on the settings loop the server
const {remote} = require('electron');

function minsToMidnight() {
  var now = new Date();
  var then = new Date(now);
  then.setHours(24, 0, 0, 0);
  var mins =  (then - now) / 6e4;
  return (100 + (mins*6000)).toFixed(0);
}


var myDelay = 8640000;
var startingDelay = minsToMidnight();
var start = Date.now();
var date = new Date();

function startTimer() {
  setTimeout(function() {
    console.log('BING',date.getMinutes());
    fetchBingAndChangeWallpaper();
    var actual = Date.now() - start;
    startingDelay = myDelay - (actual - myDelay);
    start = Date.now();
    startTimer();
  }, startingDelay);
}


//We make use of the initial call and then we start timer with an inital delay till midnight
// fetchBingAndChangeWallpaper();
// startTimer();



// var delay = 30000;
//
// var randomTimeout = function startRandomTimer() {
//   var settings = getSettings();
//   setTimeout(function() {
//
//
//     startRandomTimer();
//   }, delay);
// }

let delay = 5000;

let timerId = setTimeout(function request() {
  fetchUnSplashRandom();
  delay = settings.time;
  console.log('hehehe' , delay)
  timerId = setTimeout(request, delay);

}, delay);





function minimizeWindow () {
  var window = remote.BrowserWindow.getFocusedWindow();
  window.hide();
}
