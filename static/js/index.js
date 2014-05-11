var Index = Index || (function() {
  var _container = null;
  var _target = null;
  var _img_path = '/static/img/';
  var _create = function(index) {
    if (_container === null || _container === undefined) {
      return;
    } else {
      _container.children().remove();
    }
    var ul = $('<ul></ul>');
    $.each(index, function(i, ei) {
      var li = _createItem();
      li.find('a').attr('href', ei.url);
      li.find('span').text(ei.name);
      var icon = _isSupported(ei.url);
      if (icon) {
        li.find('img').attr('src', _img_path + icon);
      } else {
        li.find('img').remove();
      }
      if (ei.folder) {
        li.find('i').addClass('fa fa-caret-down pull-right');
        $.each(ei.folder, function(fi, fei) {
          var subItem = $('<ul></ul>').append(_createItem());
          subItem.find('a').attr('href', fei.url);
          subItem.find('span').text(fei.name);
          icon = _isSupported(fei.url);
          if (icon) {
            subItem.find('img').attr('src', _img_path + icon);
          } else {
            subItem.find('img').remove();
          }
          li.append(subItem);
        });
      }
      ul.append(li);
    })
    _container.append(ul);
  }
  var _createItem = function() {
    return $('<li><div><a class="link"><img/><span></span><i></i></a></div></li>');
  }
  var _registerEvents = function() {
    _container.find('a.link').click(function(e) {
      e.preventDefault();
      if ($(this).parents('li').first().hasClass('active')) {
        return;
      }
      var url = $(this).attr('href');
      if (_isSupported(url) && _target !== null && _target !== undefined) {
        _target.find('.iframe-container').hide();
        var iframe = _target.find('.iframe-container[src="' + url + '"]');
        if (iframe.length > 0) {
          iframe.show();
        } else {
          var iframeNew = $('<iframe></iframe>').addClass('iframe-container').attr('src', url).show();
          _target.append(iframeNew);
        }
        _container.find('li').removeClass('active');
        $(this).parents('li').first().addClass('active');
      } else if (url) {
        window.open(url);
      }
    });
    _container.find('a.link i').click(function(e) {
      e.preventDefault();
      var self = $(this);
      var ul = self.parents('li').find('ul');
      ul.slideToggle(function() {
        self.removeClass('fa-caret-down fa-caret-right').addClass(ul.is(':visible') ? 'fa-caret-down' : 'fa-caret-right');
      });
      return false;
    });
  }
  var _isSupported = function(url) {
    if (!url) return false;
    if (url.match(/^http(s)?:\/\/docs\.google\.com\/.*\/document/)) { return 'google_document.png'; }
    if (url.match(/^http(s)?:\/\/docs\.google\.com\/.*\/spreadsheet/)) { return 'google_spreadsheet.png'; }
    if (url.match(/^http(s)?:\/\/drive\.google\.com/)) { return 'google_drive.png'; }
    if (url.match(/^http(s)?:\/\/\w+\.hackpad\.com/)) { return 'hackpad'; }
    if (url.match(/^http(s)?:\/\/ethercalc\.org\//)) { return 'ethercalc'; }
    return false;
  }

  return {
    init: function(container, target) {
      _container = container;
      _target = target;
    },
    create: function(index) {
      _create(index);
      _registerEvents();
    }
  }
})();

$(document).ready(function() {

  Index.init($('.index'), $('.content'));

  var getIndex = function(path) {
    $.get('/api/getindex/' + path, function(res) {
      Index.create(res);
      $(window).trigger('resize');
    });
  }

  var match = window.location.hash.match(/#(.+)/);
  var path = "";
  if (match != null) {
    path = match[1];
  }
  getIndex(path);

  $('.menu a:not(.dropdown-toggle)').click(function(e) {
    path = $(this).attr('href').match(/#(.+)/)[1];
    getIndex(path);
  });

  $(window).resize(function(ev){
    var height = $(window).height() - $('.navbar').height();
    $('.index').height(height);
    $('.content').height(height);
  });
});
