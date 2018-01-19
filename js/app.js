$(document).ready(function() {
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
  
  
  // variables Login
  
  var emailLogin = $('.email-login');
  var passwordLogin = $('.password-login');
  
  
  // Register
  
  var nameRegister = $('.name-register');
  var emailRegister = $('.email-register');
  var passwordRegister = $('.password-register');
  var confirPass = $('.confirm-register');
  var check = $('.checkbox-term');
  
  // buttons
  
  var btnSubmit = $('#btn-submit');
  var btnEnter = $('#btn-enter');
  var btnFacebook = $('#btn-facebook');
  
  var validatePassword = false;
  var validateEmail = false;
  var validateName = false;
  var validateChek = false;
  var validateConfirmPass = false;
  
  
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
  
  confirPass.on('keyup', function(event) {
    if (confirPass.val() === passwordRegister.val()) {
      validateConfirmPass = true;
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
  
  
  check.on('click', function(event) {
    if (event.target.checked) {
      validateChek = true;
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
  
  // Autentificación por email y password
    
  btnEnter.click(function(event) {
    event.preventDefault();
  
    var email = emailLogin.val();
    var password = passwordLogin.val();
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        // Handle Errors here.
          
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode || errorMessage) {
          alert('contraseña y/o email incorrecto');
        }
      });
  
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        localStorage.uid = user.uid;
        $(location).attr('href', 'views/home.html');
      }
    });
  });
  
  
  // Funciones de validadión
  
  function validateUser() {
    if (validateEmail && validatePassword) {
      btnEnter.attr('disabled', false);
    }
  }
  
  function inactiveUser() {
    btnEnter.attr('disabled', 'disabled');
  }
  
  
  function validateRegister() {
    if (validateEmail && validatePassword && validateName && validateConfirmPass && validateChek) {
      btnSubmit.attr('disabled', false);
    }
  }
  
  function inactiveRegister() {
    btnSubmit.attr('disabled', 'disabled');
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
          profilePhoto: '../assets/images/user.png',
        }).then(user => {
          console.log('Usuario Registrado');
          window.location.href = 'views/home.html';
        });
      } else {
        console.log('Error al registrar');
      }
    });
  });
  
  
  // Login por facebook
  
  
  var providerFacebook = new firebase.auth.FacebookAuthProvider();
  btnFacebook.on('click', function() {
    firebase.auth().signInWithPopup(providerFacebook).then(function(result) {
      var token = result.credential.accessToken;
  
      var user = result.user;
  
      firebase.database().ref('users/' + user.uid).set({
        name: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePhoto: user.photoURL,
        
      }).then(
        user => {
         
          $(location).attr('href', 'views/home.html');
        });
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  });
  
  // Cerrar Sesión
  
  $('.close').click(function() {
    firebase.auth().signOut().then(function() {
      $(location).attr('href', '../index.html');
    }).catch(function(error) {
      
    });
  });

  // Añade Comentarios
  var btn = $('.btn-send');
  var inputMsg = $('.input-msg');

  inputMsg.focus();

  inputMsg.on('keydown', function() {
    btn.removeClass('hide');
  });

  btn.on('click', function() {
    if (inputMsg.val() !== '') {
      var msg = $('<p/>');
      var userBox = $('<div/>');
      var userInfo = $('<div/>');
      var userPic = $('<img/>');
      var userName = $('<p/>');
      msg.text(inputMsg.val());
      userBox.addClass('user-box');
      userPic.addClass('circle img-user user-login in-block');
      userName.addClass('user-name in-block');
      userName.text($('.user-name').text());
      msg.appendTo(userBox);
      userPic.appendTo(userInfo);
      userName.appendTo(userInfo);
      userInfo.appendTo(userBox);
      userInfo.insertBefore(msg);
      userBox.appendTo($('.container-comment'));
      inputMsg.val('');
    }
  });
});
