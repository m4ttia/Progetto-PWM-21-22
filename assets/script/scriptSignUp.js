function signUpUser() {
  if(document.getElementById('signup_usr_name').value != '' && document.getElementById('signup_pwd').value != '' && document.getElementById('signup_repeat_pwd').value != ''){
    if(document.getElementById('signup_pwd').value == document.getElementById('signup_repeat_pwd').value){
      var username = document.getElementById('signup_usr_name').value;
      var xhr = new XMLHttpRequest();
      console.log(xhr);

      xhr.onload = notRegistered;
      xhr.onerror = error;
      xhr.open('GET','http://localhost:8080/single-user?usr_name='+ username);
      xhr.send();
    }else{
      var message = document.createElement('div');
      var text = document.createTextNode("Passwords not matching");
      message.appendChild(text);
      message.classList.add('invalid-feedback');
      message.id = 'message_rep_password';
      document.getElementById('signup_repeat_pwd').classList.add('is-invalid');
      document.getElementById('rep_password_div').appendChild(message);
    }
  }else{
    var message1 = document.createElement('div');
    var text1 = document.createTextNode("Compile the field");
    message1.appendChild(text1);
    message1.classList.add('invalid-feedback');
    message1.id = 'message_username';

    var message2 = document.createElement('div');
    var text2 = document.createTextNode("Compile the field");
    message2.appendChild(text2);
    message2.classList.add('invalid-feedback');
    message2.id = 'message_password';

    var message3 = document.createElement('div');
    var text3 = document.createTextNode("Compile the field");
    message3.appendChild(text3);
    message3.classList.add('invalid-feedback');
    message3.id = 'message_rep_password';

    if(document.getElementById('signup_usr_name').value == ''){
      document.getElementById('signup_usr_name').classList.add('is-invalid');
      document.getElementById('username_div').appendChild(message1);
    }


    if(document.getElementById('signup_pwd').value == ''){
      document.getElementById('signup_pwd').classList.add('is-invalid');
      document.getElementById('password_div').appendChild(message2);
    }

    if(document.getElementById('signup_repeat_pwd').value == ''){
      document.getElementById('signup_repeat_pwd').classList.add('is-invalid');
      document.getElementById('rep_password_div').appendChild(message3);
    }

  }
}

async function notRegistered() {
  if(this.responseText == ''){
    var username = document.getElementById('signup_usr_name').value;
    var xhr = new XMLHttpRequest();
    //var url = 'http://localhost:8080/new-user?';

    const encoder = new TextEncoder();
    const data = encoder.encode(document.getElementById('signup_pwd').value);
    const hash_pwd = await crypto.subtle.digest('SHA-256', data);
    //var params = 'usr_name='+ username +'&pwd='+ hash_pwd;

    xhr.open('GET','http://localhost:8080/new-user?usr_name='+ username +'&pwd='+ hash_pwd,true);
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
        success(xhr.responseText);
      }
    }
    xhr.onerror = error;

    xhr.send();
  }else {
    if(document.getElementById('message_username') != undefined){
      document.getElementById('signup_usr_name').classList.remove('is-invalid');
      document.getElementById('message_username').remove();
    }

    if(document.getElementById('message_password') != undefined){
      document.getElementById('signup_pwd').classList.remove('is-invalid');
      document.getElementById('message_password').remove();
    }

    if(document.getElementById('message_rep_password') != undefined){
      document.getElementById('signup_repeat_pwd').classList.remove('is-invalid');
      document.getElementById('message_rep_password').remove();
    }

    var message = document.createElement('div');
    var text = document.createTextNode("Username already used");
    message.appendChild(text);
    message.classList.add('invalid-feedback');
    message.id = 'message_username';
    document.getElementById('signup_usr_name').classList.add('is-invalid');
    document.getElementById('username_div').appendChild(message);
  }
}

function success(res) {
  var jsonObj = JSON.parse(res);
  console.log('User '+ jsonObj.username +' registered');
  var current_user = {
    user: jsonObj.username,
    cities: jsonObj.cities,
  };
  localStorage.setItem('current_user',JSON.stringify(current_user));

  location.reload();
}

function error(err) {
  console.log('An error: '+error);
}

document.getElementById('signup_button').addEventListener('click', (event) => {
  if(document.getElementById('message_username') != undefined){
    document.getElementById('signup_usr_name').classList.remove('is-invalid');
    document.getElementById('message_username').remove();
  }

  if(document.getElementById('message_password') != undefined){
    document.getElementById('signup_pwd').classList.remove('is-invalid');
    document.getElementById('message_password').remove();
  }

  if(document.getElementById('message_rep_password') != undefined){
    document.getElementById('signup_repeat_pwd').classList.remove('is-invalid');
    document.getElementById('message_rep_password').remove();
  }

  signUpUser();
});
