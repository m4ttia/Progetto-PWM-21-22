async function loginUser() {
  if(document.getElementById('login_usr_name').value != '' && document.getElementById('login_pwd').value != ''){
    const encoder = new TextEncoder();
    const data = encoder.encode(document.getElementById('login_pwd').value);
    const hash_pwd = await crypto.subtle.digest('SHA-256', data);
    var xhr = new XMLHttpRequest();
    xhr.onload = login;
    xhr.onerror = error;

    xhr.open('GET','http://localhost:8080/single-user-login?usr_name='+ document.getElementById('login_usr_name').value +'&pwd='+ hash_pwd,true);
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
    var current_user = {
      user: jsonObj.username,
      cities: jsonObj.cities,
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
