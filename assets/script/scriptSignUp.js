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

    const encoder = new TextEncoder();
    const data = encoder.encode(document.getElementById('signup_pwd').value);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const digest = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    xhr.open('POST','/new-user',true);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        console.log(xhr.responseText);
        success(xhr.responseText);
      }
    }
    xhr.onerror = error;

    xhr.send('usr_name='+username+'&pwd='+digest);
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

document.getElementById('signup_repeat_pwd').addEventListener('keypress', (event) => {
  if(event.key == 'Enter'){
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
  }
});
