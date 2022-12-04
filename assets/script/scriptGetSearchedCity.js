var forecasts = new Array();
const CurrentWeatherWorker = new Worker('http://localhost:8080/script/worker_currWeatherCity.js');
const ForecastsWorker = new Worker('http://localhost:8080/script/worker_Forecasts.js');

function getFormattedDay(date) {
  let time = '';
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
  time += '/' + date.getFullYear();
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


function successCurrWeather(date, json, lon, lat, cod, message) {
  if(cod == '200'){
    if(forecasts.length == 0)
      forecasts.push({date: date, json: json});
    else{
      forecasts.unshift({date: date, json: json});
      groupByDay();
    }
  }else{
    document.getElementById('cityName').innerHTML = message;
    document.getElementById('add_fav_link').style.visibility = 'hidden';
    document.getElementsByClassName('album')[0].style.visibility = 'hidden';
    document.getElementById('accordion').style.visibility = 'hidden';
  }
}

function successForecasts(dates) {
  console.log(dates);
  if(forecasts.length == 0)
    for (var i = 0; i < dates.length; i++) {
      forecasts.push(dates[i]);
    }
  else{
    for (var i = 0; i < dates.length; i++) {
      forecasts.push(dates[i]);
    }
    groupByDay();
  }
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
        else if(item.json.main.temp_max != item.json.main.temp_min && (item.json.main.temp == item.json.main.temp_max || item.json.main.temp == item.json.main.temp_min))
                newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",parseFloat((item.json.main.temp_min + item.json.main.temp_max) / 2).toFixed(2),item.json.main.temp_min,item.json.main.temp_max,count);
              else
                newTableElement(item.date,"http://openweathermap.org/img/wn/"+item.json.weather[0].icon+"@2x.png",item.json.main.temp,item.json.main.temp_min,item.json.main.temp_max,count);
      });
      dailyForecasts = new Array(forecasts[i]);
      count = count + 1;
    }
  }

  while(count < 6){
    let button = document.getElementById('day'+count);
    button.innerHTML = 'To be defined soon';
    count++;
  }
  console.log(forecasts[0].json);
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

  document.getElementsByTagName('title')[0].innerHTML = city.split(',')[0];
  document.getElementById('cityName').innerHTML = city.split(',')[0];
  CurrentWeatherWorker.postMessage(city);
  //getCurrentWeather(city);
  ForecastsWorker.postMessage(city);
  //getForecasts(city);
});

CurrentWeatherWorker.addEventListener('message',(event) => {
  const currWeatherData = event.data;
  console.log('We got a message back!', currWeatherData);

  successCurrWeather(currWeatherData.date, currWeatherData.json, currWeatherData.lon, currWeatherData.lat, currWeatherData.cod, currWeatherData.message);
  CurrentWeatherWorker.terminate();
});

ForecastsWorker.addEventListener('message',(event) => {
  const forecastsData = event.data;
  console.log('We got a message back!', forecastsData);

  successForecasts(forecastsData.list);
  ForecastsWorker.terminate();
});
