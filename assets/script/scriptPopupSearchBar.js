document.getElementById('searchBar').addEventListener('click', (event) => {
  var popup = document.getElementById("myPopup");
  popup.style.visibility = 'visible';
  popup.style.cursor = 'pointer';
});

document.getElementById('myPopup').addEventListener('click', (event) => {
  var popup = document.getElementById("myPopup");
  popup.style.visibility = 'hidden';
  popup.style.cursor = 'default';
})

document.getElementById('searchBar').addEventListener('keydown', (event) => {
  var popup = document.getElementById("myPopup");
  popup.style.visibility = 'hidden';
  popup.style.cursor = 'default';
});
