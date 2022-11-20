function addFavourite() {
  var current_user = localStorage.getItem('current_user');
  if (current_user != null && JSON.parse(current_user) != null) {
    var username = JSON.parse(localStorage.getItem('current_user')).user;
    var cities = JSON.parse(localStorage.getItem('current_user')).cities;
    let city = document.getElementById('cityName').innerHTML;
    let cityParams = city.split(', ');
    let found = false;

    for (var i = 0; i < cities.length; i++){
      if(cities[i].name == cityParams[0]){
        if (cityParams.length > 1) {
          if (cities[i].country == cityParams[1]) {
            found = true;
            break;
          }
        }else if(cities[i].country == null){
          found = true;
          break;
        }
      }
    };

    if(!found){
      var updatedCities = new Array(cities.length + 1);

      for(var i = 0; i < cities.length; i++)
        updatedCities[i] = cities[i];

      if(cityParams.length > 1){

        updatedCities[cities.length] = {name: cityParams[0], country: cityParams[1]};

        var item = {
          user: JSON.parse(localStorage.getItem('current_user')).user,
          cities: updatedCities
        };
        localStorage.setItem('current_user',JSON.stringify(item));
      }else{

        updatedCities[cities.length] = {name: cityParams[0]};

        var item = {
          user: JSON.parse(localStorage.getItem('current_user')).user,
          cities: updatedCities
        };
        localStorage.setItem('current_user',JSON.stringify(item));
      }

      let length = JSON.parse(localStorage.getItem('current_user')).cities.length;

      let dropdownMenu = document.getElementById('favourites');
      var aTag = document.createElement('a');
      aTag.setAttribute('href',"./city.html?city="+JSON.parse(localStorage.getItem('current_user')).cities[length-1].name+","+JSON.parse(localStorage.getItem('current_user')).cities[length-1].country);
      aTag.innerText = JSON.parse(localStorage.getItem('current_user')).cities[length-1].name+", "+JSON.parse(localStorage.getItem('current_user')).cities[length-1].country;
      aTag.setAttribute('class','dropdown-item');
      dropdownMenu.appendChild(aTag);

      var xhr = new XMLHttpRequest();

      xhr.open('PUT','/add-city-to-user',true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onerror = error;

      xhr.send('usr_name='+username+'&city='+city);
    }
  }else {
    location.reload();
  }
}

function error(err) {
  console.log('An error: ' + err);
}

document.getElementById('add_fav_link').addEventListener('click', (event) => {
  addFavourite();
});
