$(document).ready(function() {
  $('.modal').modal();
  $('.dropdown-button').dropdown();      
  $('.button-collapse').sideNav();

  $('#segunda').click(function() {
    window.location.href = 'segunda.html';
  });

  $('.slider').slider();

  $('#tercera').click(function() {
    window.location.href = 'tercera.html';
  });
});