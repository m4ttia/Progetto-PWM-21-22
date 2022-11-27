async function loginUser() {
    if(document.getElementById('login_usr_name').value != '' && document.getElementById('login_pwd').value != ''){
      const encoder = new TextEncoder();
      const data = encoder.encode(document.getElementById('login_pwd').value);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer))
      const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      var xhr = new XMLHttpRequest();
      xhr.onload = login;
      xhr.onerror = error;
      xhr.open('GET','http://localhost:8080/login?usr_name='+ document.getElementById('login_usr_name').value +'&pwd='+ digest,true);
      xhr.send();
    }else {
      var message1 = document.createElement('div');
      var text1 = document.createTextNode("Compile the field");
      message1.appendChild(text1);
      message1.classList.add('invalid-feedback');
      message1.id = 'message_username_login';

      var message2 = document.createElement('div');
      var text2 = document.createTextNode("Compile the field");
      message2.appendChild(text2);
      message2.classList.add('invalid-feedback');
      message2.id = 'message_password_login';

      if(document.getElementById('login_usr_name').value == ''){
        document.getElementById('login_usr_name').classList.add('is-invalid');
        document.getElementById('username_div_login').appendChild(message1);
      }

      if(document.getElementById('login_pwd').value == ''){
        document.getElementById('login_pwd').classList.add('is-invalid');
        document.getElementById('password_div_login').appendChild(message2);
      }
    }
}

function login() {
  if(this.responseText != ''){
    var jsonObj = JSON.parse(this.responseText);
    console.log('User '+ jsonObj.username +' logged');
    var cities = jsonObj.cities;
    var formattedCities = new Array();

    cities.forEach((item, i) => {
      if(item.country != null){
        formattedCities.push({name: item.name, country: item.country});
      }else{
        formattedCities.push({name: item.name});
      }
    });

    var current_user = {
      user: jsonObj.username,
      cities: formattedCities,
    };
    localStorage.setItem('current_user',JSON.stringify(current_user));

    location.reload();
  }else{
    if(document.getElementById('message_username_login') != undefined){
      document.getElementById('login_usr_name').classList.remove('is-invalid');
      document.getElementById('message_username_login').remove();
    }

    if(document.getElementById('message_password_login') != undefined){
      document.getElementById('login_pwd').classList.remove('is-invalid');
      document.getElementById('message_password_login').remove();
    }
    var message1 = document.createElement('div');
    var text1 = document.createTextNode("User not found");
    message1.appendChild(text1);
    message1.classList.add('invalid-feedback');
    message1.id = 'message_username_login';
    document.getElementById('login_usr_name').classList.add('is-invalid');
    document.getElementById('username_div_login').appendChild(message1);
  }
}

function error(err) {
  console.log('An error: '+error);
}

document.getElementById('login_button').addEventListener('click', (event) => {
  if(document.getElementById('message_username_login') != undefined){
    document.getElementById('login_usr_name').classList.remove('is-invalid');
    document.getElementById('message_username_login').remove();
  }

  if(document.getElementById('message_password_login') != undefined){
    document.getElementById('login_pwd').classList.remove('is-invalid');
    document.getElementById('message_password_login').remove();
  }

  loginUser();
});

document.getElementById('login_pwd').addEventListener('keypress', (event) => {
  if(event.key == 'Enter'){
    if(document.getElementById('message_username_login') != undefined){
      document.getElementById('login_usr_name').classList.remove('is-invalid');
      document.getElementById('message_username_login').remove();
    }

    if(document.getElementById('message_password_login') != undefined){
      document.getElementById('login_pwd').classList.remove('is-invalid');
      document.getElementById('message_password_login').remove();
    }

    loginUser();
  }
});
