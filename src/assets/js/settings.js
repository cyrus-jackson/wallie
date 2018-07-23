const axios = require('axios');
const wallpaper= require('wallpaper');

var fs = require('fs'),
    request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};


axios.defaults.headers.post['Content-Type'] = 'application/json';

// require syntax

function changeWallpaper(sourceUrl) {
  let options = { source : sourceUrl}

  download(sourceUrl, 'wallpapers/wall.jpg', function(){
    console.log('download done');
    wallpaper.set('wallpapers/wall.jpg').then(() => {
    	console.log('wallpaper set');
    });
  });
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
      var str = 'Clicked By <a href="' + response.data.user.links.html +'" target="_blank" class="name">'+ response.data.user.username +'</a>' + ' On Unsplash';
      document.getElementById('info').innerHTML = str;
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
