
套件更新
===
不同SmartOS版本有不同的套件庫來源，無法任意變更，但可以執行套件更新，相關指令如下:


先從套件庫找出需要更新的套件，指令如下:

```
#pkgin update
```

<img src='images/Install+SmartOS+Packages-update.jpg' width='650'  align='center'/>
再執行更新，指令如下:

```
#pkgin upgrade
```

<img src='images/Install+SmartOS+Packages-upgrade.jpg' width='650'  align='center'/>

----

安裝非預載套件
===
在SmartOS上安裝套件是非常簡單的事情，SmartOS使用pkgin及相關的指令來作套件的安裝與維護，使用上就像yum或是apt-get一樣簡單。您可在putty或其他terminal工具連上SmartOS後，使用pkgin指令說明如下:

列出系統上的套件
===

```
#pkgin list
```

<img src='images/Install+SmartOS+Packages-pkgin-list.png' width='650'  align='center'/>

搜尋套件
===
若裡面沒有您需要的軟體套件，這時能使用搜尋軟體:

```
#pkgin search [套件部份名稱]](#pkgin search [套件部份名稱)
ex:pkgin search postgre
```

<img src='images/Install+SmartOS+Packages-pkgin-search.png' width='650'  align='center'/>

安裝套件
===

```
#pkgin install [套件全名]](#pkgin install [套件全名)
ex:pkgin install postgresql90-adminpack-9.0.4
```

<img src='images/Install+SmartOS+Packages-pkgin-install.png' width='650'  align='center'/>

刪除套件
===
安裝完若發現安裝錯誤，則可移除套件:

```
#pkgin remove [套件全名]](#pkgin remove [套件全名)
ex:pkgin remove postgresql90-adminpack-9.0.4
```

<img src='images/Install+SmartOS+Packages-pkgin-remove.png' width='650'  align='center'/>

常用套件
===
*  Install Apache Httpd
*  Install Apache Tomcat
*  Install Java
*  Install mod_jk Module
*  Install Apache With Tomcat
*  Install Java jdk 1.5 and jboss 4.0
