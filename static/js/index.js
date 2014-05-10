$(document).ready(function() {
  var render_index = function(path) {
    $.get('/api/getindex/' + path, function(res) {
      $('.index').children().remove();
      $.each(res, function(index, r) {
        var li = $('<li></li>').html($('<a></a>').attr('href', r.url).text(r.name));
        $('.index').append(li);
      });
    });
  }

  var match = window.location.hash.match(/#(.+)/);
  var path = "";
  if (match != null) {
    path = match[1];
  }
  render_index(path);

  $('.menu a:not(.dropdown-toggle)').click(function(e) {
    path = $(this).attr('href').match(/#(.+)/)[1];
    render_index(path);
  });
});
