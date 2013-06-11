var fs = require('fs')
  , util = require('util')
  , nu = require('nodeutil')
  , log = nu.logger.getInstance()
  , wikitpage = require('./wikitpage');

// Configure the tree data path and the output file path
var path = __dirname + '/../javascripts/tree.json'
  , out = __dirname + '/../tree.html';

// Prepare the json data
var jsonCfg = JSON.parse(fs.readFileSync(path, "utf-8"));

// Start translate
wikitpage.json2ultree(jsonCfg, out);

