function logout(){
  localStorage.setItem('current_user',null);
  document.getElementById('login_link').style.visibility = 'visible';
  document.getElementById('logout_link').style.visibility = 'hidden';
  document.getElementById('favourites_link').style.visibility = 'hidden';
  document.getElementById('user_label').innerHTML = '';
  location.reload();
}

document.getElementById('logout_link').addEventListener('click', (event) => {
  logout();
});
