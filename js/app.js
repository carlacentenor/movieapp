$(document).ready(function() {
  // setTimeout(function() {
  //   window.location.href = 'views/register.html';
  // }, 3000);

  // Función que obtiene la información de todas las películas Hindus que se ingresan
 
  // Llamando a la función
  

  // Initialize collapse button

  // Añade Comentarios
  var btn = $('.btn-send');
  var inputMsg = $('.input-msg');
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
      userBox.addClass('border-sha');
      userPic.addClass('circle img-user user-login in-block');
      userName.addClass('user-name in-block');
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
