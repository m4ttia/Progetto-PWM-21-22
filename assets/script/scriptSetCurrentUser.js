function setCurrentUser() {
  var current_user = localStorage.getItem('current_user');
  if(current_user != null && JSON.parse(current_user) != null){
    document.getElementById('logout_link').style.visibility = 'visible';
    document.getElementById('favourites_link').style.visibility = 'visible';
    document.getElementById('login_link').style.visibility = 'hidden';
    document.getElementById('user_label').innerHTML = JSON.parse(current_user).user;
    let dropdownMenu = document.getElementById('favourites');
    JSON.parse(current_user).cities.forEach((item, i) => {
      var line = document.createElement('ul');
      line.setAttribute('class','dropdown-item pagination');

      var city = document.createElement('li');
      city.setAttribute('class','page-item');

      var aTag = document.createElement('a');
      aTag.setAttribute('href',"./city.html?city="+item.name+","+item.country);
      aTag.innerText = item.name+", "+item.country;
      aTag.setAttribute('class','page-link');

      city.appendChild(aTag);
      line.appendChild(city);

      var icon = document.createElement('li');
      icon.setAttribute('class','page-item');

      var rem = document.createElement('a');
      rem.setAttribute('href','#');
      rem.setAttribute('class','page-link');

      var x = document.createElement('i');
      x.setAttribute('class','bi bi-x-lg');

      rem.appendChild(x);

      icon.appendChild(rem);
      line.appendChild(icon);

      dropdownMenu.appendChild(line);
    });
  }
}

window.addEventListener('load', (event) => {
  setCurrentUser();
});
