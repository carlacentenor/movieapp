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

  /** yolanda seccion de yoli *-* */

  function time() {
    $('#yoliSuper').delay(4000).fadeIn();
    $('#yoliSuper1').delay(4001).fadeOut();
}
  time();
});