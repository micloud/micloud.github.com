var fs = require('fs')
  , nu = require('nodeutil')
  , util = require('util')
  , marked = require('marked')
var path = '../mdfiles';
var outputpath = '../';
var tplpath = './';

//var files = fs.readdirSync(path);
var mdfiles = new Array();
var links = '<h1 style="vertical-align:middle"><img src="images/wiki-logo.png" width="128px"/><a href="http://doc.micloud.tw">MiCloud Wiki Document</a></h1>';
var body = '';

var html_a = '<span style="width:100px"><a href="index.html?page=%s">%s</a></span> &nbsp;';
var html_page_break = '<hr style="border-top: 1px dotted #f00;"/>';
//var html_page_break = '<img style="width:100%;height:36px" src="images/break.png"/>';
var html_body = '<p  id="%s"><h1><img width="50px" src="images/book.png"/>%s</h1><br/>%s</p>' + html_page_break;
var tpl = fs.readFileSync(tplpath + '/template.html', 'utf8');

// files.forEach(function(v, i){
//   console.log('Processing %s....', v);
//   if(v.endsWith('.md')) {
//     //links += util.format(html_a, v, v);
//     var title = '頁面：<a href="index.html?page=' + v + '">' + v + '</a>';
//     var content = mkup(fs.readFileSync(path + '/' + v, 'utf8'));
//     content = content.replace(/\/index\.html\?page=/g,'html/').replace(/\.md\"/g, '.html"');
//     body += util.format(html_body, v, title, content);
//   }
// });

var tree = JSON.parse(fs.readFileSync('../javascripts/tree.json'));
for(var i = 0 ; i < tree.length ; i++) {
  var out = convertNode(tree[i]);
  body += out;
}

function convertNode(node) {
  var html = '';
  if(node.type == 'folder') {
    for(var i = 0 ; i < node.nodes.length; i++) {
      html += convertNode(node.nodes[i]);
    }
  } else {
    var title = '頁面：<a href="html/' + node.link.replace(/\.md/g,'.html') + '">' + node.name + '</a>'+
      '&nbsp;<a href="index.html?page=' + node.link + '">('+node.link+')</a>' +
      '<a href="#' + node.link + '"></a>';
    if(!node.link.endsWith('.md')) {
      //By pass
    } else {
      var content = mkup(fs.readFileSync(path + '/' + node.link, 'utf8'));
      content = content.replace(/index\.html\?page=/g,'html/');
      content = content.replace(/index\.html\?/g,'html/');
      content = content.replace(/\.md\"/g, '.html"');
      html += util.format(html_body, node.link, title, content);
    }
  }
  return html;
}



var out = util.format(tpl, links + '<hr/>' + body);
fs.writeFile(outputpath + '/onepage.html', out, 'utf8', function(err){
  if(err) console.log(err);
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
