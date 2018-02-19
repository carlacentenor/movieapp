$(document).ready(function() {
  $('.user').sideNav();
  $('.button-collapse').sideNav();
  $('.slider').slider();
  var database = firebase.database();
  var reference = database.ref('users');

  // obtenemos datos del usuario
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var uid = user.uid;
      var name = user.displayName;
      var email = user.email;
      var photoUrl = user.photoURL;
      localStorage.uid = uid;
      if (name === null) {
        var database = firebase.database();
        var reference = database.ref('users');
        reference.on('value', function(datos) {
          users = datos.val();
          var arrayUser = Object.values(users);
          for (i = 0; i < arrayUser.length; i++) {
            if (arrayUser[i].uid === uid) {
              var id = arrayUser[i];

              $('.user-name').text(id.name);
              $('.email-user').text(id.name);
              $('.img-user').attr('src', id.profilePhoto);
              localStorage.uid = id.uid;
            }
          }
        }, function(objetoError) {
          console.log('Error de lectura:' + objetoError.code);
        });
      } else {
        $('.user-name').text(name);
        localStorage.uid = uid;
        $('.img-user').attr('src', photoUrl);
      }
    } else {
      // No user is signed in.
    }
  });


  // Busqueda por generos
  var genreAction = $('.action');
  var genreRomance = $('.romance');
  var genreComedy = $('.comedy');
  var genreDrama = $('.drama');
  var genreMusical = $('.musical');
  var genreEstrenos = $('.estrenos');

  var selectionGenre;
  genreAction.on('click', function() {
    selectionGenre = 'Action';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  genreRomance.on('click', function() {
    selectionGenre = 'Romance';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  genreDrama.on('click', function() {
    selectionGenre = 'Drama';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  genreMusical.on('click', function() {
    selectionGenre = 'Musical';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  genreComedy.on('click', function() {
    selectionGenre = 'Comedy';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  genreEstrenos.on('click', function() {
    selectionGenre = 'Estrenos';
    localStorage.genre = selectionGenre;
    window.location.href = 'genre.html';
  });
  /** funcionabilidad del input de la ventana home y genre ? */
  $('.btn-search1').click(function() {
    $("#text-search2").toggle();
    var searchOn = $('#text-search2').val().toLowerCase();
    for (var i = 0; i < movies.length; i++) {
      if (searchOn === movies[i].title) {
        localStorage.movie = movies[i].title;
        window.location.href = 'infomovie.html';
      } 
    } 
  });
});