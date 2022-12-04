
function getWeather(city) {
  const CurrentWeatherWorker = new Worker('http://localhost:8080/script/worker_currentWeather.js');
  CurrentWeatherWorker.postMessage(city);
  CurrentWeatherWorker.addEventListener('message',(event) => {
    const currWeatherData = event.data;
    console.log('We got a message back!', currWeatherData);
    setUpPage(currWeatherData.name, currWeatherData.temp, currWeatherData.time, currWeatherData.icon);
    CurrentWeatherWorker.terminate();
  });
}

function setUpPage(name,temp,time,icon) {
  let temperatura = document.getElementById(name+"_temp");
  temperatura.innerText = temp + "°";

  let t = document.getElementById(name+"_time");
  t.innerText = time;
  document.getElementById(name+'_icon').setAttribute("src", icon);
}


getWeather('London');
getWeather('Tokyo');
getWeather('New York');
