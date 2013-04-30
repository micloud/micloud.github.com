當您申請MiCloud上SmartMachine(或其他)主機時，當您未指定主機名稱時，系統將預設以一亂數產生您的主機名稱，可能類似：fxyzabcd.local的名稱，您可以以IP存取您的主機，並透過"hostname"之指令看到您的Hostname。

如您需要重設您的主機名稱，在SmartOS上，您可以修改下面幾個檔案來達到修改Hostname的目的：
*  /etc/hosts：修改此檔案，讓您的主機本身認得此Hostname
*  /etc/nodename：此檔案為主要Hostname所讀取的檔案
*  /etc/inet/ipnodes：此檔案為/etc/hosts之symbolic link，主要存放主機靜態路由之IP/Name對應

修改檔案：/etc/hosts (也是/etc/inet/ipnodes)，加上您主機之新名稱，並對應到::1、127.0.0.1與您的主機IP(視申請服務類型而定，您的主機可能擁有一個或一個以上的內部或外部IP)

```
/etc/hosts
# ident "@(#)hosts      1.7     06/08/01 SMI"
#
# Internet host table
#
::1             localhost
127.0.0.1       localhost
10.19.xxx.xxx   fxyzabcd    loghost
8.19.xxx.xxx    myserver.example.com
```


修改hostname設定檔：/etc/nodename，:

```
# vi /etc/nodename
```

修改設定檔內容為您新的主機名稱：

```
myserver.example.com
```


設定完畢後，重新開啓主機則會生效(您可以直接使用"reboot"指令重開或至[自助服務平台](http://micloud.tw)

當您設定好，並重開主機後，您可以以下面指令驗證：

```
hostname
```


設定外部DNS對應
===
當您服務需要對外提供時，您會需要設定DNS記錄，此部分請向您信任之網域名稱服務公司申請，並將您主機名稱之紀錄指定至您上面所設定之網域名稱(myserver.example.com)，如您有申請及設定好DNS服務，可以透過下面指令檢查您的網域名稱是否生效：

```
host myserver.example.com
```

回應範例：

```
# host portal.micloud.tw
portal.micloud.tw has address 211.78.245.68
```


或者您可以透過nslookup檢查您的網癒名稱是否與IP對應：

```
nslookup myserver.example.com
```

回應範例：

```
# host portal.micloud.tw
portal.micloud.tw has address 211.78.245.68
[root@211-78-245-44 ~]# nslookup portal.micloud.tw]([root@211-78-245-44 ~# nslookup portal.micloud.tw)
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   portal.micloud.tw
Address: 211.78.245.68
```




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
