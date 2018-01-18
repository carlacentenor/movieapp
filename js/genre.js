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
    $.getJSON('http://www.omdbapi.com/?t=' + encodeURI(mov) + '&apikey=1d12799f').then(function(response) {
      containerGenres.append('<div class="contain" data-movie="' + response.Title + '" ><div><img  src="' + response.Poster + '" ></div></div>');
    });
  }

  $(document).on('click', '.contain', function() {
    var movieSearch = $(this).data('movie');
    localStorage.movie = movieSearch;
    window.location.href = 'cuarta.html';
  });
});
 
  