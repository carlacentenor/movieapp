$(document).ready(function() {
  $('.user').sideNav();
  $('.button-collapse').sideNav();

  var movieShow = localStorage.movie;
  
 
  // Función que obtiene la información de todas las películas Hindus que se ingresan
  function appiCall(titleMovie) {
    $.getJSON('http://www.omdbapi.com/?t=' + encodeURI(titleMovie) + '&apikey=1d12799f').then(function(response) {
      $('.title-movie').text(response.Title);
      $('.img-movie').attr('src', response.Poster);
      $('.sinopsis-movie').text(response.Plot);
      $('.actors-movie').text(response.Actors);
      $('.genre-movie').text(response.Genre);
      $('.year').text(response.Year);
      $('.time').text(response.Runtime);
      $('.star').text(response.imdbRating);
      // $('iframe').attr('src', trailer());
    });
  }
  // Llamando a la función
  appiCall(movieShow);
});