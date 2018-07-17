const wallpaper = require('wallpaper-js');
const axios = require('axios');


var myVar = setInterval(randomTextColorChange,10000);
var colorCount = 0;
function randomTextColorChange() {
  var color = '#';
  var letters = ['cfe0e8','85144B','ffeaa7','dfe6e9','d63031','dfe6e9'];
  color += letters[colorCount];
  document.body.style.color = color;
  colorCount++;
  if(colorCount > letters.length) colorCount = 0;
}

function changeWallpaper(sourceUrl) {
    let options = { source : sourceUrl}
    wallpaper.set(options);
}
function downloadImage() {

}




function fetchData() {
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    axios.post('https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', {/* here you can pass any parameters you want */})
        .then((response) => {
            console.log("hhhhhhhhhhhhhh ", response)
            var sourceUrl = 'https://www.bing.com'+response.data.images[0].url;
            changeWallpaper(sourceUrl)
        })
        .catch((error) => {
        });
}
fetchData();
