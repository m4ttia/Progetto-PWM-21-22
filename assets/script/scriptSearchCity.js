document.getElementById('search').addEventListener('click', (event) => {
  if(document.getElementById('searchBar').value != ''){
    let city = document.getElementById('searchBar').value;
    let words = city.split(' ');
    let searchedCity = '';

    for (var i = 0; i < words.length; i++) {
      if(i > 0)
        searchedCity += '_';
      searchedCity += words[i][0].toUpperCase();
      for (var j = 1; j < words[i].length; j++)
        searchedCity += words[i][j].toLowerCase();
    }
    location.replace('./city.html?city='+searchedCity);
  }
});
