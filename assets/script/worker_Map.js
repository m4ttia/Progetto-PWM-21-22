self.addEventListener('message', event => {
  const data = event.data;

  let xtile =  Math.floor((data.lon+180)/360*Math.pow(2,data.zoom));
  let ytile = Math.floor((1-Math.log(Math.tan(data.lat*Math.PI/180) + 1/Math.cos(data.lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,data.zoom));

  var xhr = new XMLHttpRequest();

  xhr.onload = async function() {
    const response = this.response;

    // Send the image data to the UI thread!
    self.postMessage({
      id: data.id,
      blob: response,
    });
  }
  xhr.onerror = function(err) {
    console.log('An error: '+err);
  }

  xhr.responseType = 'blob';
  xhr.open('GET','https://tile.openweathermap.org/map/'+data.id+'/'+data.zoom+'/'+xtile+'/'+ytile+'.png?appid=<appid>');
  xhr.send();
});
