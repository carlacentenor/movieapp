$(document).ready(function() {
  var database = firebase.database();
  var referenciaUser = database.ref('users').child(localStorage.uid).child('favorite');
  referenciaUser.on('value', function(datos) {
    users = datos.val();
    var arrayMovies = Object.values(users);
    for (j = 0; j < arrayMovies.length; j++) {
      var mov = arrayMovies[j].title;

      $.getJSON('http://www.omdbapi.com/?t=' + encodeURI(mov) + '&apikey=1d12799f').then(function(response) {
        $('.movie-favorite').append('<div class="contain"><img  src="' + response.Poster + '" ></div>');
      });
    }
  }, function(objetoError) {
    console.log('Error de lectura:' + objetoError.code);
  });
});