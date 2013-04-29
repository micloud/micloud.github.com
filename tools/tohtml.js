var fs = require('fs')
  , marked = require('marked')
  , nu = require('nodeutil')
  , util = require('util')

var path = '.';

var tpl = fs.readFileSync(path + '/template-single-page.html', 'utf8');

fs.readdir(path, function(e, files) {
  files.forEach(function(file, i) {
    console.log('Processing of %s (md file: %s)', file, file.endsWith('.md'));
    if(file.endsWith('.md')) {
      fs.readFile(file, 'utf8', function(e, d) {
        if(e) console.log(e);
        var output = mkup( d );
        output = output.replace(/\/index\.html\?page=/g,'').replace(/\.md\"/g, '.html"');;
        output = util.format(tpl, output);
        fs.writeFileSync( file.replace(/\.md/g,'.html'), output, 'utf8', function(err){
          if(err) {
            console.log(err);
          } else {
            console.log('%s write done...', file.replace(/\.md/g,'.html'));
          } 
        });
      });
    }
  });
});

function mkup(txt) {
  marked.setOptions({
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
  });
  return marked(txt);
}
