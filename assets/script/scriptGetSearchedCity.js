var forecasts = new Array();

function getCurrentWeather(city) {
  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = successCurrWeather;
  xhr.onerror = error;

  // TODO: change appid
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=<appid>&units=metric');
  xhr.send();
}

function getForecasts(city) {
  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = successForecasts;
  xhr.onerror = error;
  // TODO: change appid
  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=<appid>&units=metric');
  xhr.send();
}

function getWeatherMap(lon,lat,zoom) {
    let xtile =  Math.floor((lon+180)/360*Math.pow(2,zoom));
    let ytile = Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom));
    // TODO: change appid
    let img = 'https://tile.openweathermap.org/map/precipitation/'+zoom+'/'+xtile+'/'+ytile+'.png?appid=<appid>';
    document.getElementById('precipitations').src = img;
    // TODO: change appid
    img = 'https://tile.openweathermap.org/map/clouds/'+zoom+'/'+xtile+'/'+ytile+'.png?appid=<appid>';
    document.getElementById('clouds').src = img;
    // TODO: change appid
    img = 'https://tile.openweathermap.org/map/precipitation/'+zoom+'/'+xtile+'/'+ytile+'.png?appid=<appid>';
    document.getElementById('precipitations').src = img;
    // TODO: change appid
    img = 'https://tile.openweathermap.org/map/pressure/'+zoom+'/'+xtile+'/'+ytile+'.png?appid=<appid>';
    document.getElementById('pressure').src = img;
}

function getFormattedDay(date) {
  let time = date.getFullYear() + '/';
  if(date.getMonth() < 9){
    if(date.getDate() < 10){
      time += '0' + (date.getMonth() + 1) + '/0' + date.getDate();
    }else{
      time += '0' + (date.getMonth() + 1) + '/' + date.getDate();
    }
  }else{
    if(date.getDate() < 10){
      time += (date.getMonth() + 1) + '/0' + date.getDate();
    }else{
      time += (date.getMonth() + 1) + '/' + date.getDate();
    }
  }

  return time;
}

function getFormattedTime(date) {
  var time = "";
  if(Math.trunc(date.getHours() / 10) == 0)
    if(Math.trunc(date.getMinutes() / 10) == 0)
      time += '0' + date.getHours() + ':0' + date.getMinutes();
    else
      time += '0' + date.getHours() + ':' + date.getMinutes();
  else
      if(Math.trunc(date.getMinutes() / 10) == 0)
        time += date.getHours() + ':0' + date.getMinutes();
      else
        time += date.getHours() + ':' + date.getMinutes();
  return time;
}

function successCurrWeather() {
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

    forecasts.push({date: date, json: jsonObj});
  } else{
    document.getElementById('cityName').innerHTML = jsonObj.message;
    document.getElementsByClassName('album')[0].style.visibility = 'hidden';
    document.getElementById('accordion').style.visibility = 'hidden';
  }
}

function successForecasts() {
  var jsonObj = JSON.parse(this.responseText);
  console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);

  jsonObj.list.forEach(element => {
    if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.timezone)
      date = new Date((element.dt - ((new Date().getTimezoneOffset() * 60 * -1) - jsonObj.timezone)) * 1000);
    else
      if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.timezone)
        date = new Date((element.dt + (jsonObj.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
      else
        date = new Date(element.dt * 1000);
    forecasts.push({date: date, json: element});
    //newTableElement(getFormattedDayTime(date),"http://openweathermap.org/img/wn/"+element.weather[0].icon+"@2x.png",element.main.temp,element.main.temp_min,element.main.temp_max);
  });
  groupByDay();
}

function newTableElement(dateTime, icon, temp, minTemp, maxTemp,tableId) {
  let button = document.getElementById('day'+tableId);
  button.innerHTML = getFormattedDay(dateTime);
  let table = document.getElementById('table'+tableId);
  let newRow = table.insertRow(-1);
  let timeCell = newRow.insertCell(0);
  let time = document.createTextNode(getFormattedTime(dateTime));
  timeCell.appendChild(time);
  let iconCell = newRow.insertCell(1);
  let img = document.createElement('img');
  img.src = icon;
  iconCell.appendChild(img);
  let tempCell = newRow.insertCell(2);
  let t = document.createTextNode(temp);
  tempCell.appendChild(t);
  let tMinCell = newRow.insertCell(3);
  let tMin = document.createTextNode(minTemp);
  tMinCell.appendChild(tMin);
  let tMaxCell = newRow.insertCell(4);
  let tMax = document.createTextNode(maxTemp);
  tMaxCell.appendChild(tMax);
}

function successMap() {
  var jsonObj = JSON.parse(this.responseText);
  console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);
}

function error(err){
	console.log('An Error:', err)
}

function groupByDay() {
  var dailyForecasts = new Array(forecasts[0]);
  var count = 1;

  document.getElementById('cityName').innerHTML += ", "+dailyForecasts[0].json.sys.country;

  for (var i = 1; i < forecasts.length; i++) {
    if(forecasts[i-1].date.getYear() == forecasts[i].date.getYear() && forecasts[i-1].date.getMonth() == forecasts[i].date.getMonth() && forecasts[i-1].date.getDate() == forecasts[i].date.getDate()){
      dailyForecasts.push(forecasts[i]);
    }else{
      dailyForecasts.forEach((item, j) => {
        if(item.json.main.temp_max == item.json.main.temp_min)
          newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",item.json.main.temp,"-","-",count);
        else if(count == 1 && j > 0)
                newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",parseFloat((item.json.main.temp_min + item.json.main.temp_max) / 2).toFixed(2),item.json.main.temp_min,item.json.main.temp_max,count);
              else
                newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",item.json.main.temp,item.json.main.temp_min,item.json.main.temp_max,count);
      });
      dailyForecasts = new Array(forecasts[i]);
      count = count + 1;
    }
  }
  getWeatherMap(forecasts[0].json.coord.lon, forecasts[0].json.coord.lat, 3);
}

window.addEventListener('load', (event) => {
  const urlParams = new URLSearchParams(window.location.search);
  let city = urlParams.get('city');
  let words = city.split('_');
  if(words.length > 1){
    city = words[0];
    for (var i = 1; i < words.length; i++) {
      city += ' ' + words[i];
    }
  }


  console.log(city);

  document.getElementsByTagName('title')[0].innerHTML = city.split(',')[0];
  document.getElementById('cityName').innerHTML = city.split(',')[0];
  getCurrentWeather(city);
  getForecasts(city);
});
