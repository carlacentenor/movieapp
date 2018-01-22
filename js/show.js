$(document).ready(function() {
  $('.user').sideNav();
  $('.button-menu').sideNav();

  var movieShow = localStorage.movie;
  var btnFavorite = $('.btn-favorite');
  var database = firebase.database();
  // Función que obtiene la información de todas las películas Hindus que se ingresan
  function appiCall(titleMovie) {
    $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(titleMovie) + '&apikey=1d12799f').then(function(response) {
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
  var favoriteMovie = false ;


  referenciaUser.on('value', function(datos) {
    users = datos.val();
    var arrayMovies = Object.values(users);
    for (i = 0 ; i < arrayMovies.length;i++) {
      if (arrayMovies[i].title === localStorage.movie) {
        btnFavorite.attr('disabled', 'disabled');
      }
    }
  });
  

  btnFavorite.on('click', function() {
    if (favoriteMovie = true) {
      var movie = {
        title: localStorage.movie,
      };

      referenciaUser.push(movie);
      Materialize.toast('Add in my list!', 4000);
    } else {
      console.log('ya tienes esta película');
    }
  });
});