window.addEventListener('load', (event) => {
  var current_user = localStorage.getItem('current_user');
  if(current_user != null && JSON.parse(current_user) != null)
    document.getElementById('add_fav_link').style.visibility = 'visible';
  else
    document.getElementById('add_fav_link').style.visibility = 'hidden';
});
