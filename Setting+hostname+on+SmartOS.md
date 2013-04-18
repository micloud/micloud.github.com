SmartOS Hostname設置
===
當您申請MiCloud上任何主機時，若未指定主機名稱，系統將預設以亂數產生一串文字做為您的主機名稱，可能類似：fxyzabcd.local的名稱。您可以以IP登入您的主機，並透過"hostname"之指令看到您的Hostname。


如您需要重設您的主機名稱，您可以修改某些檔案來達到修改Hostname的目的，詳細說明如下:





SmartMachine需要修改的檔案如下:
*  /etc/hosts：修改此檔案，讓您的主機本身認得此Hostname
*  /etc/nodename：此檔案為主要Hostname所讀取的檔案
*  /etc/inet/ipnodes：此檔案為/etc/hosts之symbolic link，主要存放主機靜態路由之IP/Name對應



1.修改檔案：/etc/hosts (也是/etc/inet/ipnodes)，加上您主機之新名稱，並對應到::1、127.0.0.1與您的主機IP(視申請服務類型而定，您的主機可能擁有一個或一個以上的內部或外部IP)指令為:


```
#vi /etc/hosts
```


於下方畫面紅色框框更改您的主機名稱
<img src='images/Setting+hostname+on+SmartOS-smhostname.jpg' width='500' align='center'/>

2.修改hostname設定檔：/etc/nodename，指令如下:

```
#vi /etc/nodename
```

於下方畫面紅色框框更改您新的主機名稱
<img src='images/Setting+hostname+on+SmartOS-smhostname2.jpg' width='500' align='center'/>


設定完畢後，重新開啓主機則會生效(您可以直接使用"reboot"指令重開或至[自助服務平台](http://portal.micloud.tw/)


當您設定好，並重開主機後，您可以使用下面指令驗證：

```
#hostname
```




<font color='red'>※若您的服務需要對外提供時，您會需要設定DNS記錄，相關指令如下:</font>


請您先向信任之網域名稱服務公司申請DNS，並將您主機名稱的紀錄指定至您上面所設定的網域名稱(smartos.example.com)。


若您己有申請及設定好DNS服務，可以透過下面指令檢查您的網域名稱是否生效:

```
host + 網域名稱
```

以micloud為例：

```
# host portal.micloud.tw
```

<img src='images/Setting+hostname+on+SmartOS-host.png' width='500' align='center'/>




或者您可以透過nslookup檢查您的網域名稱是否與IP對應：

```
nslookup + 網域名稱
```

以micloud為例：

```
# nslookup portal.micloud.tw
```

<img src='images/Setting+hostname+on+SmartOS-nslookup.png' width='500' align='center'/>
