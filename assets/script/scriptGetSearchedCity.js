var forecasts = new Array();

function getCurrentWeather(city) {
  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = successCurrWeather;
  xhr.onerror = error;

  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid=6cde1cd958da335a82a6079c6acd5e1d&units=metric');
  xhr.send();
}

function getForecasts(city) {
  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = successForecasts;
  xhr.onerror = error;

  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=6cde1cd958da335a82a6079c6acd5e1d&units=metric');
  xhr.send();
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

  if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.timezone)
    date = new Date((jsonObj.dt - ((new Date().getTimezoneOffset() * 60 * -1) - jsonObj.timezone)) * 1000);
  else
    if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.timezone)
      date = new Date((jsonObj.dt + (jsonObj.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
    else
      date = new Date(jsonObj.dt * 1000);

  forecasts.push({date: date, json: jsonObj});

  //newTableElement(getFormattedDayTime(date), "http://openweathermap.org/img/wn/"+jsonObj.weather[0].icon+"@2x.png", jsonObj.main.temp, jsonObj.main.temp_min, jsonObj.main.temp_max);
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

function error(err){
	console.log('An Error:', err)
}

function groupByDay() {
  var dailyForecasts = new Array(forecasts[0]);
  var count = 1;

  for (var i = 1; i < forecasts.length; i++) {
    if(forecasts[i-1].date.getYear() == forecasts[i].date.getYear() && forecasts[i-1].date.getMonth() == forecasts[i].date.getMonth() && forecasts[i-1].date.getDate() == forecasts[i].date.getDate()){
      dailyForecasts.push(forecasts[i]);
    }else{
      dailyForecasts.forEach((item, i) => {
        if(count >= 2 || i == dailyForecasts.length -1)
          newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",item.json.main.temp,"-","-",count);
        else
          newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",item.json.main.temp,item.json.main.temp_min,item.json.main.temp_max,count);
      });
      dailyForecasts = new Array(forecasts[i]);
      count = count + 1;
    }
  }
}

window.addEventListener('load', (event) => {
  document.getElementById('cityName').innerHTML = JSON.parse(localStorage.getItem('searchedCity')).city;
  getCurrentWeather(JSON.parse(localStorage.getItem('searchedCity')).city);
  getForecasts(JSON.parse(localStorage.getItem('searchedCity')).city);
});
