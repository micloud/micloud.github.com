var config={
  user:'micloud',
  project:'micloud.github.com'
};

var mdfilepath = '/mdfiles';

$(document).ready(function(){

  $('#search').load('search.html');

  var p = getURLParameter('page');
  
  if(p && getURLParameter('page').split('#')[0]) {
    p = getURLParameter('page').split('#')[0];
    p = mdfilepath + '/' + p;
    
    $('#pagename').html(p.split('.md')[0]);
    
    $('#md').load(p, function(){
      $('#page').html(htmlUnescape(marked($('#md').html(), mkdOpt))); 
      //Set link image
      $('#page a').each(function(){
        $(this).append('<img width="15px" src="images/link.png"/>');
      });
      //Set h1 image
      $('h1').prepend('<img src="images/book.png" width="30px"/>&nbsp;');
    });
    
  } else {
    p = 'Main.md';
    $('#pagename').html('Welcome');
    
    $('#md').load(mdfilepath + '/Main.md', function(){
      $('#page').html(htmlUnescape(marked($('#md').html())));  
    });
  }

  $('#show').click(function() { 
    $.blockUI({ 
      message: $('#md'), 
      onOverlayClick: $.unblockUI,
      css: { 
        border: 'none', 
        padding: '15px', 
        backgroundColor: '#000', 
        '-webkit-border-radius': '10px',  
        '-moz-border-radius': '10px', 
        opacity: .8, 
        color: '#fff', 
        "vertical-align": "left",
        top:  "30px",
        left: ($(window).width() - 810) /2 + 'px', 
        width: '810px' 
      }
    }); 
  });

  $('#edit').click(function(){
    var edit_url = 'https://github.com/' + config.user + '/' + config.project + '/edit/master/' + p;
    window.open(edit_url);
  });

  $('#new').click(function(){
    var new_url = 'https://github.com/' + config.user + '/' + config.project + '/new/gh-pages';
    window.open(edit_url);
  });

  if(login_session) {
    var user= JSON.parse(login_session);

    if(user.result && user.result.resultCode == '100' && user.result.resultValue.memberInfo.userId == 'micloud') {
      $('#edit').show();
      $('#new').show();
      $('#show').show();
      showLogout();
    } else {
      showLogin();
    }
  } else {
    showLogin();
  }

  function showLogin() {
    $('#login').click(function(){
      document.location = 'https://portal.micloud.tw/login'
    });
    $('#login').show();
  }

  function showLogout() {
    $('#logout').click(function(){
      document.location = 'https://portal.micloud.tw/logout'
    });
    $('#logout').show();
  }
}); //End document.ready

var mkdOpt = {
  gfm: true,
  tables: true,
  breaks: true,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  langPrefix: 'language-',
  highlight: function(code, lang) {
    if (lang === 'js') {
      return highlighter.javascript(code);
    }
    return code;
  }
};

function getURLParameter(name) {
  var u = decodeURI(
    (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
  );

  if(u == 'null' || u == 'NULL') 
    return null;
  else
    return u;
}

function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

function htmlUnescape(value){
    return String(value)
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&');
}
