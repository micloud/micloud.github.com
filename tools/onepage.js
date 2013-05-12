var fs = require('fs')
  , nu = require('nodeutil')
  , util = require('util')
  , marked = require('marked')
  , wikitpage = require('./wikitpage')

// Configures
var path = '../mdfiles'
  , outputpath = '../onepage.html'
  , tplpath = './template.html'
  , treeCfg = '../javascripts/tree.json'

// Start to convert markdowns to onepage html
wikitpage.onepage(treeCfg, path, outputpath, tplpath);

