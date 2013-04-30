var fs = require('fs')
  , util = require('util')
  , nu = require('nodeutil')
  , log = nu.logger.getInstance();

var tree_config = '../javascripts/tree.json';
var tree_html = '../tree.html';

var ul2 = '<li><span class="folder">%s</span><ul> %s</ul></li>';
var li = '<li><span class="file"><a href="%s">%s</a></span></li>';

var isHtmlTree = false;

function getHtml(json) {
  //console.log('>>', JSON.stringify(json));
  var this_line = '';
  if(json['type'] == 'folder') {
    var tmp = '';
    //console.log('size:%s', json['nodes'].length);
    for(var j = 0 ; j < json['nodes'].length ; j ++) {
      //console.log('Processing node: %s', JSON.stringify(json['nodes'][j]));
      tmp = tmp + getHtml(json['nodes'][j]); 
      //console.log('This tmp: %s', tmp);
    }
    //console.log("===>%s", tmp);
    this_line = util.format(ul2, json['name'], tmp);
    return this_line;
    //html.push(this_line);
  } else {
    if(json.link.endsWith('.md'))
      this_line = util.format(li, 'index.html?page='+json.link, json.name);
    else
      this_line = util.format(li, json.link, json.name);
    //log.info("-->%s", this_line);
    return this_line;
  }
  return html;
}

var file = fs.readFileSync(tree_config, 'utf8');
var data = JSON.parse(file);

var html = '<ul id="browser" class="filetree"><span style="font-size:+1">MiCloud Wiki</span>';
for(var j = 0 ; j < data.length ; j ++) {
  //log.info('%s>>>>', j);
  html += getHtml(data[j]);
}
html += '</ul>';

log.info(html);

fs.writeFileSync(tree_html, html, 'utf8');
