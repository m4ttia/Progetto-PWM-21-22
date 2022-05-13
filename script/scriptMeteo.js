async function getWeather(city){
  let response = await fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=6cde1cd958da335a82a6079c6acd5e1d&units=metric",{method: "GET"});
  let jsonObj = await response.json();
  console.log(jsonObj);
  let temps = document.getElementsByClassName(city+"_temp");
  for (var i = 0; i < temps.length; i++) {
    temps[i].innerText = jsonObj.main.temp + "°";
  }
  let icons = document.getElementsByClassName(city+"_icon");

  /*for (var i = 0; i < icons.length; i++) {
    icons[i].setAttribute("src", "http://openweathermap.org/img/wn/"+jsonObj.weather[0].icon+"@2x.png");
  }*/

  document.getElementsByClassName('London_icon')[0].setAttribute("src", "http://openweathermap.org/img/wn/"+jsonObj.weather[0].icon+"@2x.png");
}

getWeather('London');
getWeather('Tokyo');
getWeather('Delhi');
