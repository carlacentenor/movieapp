$(document).ready(function() {
  // función de modal
  $('.modal').modal();

  var config = {
    apiKey: 'AIzaSyCU1vcZK3J7iQKGNuz5mEhh1ptPxY3U4yo',
    authDomain: 'appmovie-c18a2.firebaseapp.com',
    databaseURL: 'https://appmovie-c18a2.firebaseio.com',
    projectId: 'appmovie-c18a2',
    storageBucket: 'appmovie-c18a2.appspot.com',
    messagingSenderId: '16618341901'
  };
  firebase.initializeApp(config);

  var emailLogin = $('.name-login');
  var passwordLogin = $('.password-login');
  var nameRegister = $('.name-register');
  var emailRegister = $('.email-register');
  var passwordRegister = $('.password-register');
  var confirmPass = $('.confirm-password');
  var check = $('.checkbox');
  // botones
  var btnSubmit = $('#btn-submit');
  var btnFacebook = $('#btn-facebook');
  var btnEnter = $('#btn-enter');

  var validatePassword = false;
  var validateConfirm = false;
  var validateEmail = false;
  var validateName = false;
  var validateCheckbox = false;

  
  emailRegister.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });


  passwordRegister.on('keyup', function(event) {
    if (passwordRegister.val().length >= 6) {
      validatePassword = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  nameRegister.on('keyup', function(event) {
    if (nameRegister.val()) {
      validateName = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  
  confirmPass.on('keyup', function(event) {
    if (passwordRegister.val() === confirmPass.val()) {
      validateConfirm = true;
      validateRegister();
    } else {
      inactiveRegister();
    }
  });

  


  // Login
  emailLogin.on('keyup', function(event) {
    var EMAILUSER = /^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,3}$/;

    if (EMAILUSER.test($(this).val())) {
      validateEmail = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });

  passwordLogin.on('keyup', function(event) {
    if (passwordLogin.val()) {
      validatePassword = true;
      validateUser();
    } else {
      inactiveUser();
    }
  });


  function validateUser() {
    if (validateEmail && validatePassword) {
      btnEnter.attr('disabled', false);
    }
  }


  function validateRegister() {
    if (validateEmail && validatePassword && validateName && validateCheckbox && validateConfirm) {
      btnSubmit.attr('disabled', false);
    }
  }

  function inactiveRegister() {
    btnSubmit.attr('disabled', 'disabled');
  }

  function inactiveUser() {
    btnEnter.attr('disabled', 'disabled');
  }
  
  
  btnSubmit.click(function() {
    firebase.auth().createUserWithEmailAndPassword(emailRegister.val(), passwordRegister.val())
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
      });

    firebase.auth().onAuthStateChanged(function(user) {
      var userNew = nameRegister.val();    
      if (user) {
        // Ingresando datos en la base de datos
        firebase.database().ref('users/' + user.uid).set({
          name: userNew,
          email: user.email,
          uid: user.uid,
          profilePhoto: 'https://firebasestorage.googleapis.com/v0/b/our-kids-47772.appspot.com/o/userdefault.png?alt=media&token=ff44fe35-e341-45e5-914c-05878f0d72dd',
        }).then(user => {
          console.log('Usuario Registrado');
        });
      } else {
        console.log('Error al registrar');
      }
    });
  });
});