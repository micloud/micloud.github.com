var h2t = require('./jsHtmlToText');

var out = h2t.htmlToText('<h1>TEST</h1><img src="logo.png"/><br/><h2>Hello...</h2>');

console.log(out);
