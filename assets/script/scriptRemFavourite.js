function remFavourite(name,country) {
  var current_user = localStorage.getItem('current_user');
  if (current_user != null && JSON.parse(current_user) != null && JSON.parse(current_user).user == document.getElementById('user_label').innerHTML) {
    var username = JSON.parse(current_user).user;
    var cities = JSON.parse(current_user).cities;

    for(let i = 0; i < cities.length; i++){
      if(cities[i].name == name && cities[i].country == country){
        cities.splice(i,1);
        break;
      }
    }

    var item = {
      user: username,
      cities: cities
    };

    localStorage.setItem('current_user',JSON.stringify(item));
    document.getElementById('line'+name+''+country).remove();

    var xhr = new XMLHttpRequest();

    xhr.open('PUT','/rem-city-from-user',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onerror = error;

    xhr.send('usr_name='+username+'&city='+name+', '+country);
  }else {
    location.reload();
  }
}
