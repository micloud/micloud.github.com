變更套件庫來源及安裝軟體(Fedora)
===

目前MiCloud提供的系統各自採用國外所提供的套件庫，主要是因為台灣的鏡像站點並不保證其服務的可靠度及可用率，但您也可以透過修改設定檔將套件庫來源指向台灣，其可靠度您必須自行評估，以保障您的虛擬主機。


Fedora引入了為Yellow Dog Linux 而設的YUM系統套件管理工具，其套件庫的修改與設定相似。實際修改方式如下說明:


##變更套件來源

登入後，請先複製“fedora.repo、fedora-updates.repo、fedora-updates-testing.repo”這三個檔案存放在“/etc/yum.repos.d/”下，此複製動作針對改錯時，未來可以回復原來的檔案。


將fedora.repo、fedora-updates.repo、fedora-updates-testing.repo複製一份，命名為fedora.repo.bak、fedora-updates.repo.bak、fedora-updates-testing.repo.bak，指令如下:



```
#cp /etc/yum.repos.d/fedora.repo /etc/yum.repos.d/fedora.repo.bak
#cp /etc/yum.repos.d/fedora-updates.repo /etc/yum.repos.d/fedora-updates.repo.bak
#cp /etc/yum.repos.d/fedora-updates-testing.repo /etc/yum.repos.d/fedora-updates-testing.repo.bak
```

備份完成後請至/etc/apt下確認是否成功增加，如下圖:


<img src='images/Fedora+mirror+site-fecp.jpg' width='650' align='center'/>





編輯repo檔，編輯指令如下
*  fedora.repo



```
#vi /etc/yum.repos.d/fedora.repo
```

原來的套件庫參考網站為 http://download.fedoraproject.org/pub/fedora/ ，將其改為參考台灣鏡像站 http://opensource.nchn.org.tw/fedora ，下圖紅色框框部分包含原來的套件來源(已註解掉，將不會再執行)，以及修改至台灣鏡像站的網址。Fedora有分很多模組，用戶可以自行選擇哪幾個要變更。//

```
[fedora]
baseurl=http://opensource.nchc.org.tw/fedora/linux/releases/$releasever/Everything/$basearch/os/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=fedora-$releasever&arch=$basearch
[fedora-debuginfo]
baseurl=http://opensource.nchc.org.tw/fedora/linux/releases/$releasever/Everything/$basearch/debug/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=fedora-debug-$releasever&arch=$basearch
[fedora-source]
baseurl=http://opensource.nchc.org.tw/fedora/linux/releases/$releasever/Everything/source/SRPMS/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=fedora-source-$releasever&arch=$basearch
```

修改完後儲存即可。


<img src='images/Fedora+mirror+site-fevifedora.jpg' width='650' align='center'/>



*  fedora-updates.repo



```
# vi /etc/yum.repos.d/fedora-updates.repo
```

原來的套件庫參考網站為 http://download.fedoraproject.org/pub/fedora/ ，將其改為參考台灣鏡像站 http://opensource.nchn.org.tw/fedora ，下圖紅色框框部分包含原來的套件來源(已註解掉，將不會再執行)，以及修改至台灣鏡像站的網址。Fedora有分很多模組，用戶可以自行選擇哪幾個要變更。

```
[updates]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/$releasever/$basearch/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-released-f$releasever&arch=$basearch
[updates-debuginfo]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/$releasever/$basearch/debug/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-released-debug-f$releasever&arch=$basearch
[updates-source]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/$releasever/SRPMS/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-released-source-f$releasever&arch=$basearch
```

修改完後儲存即可。


<img src='images/Fedora+mirror+site-fevifedora-up.jpg' width='650' align='center'/>



*  fedora-updates-testing.repo



```
#vi /etc/yum.repos.d/fedora-updates-testing.repo
```

原來的套件庫參考網站為 http://download.fedoraproject.org/pub/fedora/ ，將其改為參考台灣鏡像站 http://opensource.nchn.org.tw/fedora ，下圖紅色框框部分包含原來的套件來源(已註解掉，將不會再執行)，以及修改至台灣鏡像站的網址。Fedora有分很多模組，用戶可以自行選擇哪幾個要變更。

```
[updates-testing]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/testing/$releasever/$basearch/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-testing-f$releasever&arch=$basearch
[updates-testing-debuginfo]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/testing/$releasever/$basearch/debug/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-testing-debug-f$releasever&arch=$basearch
[updates-testing-source]
baseurl=http://opensource.nchc.org.tw/fedora/linux/updates/testing/$releasever/SRPMS/
#mirrorlist=https://mirrors.fedoraproject.org/metalink?repo=updates-testing-source-f$releasever&arch=$basearch
```

修改完後儲存即可。


<img src='images/Fedora+mirror+site-fevifedora-up-test.jpg' width='650' align='center'/>





請執行更改後的檔案，並確認是否更新，執行指令及畫面如下
*  清除yum暫存

```
#yum clean all
```

<img src='images/Fedora+mirror+site-feclean.jpg' width='650' align='center'/>


*  列出有更新的檔案

```
#yum list
```

<img src='images/Fedora+mirror+site-felist.jpg' width='650' align='center'/>


*  執行更新

```
#yum update
```

<img src='images/Fedora+mirror+site-feupdate.jpg' width='650' align='center'/>


*  找到您更新過的路徑

```
#yum repolist –v
```

<img src='images/Fedora+mirror+site-ferepolist.jpg' width='650' align='center'/>



##更多Fedora mirror site list

*  Fedora全球映射站

   http://mirrors.fedoraproject.org/publiclist/


*  台灣鏡像站推薦使用

   http://opensource.nchc.org.tw/fedora/

   http://free.nchc.org.tw/fedora/linux/

   http://ftp.twaren.net/Linux/Fedora/linux/

   http://opensource.nchc.org.tw/fedora/linux/



----
##安裝非預載套件

使用yum指令安裝Fedora套件，相關指令如下:


先查詢可安裝的套件

```
#yum list
```

<img src='images/Fedora+mirror+site-fe-list.png' width='650' align='center'/>

若找不到您需要的套件也可透過下面的指令來搜尋

```
#yum search [套件名稱/關鍵字]
```

<img src='images/Fedora+mirror+site-fe-search.jpg' width='650' align='center'/>

再執行安裝，指令如下

```
#yum install [套件名稱]
```

<img src='images/Fedora+mirror+site-fe-install.jpg' width='650' align='center'/>

若想移除套件，指令如下

```
#yum remove [套件名稱]
```

<img src='images/Fedora+mirror+site-fe-remove.jpg' width='650' align='center'/>

