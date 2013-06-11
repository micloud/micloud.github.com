
Linux Hostname設置
===
當您申請MiCloud上任何主機時，若未指定主機名稱，系統將預設以亂數產生一串文字做為您的主機名稱，可能類似：fxyzabcd.local的名稱。您可以以IP登入您的主機，並透過"hostname"之指令看到您的Hostname。
如您需要重設您的主機名稱，您可以修改某些檔案來達到修改Hostname的目的，不同的作業系統需要更改的檔案並不相同，詳細說明如下:





##Debian

您需要修改的檔案如下:

*  /etc/hostname
*  /etc/hosts



(1)修改/etc/hostname，指令如下:

```
#vi /etc/hostname
```

於下方畫面紅色框框更改您新的主機名稱
<img src='images/Setting+hostname+on+Linux-dehostname.jpg' width='650px' align='center'/>




(2)修改/etc/hosts，指令如下:

```
#vi /etc/hosts
```

於下方畫面紅色框框更改您的主機名稱
<img src='images/Setting+hostname+on+Linux-dehostname2.jpg' width='650px' align='center'/>

(3)修改完後執行下方指令主機名稱即被更改。

```
#/etc/init.d/hostname.sh start
```

當您設定好，您可以使用下面指令驗證：

```
#hostname
```

----
##Ubuntu

您需要修改的檔案如下:

*  /etc/hostname
*  /etc/hosts



(1)修改/etc/hostname，指令如下:

```
#vi /etc/hostname
```

於下方畫面紅色框框更改您新的主機名稱
<img src='images/Setting+hostname+on+Linux-ubhostname.jpg' width='650px' align='center'/>



(2)修改/etc/hosts，指令如下:

```
#vi /etc/hosts
```

於下方畫面紅色框框更改您的主機名稱
<img src='images/Setting+hostname+on+Linux-ubhostname2.jpg' width='650px' align='center'/>

(3)修改完後執行下方指令主機名稱即被更改。

```
#start hostname
```

當您設定好，您可以使用下面指令驗證：

```
#hostname
```

----
##CentOS

您需要修改的檔案如下:

*  /etc/sysconfig/network
*  /etc/hosts



(1)修改/etc/sysconfig/network，指令如下:

```
#vi /etc/sysconfig/network
```

於下方畫面紅色框框更改您新的主機名稱
<img src='images/Setting+hostname+on+Linux-cehosname.jpg' width='650px' align='center'/>



(2)修改/etc/hosts，指令如下:

```
#vi /etc/hosts
```

於下方畫面紅色框框更改您的主機名稱
<img src='images/Setting+hostname+on+Linux-cehosname1.jpg' width='650px' align='center'/>



(3)當您設定好，並重開主機後，您可以使用下面指令驗證：

```
#hostname
```

----
##Fedora


您需要修改的檔案如下:

*  /etc/sysconfig/network
*  /etc/hosts



(1)修改/etc/sysconfig/network，指令如下:

```
#vi /etc/sysconfig/network
```

於下方畫面紅色框框更改您新的主機名稱
<img src='images/Setting+hostname+on+Linux-fehosname.jpg' width='650px' align='center'/>



(2)修改/etc/hosts，指令如下:

```
#vi /etc/hosts
```

於下方畫面紅色框框更改您的主機名稱
<img src='images/Setting+hostname+on+Linux-fehosname1.jpg' width='650px' align='center'/>



(3)當您設定好，並重開主機後，您可以使用下面指令驗證：

```
#hostname
```

