self.addEventListener('message', event => {
  const city = event.data;

  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = success;
  xhr.onerror = error;

  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=<appid>&units=metric');
  xhr.send();

});

/*
-jsonObj.main.temp
-stringa con tempo
-url icona
*/
function success() {
  var jsonObj = JSON.parse(this.responseText);
	console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);


  if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.timezone)
    date = new Date((jsonObj.dt - ((new Date().getTimezoneOffset() * 60 * -1) -jsonObj.timezone)) * 1000);
  else
    if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.timezone)
      date = new Date((jsonObj.dt + (jsonObj.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
    else
      date = new Date(jsonObj.dt * 1000);

  let time = '';
  if(Math.trunc(date.getHours() / 10) == 0)
    if(Math.trunc(date.getMinutes() / 10) == 0)
      time = '0' + date.getHours() + ':0' + date.getMinutes();
    else
      time = '0' + date.getHours() + ':' + date.getMinutes();
  else
      if(Math.trunc(date.getMinutes() / 10) == 0)
        time = date.getHours() + ':0' + date.getMinutes();
      else
        time = date.getHours() + ':' + date.getMinutes();

  self.postMessage({
    name: jsonObj.name.replace(' ','_'),
    temp: jsonObj.main.temp,
    time: time,
    icon: "http://openweathermap.org/img/wn/"+jsonObj.weather[0].icon+"@2x.png"
  });
}

function error(err){
	console.log('An Error:', err);
  close();
}
