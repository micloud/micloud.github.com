var fs = require('fs')
  , util = require('util')
  , marked = require('marked')
  , nu = require('nodeutil')
  , log = nu.logger.getInstance()
  , j2t = require('json2tree')
  , h2t = require('./jsHtmlToText')
  , RSS = require('rss')
  , Author = 'MiCloud'

/**
 * Translate all wikitpage markdown files to html
 * Required configures:
 * 1. mdfilepath: the markdown file folder that will read *.md files from this folder
 * 2. htmlpath: the output html path
 * 3. pageTemplate: the template page path for layout the output pages
 */
exports.mds2html = function(mdfilepath, htmlpath, pageTemplate) {
  var tpl = fs.readFileSync(pageTemplate, 'utf8');
  fs.readdir(mdfilepath, function(e, files) {
    files.forEach(function(file, i) {
      console.log('Processing of %s (md file: %s)', file, file.endsWith('.md'));
      if(file.endsWith('.md')) {
        fs.readFile(mdfilepath + '/' + file, 'utf8', function(e, d) {
          if(e) console.log(e);
          var output = mkup( d );
          // Chamge all wikitpage js page link to real link
          output = output.replace(/\/index\.html\?page=/g,'html/').replace(/\.md\"/g, '.html"');
          // Chamge the jspwiki convert error tags to correct path
          output = output.replace(/[\"]images/g,'"/images');
          // Change the all related resource path absolute path, cause the real mdfiles and output html files are move to their folders
          output = output.replace(/\'images/g,'\'/images');

          // Merge with title and template
          var title = file.replace(/\+/g, ' ').replace(/\.md/g,'');
          output = util.format(tpl, title, title, title , output);
          // Write to file
          fs.writeFileSync( htmlpath + '/' + file.replace(/\.md/g,'.html'), output, 'utf8', function(err){
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
}

/**
 * Convert the json format to ul/li tree
 * @jsonCfg {JSON} tree configure content with json format (see: https://github.com/peihsinsu/json2tree)
 * @outfilepath {String} the output file path
 */
exports.json2ultree = function(jsonCfg, outfilepath){
  var rtn = j2t.toUlTree(jsonCfg);
  fs.writeFileSync(outfilepath, rtn, 'utf8');
}

/**
 * Convert md files to one page
 * @treeCfg {String} the menu tree configure
 * @mdfolderpath {String} the folder where markdown files exist
 * @outputpath {String} the output file path
 * @tplpath {String} the template file path
 */
exports.onepage = function(treeCfg, mdfolderpath, outputpath, tplpath){
  var mdfiles = new Array();
  var links = '<h1 style="vertical-align:middle"><img src="images/wiki-logo.png" width="128px"/><a href="http://doc.micloud.tw">MiCloud Wiki Document</a></h1>';
  var body = '';

  var html_a = '<span style="width:100px"><a href="index.html?page=%s">%s</a></span> &nbsp;';
  var html_page_break = '<hr style="border-top: 1px dotted #f00;"/>';
  //var html_page_break = '<img style="width:100%;height:36px" src="images/break.png"/>';
  var html_body = '<p  id="%s"><h1><img width="50px" src="images/book.png"/>%s</h1><br/>%s</p>' + html_page_break;
  var tpl = fs.readFileSync(tplpath, 'utf8');

  var tree = JSON.parse(fs.readFileSync(treeCfg));
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
        var content = mkup(fs.readFileSync(mdfolderpath + '/' + node.link, 'utf8'));
        content = content.replace(/index\.html\?page=/g,'html/');
        content = content.replace(/index\.html\?/g,'html/');
        content = content.replace(/\.md\"/g, '.html"');
        html += util.format(html_body, node.link, title, content);
      }
    }
    return html;
  }

  var out = util.format(tpl, links + '<hr/>' + body);
  fs.writeFile(outputpath , out, 'utf8', function(err){
    if(err) console.log(err);
  });
}

/**
 * Convert markdown files to RSS
 * @treeCfg {JSON} the json file of menu tree
 * @feedsFilePath {String} the output feeds file path
 * @feedCfg {JSON} the feed configure (see: rss module)
 * @mdfilefolder {String} the folder path that markdown file exist
 * @tpl {String} the string of template html
 */
exports.toRss = function(treeCfg, feedsFilePath, feedCfg, mdfilefolder, tpl){
  var site = feedCfg.site_url;
  var feed = new RSS(feedCfg);
  var mdfiles = new Array();
  var links = '<h1 style="vertical-align:middle"><img src="images/wiki-logo.png" width="128px"/><a href="' + site + '">MiCloud Wiki Document</a></h1>';
  var body = '';

  var html_a = '<span style="width:100px"><a href="index.html?page=%s">%s</a></span> &nbsp;';
  var html_page_break = '<hr style="border-top: 1px dotted #f00;"/>';
  var html_body = '<p id="%s"><h1><img width="50px" src="images/book.png"/>%s</h1><br/>%s</p>' + html_page_break;
  
  // List treeCfg to convert page by sequence
  for(var i = 0 ; i < treeCfg.length ; i++) {
    var out = convertNode(treeCfg[i]);
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
        //By pass for not markdown files
      } else {
        var content = mkup(fs.readFileSync(mdfilefolder + '/' + node.link, 'utf8'));
        content = content.replace(/index\.html\?page=/g, site + '/html/');
        content = content.replace(/index\.html\?/g,site + '/html/');
        content = content.replace(/\.md\"/g, '.html"');
        content = content.replace(/\"images\//g, '"' + site + '/images/');
        content = content.replace(/\'images\//g, '\'' + site + '/images/');
        html += util.format(html_body, node.link, title, content);

        var filestat = fs.statSync(mdfilefolder + '/' + node.link);

        // Convert and append the data to feeds
        addRss(node.name, 
          content,
          site + '/html/'+node.link.replace(/\.md/g,'.html'),
          filestat.mtime);
      }
    }
    return html;
  }

  function addRss(title, descript, url, filedate){
    feed.item({
      title:  title,
      description: descript,
      url: url, // link to the item
      guid: url, // optional - defaults to url
      author: Author || 'MiCloud', // optional - defaults to feed author property
      date: filedate || new Date() // any format that js Date can parse.
    });
  }

  /**
   * Write feeds content to file
   */
  //console.log(feed.xml());
  fs.writeFile(feedsFilePath, feed.xml(), 'utf8', function(err){
    if(err) 
      console.log(err);
    else
      console.log('Processing done without error...');
  });
}

/**
 * Convert mdfiles to site map format
 */
exports.toSiteMap = function(mdfilepath, sitemappath, tpl, map){
  var maps = '';
  fs.readdir(mdfilepath, function(e, files) {
    files.forEach(function(file, i) {
      console.log('Processing of %s (md file: %s)', file, file.endsWith('.md'));
      if(file.endsWith('.md')) {
        //maps += util.format(map, 'http://doc.micloud.tw/index.html?page='+file);
        maps += util.format(map, 'http://doc.micloud.tw/html/'+file.replace(/\.md/g, '.html'));
      }
    });

    var out = util.format(tpl, maps);
    fs.writeFileSync(sitemappath, out, 'utf8');
  });
}

/**
 * Translate markdown text to html
 */
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
