document.getElementById('login_link').addEventListener('click', (event) => {
  var current_user = localStorage.getItem('current_user');
  if (current_user != null && JSON.parse(current_user) != null) {
    location.reload();
  }
});
