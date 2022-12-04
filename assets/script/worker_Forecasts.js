self.addEventListener('message', event => {
  const city = event.data;

  var xhr = new XMLHttpRequest();
  console.log(xhr);
  xhr.onload = success;
  xhr.onerror = error;

  xhr.open('GET', 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid=<appid>&units=metric');
  xhr.send();
});

function success() {
  var jsonObj = JSON.parse(this.responseText);
  console.log('Ricevo:', this.status);
	console.log('da:', this.responseURL);

  console.log(jsonObj);
  var d = new Array();

  jsonObj.list.forEach(element => {
    if((new Date().getTimezoneOffset() * 60 * -1) > jsonObj.city.timezone)
      date = new Date((element.dt - ((new Date().getTimezoneOffset() * 60 * -1) - jsonObj.city.timezone)) * 1000);
    else
      if((new Date().getTimezoneOffset() * 60 * -1) < jsonObj.city.timezone)
        date = new Date((element.dt + (jsonObj.city.timezone - (new Date().getTimezoneOffset() * 60 * -1))) * 1000);
      else
        date = new Date(element.dt * 1000);
    d.push({date: date, json: element});
  });

  self.postMessage({
    list: d
  });
}

function error(err) {
  console.log('An error: '+err);
  close();
}
