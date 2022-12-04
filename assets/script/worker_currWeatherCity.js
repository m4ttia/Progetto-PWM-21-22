self.addEventListener('message', event => {
  const city = event.data;

  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = success;
  xhr.onerror = error;

  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=<appid>&units=metric');
  xhr.send();
});

function success() {
  var jsonObj = JSON.parse(this.responseText);
	console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);

  if(jsonObj.cod == '200'){
    if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.timezone)
      date = new Date((jsonObj.dt - ((new Date().getTimezoneOffset() * 60 * -1) - jsonObj.timezone)) * 1000);
    else
      if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.timezone)
        date = new Date((jsonObj.dt + (jsonObj.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
      else
        date = new Date(jsonObj.dt * 1000);

    self.postMessage({
      date: date,
      json: jsonObj,
      lon: jsonObj.coord.lon,
      lat: jsonObj.coord.lat,
      cod: jsonObj.cod
    });
  } else{
    self.postMessage({
      cod: jsonObj.cod,
      message: jsonObj.message
    });
  }
}

function error(err){
	console.log('An Error:', err);
  close();
}
