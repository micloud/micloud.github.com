
NPM的安裝與操作
===
Node.js 的套件管理工具(Node Package Manager)可以讓 Node.js 的開發者直接利用、擴充線上的套件庫（packages registry），加速軟體專案的開發。此外npm 提供很友善的搜尋功能，可以快速找到及安裝需要的套件，當這些套件發行新版本時，npm 也可以協助開發者自動更新這些套件。



##安裝NPM

利用下方指令安裝

```
#pkgin install npm
```

<img src='images/Npm+usage-p7.png' width='650' align='center'/>

##搜尋可附加的套件

Node.js是一個非常熱門的開發平台，有各式各樣的開放套件可以供用戶去下載安裝。而npm也提供了一個平台可以讓用戶去搜尋，用戶可以在網頁上看到最新、熱門、最多人用的套件下載或是建議等等。網站來源: [https://npmjs.org/](https://npmjs.org/)
<img src='images/Npm+usage-p8.png' width='650' align='center'/>

##安裝套件

我們以request.js來當作範例來安裝，輸入以下指令及可以安裝:

```
#npm install request -gd
```

<img src='images/Npm+usage-p9.png' width='650' align='center'/>
PS: -g代表安裝到NODE_PATH裡的lib裏面，而-d代表把相依性套件也一起安裝

##檢視己安裝套件

安裝完成後Node.js所需要套件的安裝、升級、移除都靠npm這個套件來運作。我們可以利用npm list指令來看套件列表，在預設狀態下會顯示empty，而下圖範例已裝好一些套件:

```
# npm list
```

<img src='images/Npm+usage-p10.png' width='650' align='center'/>
如果用戶在執行此指令時看到套件名稱前面有亂碼的產生，表示在預設狀態下的編碼是錯誤且無法讀取。用戶必須先在putty上先設定好編碼，如下圖:
<img src='images/Npm+usage-p11.png' width='650' align='center'/>

##更新套件

利用npm update來更新我們已有的套件，如下圖:

```
# npm update
```

<img src='images/Npm+usage-p12.png' width='650' align='center'/>

##移除套件

利用npm uninstall指令來刪除既有套件，以textlogin套件為例，如下圖:

```
# npm uninstall textlogin
```

<img src='images/Npm+usage-p13.png' width='650' align='center'/>
