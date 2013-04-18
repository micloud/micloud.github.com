


目前MiCloud提供的系統各自採用國外所提供的套件庫，主要是因為台灣的鏡像站點並不保證其服務的可靠度及可用率，但您也可以透過修改設定檔將套件庫來源指向台灣，其可靠度您必須自行評估，以保障您的虛擬主機。


Ubuntu採用APT套件管理，其套件庫的修改與設定相似，實際修改方式如下說明:





變更套件來源
===
登入後，請先複製“sources.list”檔案，此檔案存放在“/etc/apt/”下，此複製動作針對改錯時，未來可以回復原來的檔案。將sources.list檔案複製一份，命名為sources.bak，指令如下



```
#cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

備份完成後請至/etc/apt下確認是否成功增加sources.list.bak檔，如下圖


<img src='images/Ubuntu+mirror+site-ubcp.jpg' width='650' align='center'/>



確認Ubuntu版本並編輯sorces.list，編輯指令如下



```
# vi /etc/apt/sources.list
```

原來的套件庫參考網站為http://us.archive.ubuntu.com/ubuntu/，將其改為參考台灣鏡像站http://opensource.nchn.org.tw/ubuntu/，下圖紅色框框部分即是要修改的部分，Ubuntu有分多個模組，用戶可以自行選擇哪幾個要變更。

```
deb http://opensource.nchc.org.tw/ubuntu/ lucid main restricted
deb-src http://opensource.nchc.org.tw/ubuntu/ lucid main restricted
```

修改完後儲存即可。
<img src='images/Ubuntu+mirror+site-ubchange1.jpg' width='650' align='center'/>


請執行更改後的檔案，並確認是否更新，執行指令及畫面如下:


黃色框框部分即更改過後，系統於您更改的路徑中找尋到可更新套件。

```
#apt-get update
```

<img src='images/Ubuntu+mirror+site-ubupdate1.jpg' width='650' align='center'/>

更多Ubuntu mirror site list
===
*   Ubuntu全球映射站
https://launchpad.net/ubuntu/+archivemirrors


*  台灣鏡像站推薦使用
http://opensource.nchc.org.tw/ubuntu/


http://ftp.nchc.org.tw/ubuntu/


http://free.nchc.org.tw/ubuntu/


http://ftp.twaren.net/ubuntu/



----
安裝非預載套件
===
使用apt指令安裝Ubuntu套件，相關指令如下:


先查詢可安裝的套件



```
#apt-cache pkgnames
```

<img src='images/Ubuntu+mirror+site-un_apt_cache.jpg' width='650' align='center'/>

若找不到您需要的套件也可透過下面的指令來搜尋

```
#apt-cache search [套件名稱/關鍵字]](#apt-cache search [套件名稱/關鍵字)
```

<img src='images/Ubuntu+mirror+site-un_apt_cache_search.jpg' width='650' align='center'/>

再執行安裝，指令如下

```
#apt-get install [套件名稱]](#apt-get install [套件名稱)
```

<img src='images/Ubuntu+mirror+site-un_apt_+install.png' width='650' align='center'/>

檢查是否安裝成功，指令

```
#dpkg --get-selections | grep "套件名稱"
```

<img src='images/Ubuntu+mirror+site-un_selection.jpg' width='650' align='center'/>

若想移除套件，指令如下

```
#apt-get remove [套件名稱]](#apt-get remove [套件名稱)
```

<img src='images/Ubuntu+mirror+site-un_apt_+remove.jpg' width='650' align='center'/>

若要更新己安裝的套件，指令如下:


(此指令可一次升級所有已安裝套件的版本，也可以單獨升級某指定套件。)

```
#apt-get upgrade
```

<img src='images/Ubuntu+mirror+site-un_aptupgrade.jpg' width='650' align='center'/>

只更新某套件

```
#apt-get upgrade [套件名稱]](#apt-get upgrade [套件名稱)
```

<img src='images/Ubuntu+mirror+site-un_aptupgrade1.jpg' width='650' align='center'/>
