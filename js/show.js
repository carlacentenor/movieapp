$(document).ready(function() {
  $('.user').sideNav();
  $('.button-menu').sideNav();
  
  var movieShow = localStorage.movie;
  var btnFavorite = $('.btn-favorite');
  var database = firebase.database();
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

  // Guardando info a la base de datos
  var referenciaUser = database.ref('users').child(localStorage.uid).child('favorite');

  btnFavorite.on('click', function() {
    var movie = {
      title: localStorage.movie,
    };
    referenciaUser.push(movie);

  });
});