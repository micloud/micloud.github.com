
Node.js
===
Node.js 是一個高效能、易擴充的網站應用程式開發框架 (Web Application Framework)，是為了讓開發者能夠更容易開發高延展性的網路服務。系統不需要經過太多複雜的調校、效能調整及程式修改，就能滿足網路服務在不同發展階段對效能的要求。



MiCloud所提供的SmartOS主機中，已有預載Nodejs服務的主機只有SmartOS Plus、SmartOS32+Nodejs這二種版本，若其他規格的主機想安裝Nodejs於您的主機上，請按照下列步驟進行安裝。



##在SmartOS上安裝Node.js

利用pkgin指令搜尋node.js:

```
# pkgin search nodejs
```

<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p1.PNG' width='650' align='center'/>
如上圖的範例，顯示0.4.9版本可供下載安裝，利用pkgin指令安裝:

```
# pkgin install nodejs-0.4.9
```

<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p2.PNG' width='650' align='center'/>

##檢視是否安裝成功

首先我們透過vi指令來建立名為server.js程式:

```
# vi server.js
```

<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p3.PNG' width='650' align='center'/>

然後進入編輯文字畫面進行編輯，我們加入下列基本的測試程式指令:

```
var http = require('http');
http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('Hello Node.js\n');
}).listen(8102, "127.0.0.1");
console.log('Server running at http://127.0.0.1:8102/');
```


在上方指令中，您可以在.listen後方加入沒有被使用的port(本範例是使用8102)，依序是localhost的網址。如下圖所示:
<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p4.png' width='650' align='center'/>

最後就是執行server.js 檔案，且執行以下指令就可以看到您的伺服器會在所設定的網址啟動:

```
# node server.js
```

<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p5.png' width='650' align='center'/>

最後前往瀏覽器輸入您的localhost以及後方所設定port位置來確認是否運行成功，本操作以google瀏覽器做為範例，如有出現Hello Node.js文字時，表示成功:
<img src='images/Installing+Node.js+on+a+Joyent+SmartOS+SmartMachine-p6.png' width='500' align='center'/>
