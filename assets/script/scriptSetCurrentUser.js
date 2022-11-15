function setCurrentUser() {
  var current_user = localStorage.getItem('current_user');
  if(current_user != null && JSON.parse(current_user) != null){
    document.getElementById('logout_link').style.visibility = 'visible';
    document.getElementById('favourites_link').style.visibility = 'visible';
    document.getElementById('login_link').style.visibility = 'hidden';
    document.getElementById('user_label').innerHTML = JSON.parse(current_user).user;
  }
}

window.addEventListener('load', (event) => {
  setCurrentUser();
});
