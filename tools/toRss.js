/**
 * Author: Simon Su
 * Description: Convert the markdown files to html and add to rss feed, it can help the google search to index your pages
 * Date: see github log
 */
var fs = require('fs')
  , nu = require('nodeutil')
  , util = require('util')
  , marked = require('marked')
  , wikitpage = require('./wikitpage');

/**
 * Configuration
 * SITE: the site address that will append to related link path, it helps feeds reader to locate the real resources
 * FEEDS_FILE_PATH: the output feeds file path
 */
var SITE = 'http://doc.micloud.tw'
  , feedsfilepath = '../feeds.xml';

var feedCfg = {
        title: 'MiCloud Wiki RSS',
        description: 'Feeds for MiCloud Wiki',
        feed_url: SITE + '/feeds.xml',
        site_url: SITE,
        image_url: SITE + '/icon.png',
        author: 'Simon Su'
    };

var mdfilefolder = '../mdfiles';
var tplpath = './template.html';
var tpl = fs.readFileSync(tplpath , 'utf8');
var treeCfg = JSON.parse(fs.readFileSync('../javascripts/tree.json'));

wikitpage.toRss(treeCfg, feedsfilepath, feedCfg, mdfilefolder, tpl);
