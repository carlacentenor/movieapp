$(document).ready(function() {

  // setTimeout(function() {
  //   window.location.href = 'views/register.html';
  // }, 3000);

  // Función que obtiene la información de todas las películas Hindus que se ingresan
  function appiCall(titleMovie) {
    $.getJSON('http://www.omdbapi.com/?t=' + encodeURI(titleMovie) + '&apikey=1d12799f').then(function(response) {
      $('.title-movie').text(response.Title);
      $('.img-movie').attr('src', response.Poster);
      $('.sinopsis-movie').text(response.Plot);
      $('.actors-movie').text(response.Actors);
      $('.genre-movie').text(response.Genre);
      console.log(response);
      $('.release-year').text(response.Year);
    });
  }

  // Llamando a la función
  appiCall('krrish');

  // Initialize collapse button
  $(".button-collapse").sideNav();
  // Initialize collapsible (uncomment the line below if you use the dropdown variation)
  //$('.collapsible').collapsible();


});