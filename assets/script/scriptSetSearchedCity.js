function setSearchedCity(city) {
  item = {
    city: city,
  }

  localStorage.setItem('searchedCity', JSON.stringify(item));
}
