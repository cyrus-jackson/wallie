const wallpaper = require('wallpaper-js');
const axios = require('axios');
axios.defaults.headers.post['Content-Type'] = 'application/json';

// require syntax

function changeWallpaper(sourceUrl) {
  let options = { source : sourceUrl}
  wallpaper.set(options);
}


function fetchBingAndChangeWallpaper() {
  axios.post('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', {})
    .then((response) => {
      setBingDetails(response.data);
      var sourceUrl = 'https://www.bing.com'+response.data.images[0].url;
      changeWallpaper(sourceUrl)
    })
    .catch((error) => {
    });
}


function fetchUnSplashRandom() {
  var settings = getSettings();
  axios.get('https://api.unsplash.com/photos/random?client_id=ecdc497df6446444d40309a55f43c905fbe73da92c798f6a603e56360138efe5' +
    '&orientation=landscape&query=cyberpunk',{})
    .then((response) => {
      changeWallpaper(response.data.urls.full)
      document.getElementById('info').innerText = response.data.user.username;
    });
}






function getArrayString(arr) {
  var str = "";
  if(arr){
    str += arr[0];
    for(var i = 1; i < arr.length; i++)
      str += ',' + arr[i];
  }
  return str;
}


