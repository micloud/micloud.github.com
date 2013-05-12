var fs = require('fs')
  , nu = require('nodeutil')
  , util = require('util')
  , wikitpage = require('./wikitpage')

var path = '../html';
var mdfilepath = '../mdfiles';
var sitemappath = '../site-map.xml';

// Site map template layout
var tpl = fs.readFileSync('./site-map-template.xml', 'utf8');
// Site map subset layout
var map = '<url><loc>%s</loc></url>';

// Start to convert site map
wikitpage.toSiteMap(mdfilepath, sitemappath, tpl, map);
