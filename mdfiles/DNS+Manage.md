

DNS設置
===
若您想在MiCloud主機上設置DNS，請先至網址註冊商(例如:Godaddy)申請一個Domain Name，設置方式有以下二種:

*  子網域指向MiCloud DNS Server
*  直接將您所申請的Domain Name指向MiCloud DNS Server
詳細說明如下:



##設置子網域

1. 請先新增一個子網域，並將Points to設為MiCloud DNS Server :

```
dns60.micloud.tw或dns64.micloud.tw
```

<img src='images/DNS+Manage-sub-1.png' width='650' align='center'/>

2.新增完成後，請至MiCloud平台點選”DNS管理”下”專屬網域之主機”按鈕。
<img src='images/DNS+Manage-sub-2.png' width='650' align='center'/>
<img src='images/DNS+Manage-sub-3.png' width='650' align='center'/>

3.進入頁面後，請點選”新增Domain”按鈕，將剛剛所新增的子網域名稱加入頁面中。
<img src='images/DNS+Manage-sub-4.png' width='650' align='center'/>
<img src='images/DNS+Manage-sub-5.png' width='650' align='center'/>

4.新增成功後，點選”新增A Record”，即可為您的主機設置Domain name。
<img src='images/DNS+Manage-sub-7.png' width='650' align='center'/>
<img src='images/DNS+Manage-sub-6.png' width='650' align='center'/>

5.驗證Domain，使用命令提示字元或直接將您所設至的Domain Name貼至網址列即可。


命令提示字元請執行下方指令做驗證:

```
nslookup portal.test.facewithus.com
```

<img src='images/DNS+Manage-sub-8.png' width='450' align='center'/>

或者可以直接將記錄指向MiCloud DNS server查詢：

```
nslookup portal.test.facewithus.com dns60.micloud.tw
```

<img src='images/DNS+Manage-sub-9.png' width='500' align='center'/>



##設置整個網域

1. 將您申請的網域名稱的server設至MiCloud DNS Server。以Godaddy為例。

```
MiCloud DNS Server:
DNS60.MICLOUD.TW
DNS64.MICLOUD.TW
```

<img src='images/DNS+Manage-all-1.png' width='650' align='center'/>
<img src='images/DNS+Manage-all-2.png' width='650' align='center'/>

2.修改完成後，請至MiCloud平台點選”DNS管理”下”專屬網域之主機”按鈕。
<img src='images/DNS+Manage-sub-2.png' width='650' align='center'/>
<img src='images/DNS+Manage-sub-3.png' width='650' align='center'/>

3.進入頁面後，請點選”新增Domain”按鈕，將您的網域名稱新增至頁面中。
<img src='images/DNS+Manage-sub-4.png' width='650' align='center'/>
<img src='images/DNS+Manage-all-3.png' width='650' align='center'/>

4.新增成功後，點選”新增A Record”，即可為您的主機設置Domain name。
<img src='images/DNS+Manage-sub-7.png' width='650' align='center'/>
<img src='images/DNS+Manage-all-4.png' width='650' align='center'/>

5.驗證Domain，使用命令提示字元或直接將您所設至的Domain Name貼至網址列即可。


命令提示字元請執行下方指令做驗證:

```
nslookup portal.test.facewithus.com
```

<img src='images/DNS+Manage-all-5.png' width='450' align='center'/>

或者可以直接將記錄指向MiCloud DNS server查詢：

```
nslookup portal.test.facewithus.com dns60.micloud.tw
```

<img src='images/DNS+Manage-all-6.png' width='450' align='center'/>
