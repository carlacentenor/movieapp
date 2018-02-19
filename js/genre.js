$(document).ready(function() {
  var containerGenres = $('.container-movies');
  $('.title-genre').text(localStorage.genre);
 
  var arrayGenre = [];
  for (i = 0 ;i < movies.length ;i++) {
    if (movies[i]['genre'] === localStorage.genre) {
      arrayGenre.push(movies[i].title);
    }
  }


  for (j = 0 ; j < arrayGenre.length ;j++) {
    var mov = arrayGenre[j];
    $.getJSON('https://www.omdbapi.com/?t=' + encodeURI(mov) + '&apikey=1d12799f').then(function(response) {
      containerGenres.append('<div class="contain center-align-" data-movie="' + response.Title + '" ><div><img  class="img-size" src="' + response.Poster + '" ></div></div>');
    });
  }

  $(document).on('click', '.contain', function() {
    var movieSearch = $(this).data('movie');
    localStorage.movie = movieSearch;
    window.location.href = 'infomovie.html';
  });

  $('.btn-search1').click(function() {
    var searchOn = $('#text-search2').val();
    for (var i = 0; i < movies.length; i++) {
      if (searchOn === movies[i].title) {
        localStorage.movie = movies[i].title;
        window.location.href = 'infomovie.html';
      } 
    } 
  });
});
 
  