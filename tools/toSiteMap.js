var fs = require('fs')
  , nu = require('nodeutil')
  , util = require('util')

var path = '../html';
var mdfilepath = '../mdfiles';
var sitemappath = '../site-map.xml';

var tpl = fs.readFileSync('./site-map-template.xml', 'utf8');
var map = '<url><loc>%s</loc></url>';
var maps = '';
fs.readdir(mdfilepath, function(e, files) {
  files.forEach(function(file, i) {
    console.log('Processing of %s (md file: %s)', file, file.endsWith('.md'));
    if(file.endsWith('.md')) {
      maps += util.format(map, 'http://doc.micloud.tw/index.html?page='+file);
    }
  });

  var out = util.format(tpl, maps);
  fs.writeFileSync(sitemappath, out, 'utf8');
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
