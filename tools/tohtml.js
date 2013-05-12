var wikitpage = require('./wikitpage');

var htmlpath = '../html'
  , mdfilepath = '../mdfiles'
  , pageTemplate = './template-single-page.html';

wikitpage.mds2html(mdfilepath, htmlpath, pageTemplate);

