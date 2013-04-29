var fs = require('fs')
  , util = require('util')
  , nu = require('nodeutil');

var video_html = '<embed width="420" height="345" src="%s" type="application/x-shockwave-flash"></embed>';
var BASE = './jspwiki2';
var TRANS_HTML = false,
    TRANS_ATTACH = true;

function domove(base) {
  fs.readdir(base, function(e,files){
    files.forEach(function(file,i){
      var s = fs.statSync(base + '/' + file);
      if(s.isDirectory()) {
        
        if(TRANS_ATTACH)
        console.log('Moving attachment files...' + file);
        if(TRANS_ATTACH)
        fs.readdir(base + '/'+file, function(e2, files2) { //xxx-att
          files2.forEach(function(file2,i2){ //xxx-dir
            var p = fs.readFileSync(base + '/'+ file + '/' + file2 + '/attachment.properties' );
            //console.log('>' + p);
            if(p) {
              var n = p.toString().split('\n')[2].split('.')[0];
              console.log('>>>file seq:%s', n);
              var _type = file2.replace(/-dir/g, '');
              var type = _type.split('.')[_type.split('.').length - 1];
              console.log('>>>file type:%s', type);
              var src = base + '/'+ file + '/' + file2 + '/' + n + '.' + type;
              var target =  './images/' + 
                      file.replace(/-att/g,'').replace(/\%29/g, '')
                          .replace(/\%28/g, '-').replace(/\ /g, '') + 
                      '-' + 
                      file2.replace(/-dir/g, '').replace(/\%29/g, '')
                          .replace(/\%28/g, '-').replace(/\ /g, '');
              mv(src, target); 
            }
          });
        });
        
      } else if(TRANS_HTML && file.indexOf('.properties') < 0){
        //TODO processing the txt file
        var filename = file.replace(/\.txt/g,'.md');
        var txt = fs.readFileSync(base + '/' + file, 'utf8');
        //console.log('Processing file: %s', file);
        txt = txt.replace(/\\/g, '\n');
        txt = txt.replace(/{{{/g, '\n```');
        txt = txt.replace(/}}}/g, '```\n');
        //something need to be delete
        txt = txt.replace(/\[{TableOfContents }\]/g, '');

        var lines = txt.split('\n');
        var out = '';
        for(var j = 0 ; j < lines.length -1 ; j++) {
          var line = lines[j].trim();
          line = line.replace(/\%\%prettify/,'');
          line = line.replace(/\/\%/,'');

          if(line.startsWith('!!!')) {
            line = line.replace(/\*/,'# ');
          }
          if(line.startsWith('!!')) {
            line = line.replace(/\*/,'## ');
          }
          if(line.startsWith('!')) {
            line = line.replace(/\*/,'### ');
          }
          if(line.startsWith('*')) {
            line = line.replace(/^\*/,'*  ');
          }

          if(line.startsWith('[{TableOfContents }]')) {
            line = line.replace(/[{TableOfContents }]/g, '');
          }

          if(line.startsWith('!')){
            line = line.replace(/!/g, '');
            line += '\n===';
          }

          if(line.search(/\[.*\]/g) >= 0 && line.search(/\[{/g) < 0) {
            //console.log('>>>>>>>>>>>');
            //line = line.replace(/\]/, ')');
            //line = line.replace(/\|/, '](');
            var arr = line.split('|');
            var link = line.search(/\|/g) > 0 ? arr[1].split(']')[0] : arr[0].replace(/\]/, '');
            link = link.replace(/\(/g,' - ');
            link = link.replace(/\)/g,'');
            link = link.replace(/_/g,'-');
            line = arr[0] + '](' + link + ')';
            //console.log(line);
          }

          //Translate flash tag(Asumpt that flash is a single line)
          if(line.search(/\[{Flash/g) >= 0) {
            line = line.trim();
            var src = line.replace(/\[{Flash\ src=\'/,'')
                        .split("'")[0];
            var line = util.format(video_html, src); 
            console.log('>>>Flash translate:%s', src);
            console.log(line);
          }
          //Image tabe replace
          if(line.search(/\[{Image/g) >= 0) {
            line = line.replace(/"/g, '\'');
            line = line.replace(/\[{Image/g,'<img');
            line = line.replace(/}\]/g,'/>');
            line = line.replace(/\%28/g,'-');
            line = line.replace(/\%29/g,'');
            
            line = line.replace(/src='/, 'src=\'images/' + file.replace(/\.txt/g,'-') );
            var imgPath = line.split('src=\'')[1].split('\'')[0];
            //imgPath = decodeURIComponent(imgPath);
            line = line.replace(imgPath, 
                imgPath.replace(/\ /g, '+')
                      .replace(/\(/g, '-')
                      .replace(/\)/g, '')
                      .replace(/\%28/g,'-')
                      .replace(/\%29/g,'')
                      .replace(/\%26/g,'&')
                      .replace(/_/g, '-'));
            //console.log('>>' + imgPath);
            //console.log( line);
          }
          
          out += line + '\n';
          //console.log(line);
        }//end for
        tofile(filename, out);
        console.log('>>>>>end of file: %s', filename);
      }
    });
  });
}

function mv(src, target) {
  console.log('move from %s to %s', src, target);
  var is = fs.createReadStream(src)
  target = target.replace(/\%28/g,'-');
  target = target.replace(/\%29/g,'');
  target = target.replace(/_/g,'-');
  target = decodeURIComponent(target);
  var os = fs.createWriteStream(target);
  util.pump(is, os, function() {
    fs.unlinkSync(src);
  });
}

function tofile(filename, out) {
  //console.log('>>>>>name:%s, content:\n%s', filename, out);
  filename = filename.replace(/\%28/g,'-');
  filename = filename.replace(/\%29/g,'');
  filename = filename.replace(/_/g,'-');
  filename = decodeURIComponent(filename);
  fs.writeFileSync(filename, out, 'utf8');
}
//Start
domove(BASE);
