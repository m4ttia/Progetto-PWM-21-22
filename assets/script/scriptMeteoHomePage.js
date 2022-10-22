function getWeather(city) {
  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = success;
  xhr.onerror = error;

  // TODO: change appid
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=<appid>&units=metric');
  xhr.send();
}

function success() {
  var jsonObj = JSON.parse(this.responseText);
	console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);
  let temp = document.getElementById(jsonObj.name.replace(' ','_')+"_temp");
  temp.innerText = jsonObj.main.temp + "°";

  if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.timezone)
    date = new Date((jsonObj.dt - ((new Date().getTimezoneOffset() * 60 * -1) -jsonObj.timezone)) * 1000);
  else
    if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.timezone)
      date = new Date((jsonObj.dt + (jsonObj.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
    else
      date = new Date(jsonObj.dt * 1000);

  let time = document.getElementById(jsonObj.name.replace(' ','_')+"_time");
  if(Math.trunc(date.getHours() / 10) == 0)
    if(Math.trunc(date.getMinutes() / 10) == 0)
      time.innerText = '0' + date.getHours() + ':0' + date.getMinutes();
    else
      time.innerText = '0' + date.getHours() + ':' + date.getMinutes();
  else
      if(Math.trunc(date.getMinutes() / 10) == 0)
        time.innerText = date.getHours() + ':0' + date.getMinutes();
      else
        time.innerText = date.getHours() + ':' + date.getMinutes();

  document.getElementById(jsonObj.name.replace(' ','_')+'_icon').setAttribute("src", "http://openweathermap.org/img/wn/"+jsonObj.weather[0].icon+"@2x.png");
}

function error(err){
	console.log('An Error:', err)
}

getWeather('London');
getWeather('Tokyo');
getWeather('New York');
