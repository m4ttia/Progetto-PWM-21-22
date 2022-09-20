function changeMode() {
  if(document.getElementsByTagName('html')[0].className == "light"){
    document.getElementById('dark_label').innerHTML = 'Disable dark mode';
    item = {
      dark: true,
      date: Date.now(),
    }
    localStorage.setItem('mode',JSON.stringify(item));
  }else {
    document.getElementById('dark_label').innerHTML = 'Enable dark mode';
    item = {
      dark: false,
      date: Date.now(),
    }
    localStorage.setItem('mode',JSON.stringify(item));
  }
  darkmode.toggleDarkMode();
}

function setMode(){
  if(localStorage.getItem('mode') != null){
    if(JSON.parse(localStorage.getItem('mode')).dark == true){
      document.getElementsByTagName('body')[0].className = 'dark';
      document.getElementById('dark_label').innerHTML = 'Disable dark mode';
      document.getElementById('flexSwitchCheckDefault').checked=true;
    }else{
      document.getElementsByTagName('body')[0].className = 'light';
      document.getElementById('dark_label').innerHTML = 'Enable dark mode';
      document.getElementById('flexSwitchCheckDefault').checked=false;
    }
  }
}
document.getElementById('flexSwitchCheckDefault').addEventListener('click',changeMode);
