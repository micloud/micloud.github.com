變更套件庫來源及安裝軟體(CentOS)
===


目前MiCloud提供的系統各自採用國外所提供的套件庫，主要是因為台灣的鏡像站點並不保證其服務的可靠度及可用率，但您也可以透過修改設定檔將套件庫來源指向台灣，其可靠度您必須自行評估，以保障您的虛擬主機。


CentOS引入了為Yellow Dog Linux 而設的YUM系統套件管理工具，其套件庫的修改與設定相似。實際修改方式如下說明:



##變更套件來源

登入後，請先複製“CentOS-Base.repo”檔案，此檔案存放在“/etc/yum.repos.d/”下，此複製動作針對改錯時，未來可以回復原來的檔案。將CentOS-Base.repo檔案複製一份，命名為CentOS-Base.repo.bak，指令如下



```
#cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
```

備份完成後請至/etc/yum.repos.d下確認是否成功增加CentOS-Base.repo.bak檔，如下圖


<img src='images/CentOS+mirror+site-cecp.jpg' width='650' align='center'/>





編輯repo檔，編輯指令如下:



```
#vi /etc/yum.repos.d/CentOS-Base.repo
```

原來的套件庫參考網站為 http://mirror.centos.org/centos ，將其改為參考台灣鏡像站 http://opensource.nchn.org.tw/centos ，下圖紅色框框部分包含原來的套件來源(已註解掉，將不會再執行)，以及修改至台灣鏡像站的網址。CentOS有分很多模組，用戶可以自行選擇哪幾個要變更。



```
[base]
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
baseurl=http://opensource.nchc.org.tw/centos/$releasever/os/$basearch/
[updates]
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates
baseurl=http://opensource.nchc.org.tw/centos/$releasever/updates/$basearch/
[extras]
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras
baseurl=http://opensource.nchc.org.tw/centos/$releasever/extras/$basearch/
[centosplus]
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus
baseurl=http://opensource.nchc.org.tw/centos/$releasever/centosplus/$basearch/
[contrib]
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=contrib
baseurl=http://opensource.nchc.org.tw/centos/$releasever/contrib/$basearch/
```

修改完後儲存即可。


<img src='images/CentOS+mirror+site-cechange.jpg' width='650' align='center'/>






請執行更改後的檔案，並確認是否更新，執行指令及畫面如下


*  清除yum的暫存



```
#yum clean all
```

<img src='images/CentOS+mirror+site-ceclean.jpg' width='650' align='center'/>


*  列出有更新的檔案



```
#yum list
```

<img src='images/CentOS+mirror+site-celist.jpg' width='650' align='center'/>


*  執行更新



```
#yum update
```

<img src='images/CentOS+mirror+site-ceupdate.jpg' width='650' align='center'/>


*  找到您更新過的路徑



```
#yum repolist –v
```

<img src='images/CentOS+mirror+site-cerepolist.jpg' width='650' align='center'/>



##更多CentOS mirror site list

*  Debian全球映射站

   http://www.centos.org/modules/tinycontent/index.php?id=30


*  台灣鏡像站推薦使用

   http://opensource.nchc.org.tw/centos/

   http://mirror01.idc.hinet.net/CentOS/

   http://ftp.twaren.net/Linux/CentOS/

   http://ftp.isu.edu.tw/pub/Linux/CentOS/



----
##安裝非預載套件


使用yum指令安裝CentOS套件，相關指令如下:


先查詢可安裝的套件

```
#yum list
```

<img src='images/CentOS+mirror+site-ce-list.jpg' width='650' align='center'/>

若找不到您需要的套件也可透過下面的指令來搜尋

```
#yum search [套件名稱/關鍵字]
```

<img src='images/CentOS+mirror+site-ce-search.jpg' width='650' align='center'/>

再執行安裝，指令如下

```
#yum install [套件名稱]
```

<img src='images/CentOS+mirror+site-ce-install.jpg' width='650' align='center'/>

若想移除套件，指令如下

```
#yum remove [套件名稱]
```

<img src='images/CentOS+mirror+site-ce-remove.jpg' width='650' align='center'/>
