function addFavourite() {
  var current_user = localStorage.getItem('current_user');
  if (current_user != null && JSON.parse(current_user) != null && JSON.parse(current_user).user == document.getElementById('user_label').innerHTML) {
    var username = JSON.parse(localStorage.getItem('current_user')).user;
    var cities = JSON.parse(localStorage.getItem('current_user')).cities;
    let c = document.getElementById('cityName').innerHTML;
    let cityParams = c.split(', ');
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
      var line = document.createElement('ul');
      line.setAttribute('class','dropdown-item d-flex justify-content-center');
      line.style.listStyle = 'none';
      line.setAttribute('id','line'+cityParams[0]+''+cityParams[1]);

      var city = document.createElement('li');
      city.setAttribute('class','page-item');

      var aTag = document.createElement('a');
      aTag.setAttribute('href',"./city.html?city="+cityParams[0]+","+cityParams[1]);
      aTag.innerText = cityParams[0]+", "+cityParams[1];
      aTag.setAttribute('class','page-link');

      city.appendChild(aTag);
      line.appendChild(city);

      var icon = document.createElement('li');
      icon.setAttribute('class','page-item');

      var rem = document.createElement('a');
      rem.setAttribute('href','#');
      rem.setAttribute('class','page-link');
      rem.setAttribute('onclick','remFavourite("'+cityParams[0]+'","'+cityParams[1]+'")');

      var x = document.createElement('i');
      x.setAttribute('class','bi bi-x-lg');

      rem.appendChild(x);

      icon.appendChild(rem);
      line.appendChild(icon);

      dropdownMenu.appendChild(line);

      var xhr = new XMLHttpRequest();

      xhr.open('PUT','/add-city-to-user',true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onerror = error;

      xhr.send('usr_name='+username+'&city='+c);
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
