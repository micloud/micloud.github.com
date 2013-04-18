聖藍科技分享文章
===
感謝聖藍科技使用MiCloud服務，透過CloudAPI提供聖藍科技自動Scale之功能以架構多媒體影音服務，以下文章轉載自qrtt1 github repository([本文](http://www.accupass.com/Event/Register?eid=359099570305727)
----


簡介
===
最近在蒐集國內 IaaS 的資料，目前只看到 MiCloud 有提供 API。依照「沒有釋出API，就不能稱得上是真正的IaaS服務。」 那目前 MiCloud 算是國內的『真。IaaS』MiCloud 採用的 solution 是 joyent [https://github.com/joyent](https://github.com/joyent)

__此文件對讀者的假設是：__
*  你已註冊擁有 MiCloud 帳號
*  使用 Linux

__安裝 MiCloud Command Line 流程如下：__
*  安裝 node js (依客服的資訊，只能使用 0.6.x 版本)
*  設定 api 帳號
*  產生 ssh key
*  使用 MiCloud 帳號認證

__常用功能：__
*  建立新機器
*  建立機器並指定 user-s cript
*  查詢機器狀態
*  撤銷機器（關閉與刪除）

__附錄：__
*  Node.js RPM
*  Java API

另外，Cloud API 的官方文件的位置在： [http://apidocs.joyent.com/sdcapidoc/cloudapi/](http://apidocs.joyent.com/sdcapidoc/cloudapi)

安裝Node JS
===
目前 Node.js 最新版為 0.8.x。一開始看 wiki 去試著安裝，但它並沒有說明僅支援 0.6.x 版的 Node.js（這資訊同樣也是來自客服）。所以在做帳號認證時總是無法過關。而 Node.js 在我常用的 Debian 或 CentOS 似乎沒有直接包在官方的 repo 上，如果你也遇到相同的問題，建議就自行編譯吧。（編譯時記得將 openssl-devel 與 npm 的選項開啟。）



安裝完 Node.js 後，需加裝 joynet Cloud API 提供的 cli 工具，使用 Node.js 的套件管理程式安裝 smartdc 與jsontool（wiki 上的的指令沒有加 sudo，但我們下 npm -g 會安裝在系統目錄下，若您是一般用者請加 sudo）：

```
sudo npm install smartdc -g
sudo npm install jsontool -g
```

完成安裝後，會有一堆 sdc- 開頭的指令能使用，等等用他們操作 MiCloud 提供的服務：

```
[qrtt1@localhost ~]$ sdc-]([qrtt1@localhost ~$ sdc-)
sdc-addmachinetags            sdc-getmachinetag
sdc-createinstrumentation     sdc-getpackage
sdc-createkey                 sdc-listdatacenters
sdc-createmachine             sdc-listdatasets
sdc-createmachinesnapshot     sdc-listinstrumentations
sdc-deleteinstrumentation     sdc-listkeys
sdc-deletekey                 sdc-listmachines
sdc-deletemachine             sdc-listmachinesnapshots
sdc-deletemachinemetadata     sdc-listmachinetags
sdc-deletemachinesnapshot     sdc-listpackages
sdc-deletemachinetag          sdc-rebootmachine
sdc-describeanalytics         sdc-resizemachine
sdc-getdataset                sdc-setup
sdc-getinstrumentation        sdc-startmachine
sdc-getkey                    sdc-startmachinefromsnapshot
sdc-getmachine                sdc-stopmachine
sdc-getmachinemetadata        sdc-updatemachinemetadata
sdc-getmachinesnapshot
```

註：如果你有看 wiki，它是寫 api 的操作需要在 MiCloud 網域。這句話已過時了，向客服求證已無此限制。你可以在任何有對外網路的機器腦使用它。

設定API帳號
===
完成 stmartdc 安裝後，我們能使用 sdc-setup 指令設定 api 要使用的帳號。sdc-setup 需指定 api server 位置，請使用：[https://api.micloud.tw](https://api.micloud.tw)
*  使用 sdc-setup 指令
*  輸入 MiCloud 帳號與密碼進行驗證
*  設定 ssh key
*  *使用既有的 ssh key
*  *使用新的 ssh key

使用既有的SSH key
===

```
[qrtt1@localhost ~]$ sdc-setup https://api.micloud.tw]([qrtt1@localhost ~$ sdc-setup https://api.micloud.tw)
Username (login): (qrtt1) user_account@example.mail.com
Password:
The following keys exist in SmartDataCenter:
[1] sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905]([1 sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905)
[2] id_rsa]([2 id_rsa)
Would you like to use an existing key? (yes) yes
Select a key:(1) 1


If you set these environment variables, your life will be easier:
export SDC_CLI_URL=https://api.micloud.tw
export SDC_CLI_ACCOUNT=user_account@example.mail.com
export SDC_CLI_KEY_ID=sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905

You'll additionally want to set SDC_CLI_IDENTITY to the full path location of the ssh key on your system (try export SDC_CLI_IDENTITY=/home/qrtt1/.ssh/sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905).
```

在『使用既有的 ssh key』內，我們選擇了初次註冊 MiCloud 時透過系統建立的 ssh key。sdc-setup 的功能是替您產生操作 Cloud API 需要的環境變數，你可以將它設在 .bashrc 內，並使用 source 指令載入環境變數。

使用新建的SSH key
===
我們使用 ssh-keygen 產生一組新的 ssh key 讓 MiCloud 使用：

```
[qrtt1@localhost ~]$ ssh-keygen -b 2048 -t rsa -f ~/.ssh/micloud_at_vm]([qrtt1@localhost ~$ ssh-keygen -b 2048 -t rsa -f ~/.ssh/micloud_at_vm)
Generating public/private rsa key pair.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/qrtt1/.ssh/micloud_at_vm.
Your public key has been saved in /home/qrtt1/.ssh/micloud_at_vm.pub.
The key fingerprint is:
34:e3:cd:2c:b3:1c:64:6f:29:9d:de:ef:4f:03:fe:ac qrtt1@localhost.localdomain
The key's randomart image is:
+--[ RSA 2048]----+](+--[ RSA 2048----+)
|                 |
|                 |
|        *        |
|       = O o     |
|        S X  .   |
|       . O .. .  |
|        o . .. ..|
|             .o..|
|             E++.|
+-----------------+
```

使用 sdc-setup 並選用新的 ssh key：

```
[qrtt1@localhost ~]$ sdc-setup https://api.micloud.tw]([qrtt1@localhost ~$ sdc-setup https://api.micloud.tw)
Username (login): (qrtt1) user_account@example.mail.com
Password:
The following keys exist in SmartDataCenter:
[1] sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905]([1 sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905)
[2] id_rsa]([2 id_rsa)
Would you like to use an existing key? (yes) no
SSH public key: (/home/qrtt1/.ssh/id_rsa.pub) /home/qrtt1/.ssh/micloud_at_vm.pub


If you set these environment variables, your life will be easier:
export SDC_CLI_URL=https://api.micloud.tw
export SDC_CLI_ACCOUNT=user_account@example.mail.com
export SDC_CLI_KEY_ID=micloud_at_vm
export SDC_CLI_IDENTITY=/home/qrtt1/.ssh/micloud_at_vm
```


使用cli tool
===
完成設定後我們就能開始使用 cli tool，例如：查詢已註冊的 ssh key

```
[qrtt1@localhost ~]$ sdc-listkeys]([qrtt1@localhost ~$ sdc-listkeys)
[
{
"name": "sysGen-e10b3d16-5d92-45b0-b84f-299e4669b905",
"key": "ssh-rsa …......",
"created": "2012-11-14T16:08:33+00:00",
"updated": "2012-11-14T16:08:33+00:00"
},
{
"name": "micloud_at_vm",
"key": "ssh-rsa …......",
"created": "2012-11-20T09:42:32+00:00",
"updated": "2012-11-20T09:42:32+00:00"
}
]
```


常用功能：建立新機器
===
建立機器有些資訊需要事先查清楚的：
*  機器的等級（CPU、記憶體、Disk），使用 sdc-listpackages 指令
*  機器的OS，使用 sdc-listdatasets 指令
*  使用上述『參數』建立機器，使用 sdc-createmachine 指令

依 Cloud API 的說明 CreateMachine 的參數 package name 可以不填，會使用 sdc-listpackages 標為 default 的那一組，而 dataset 需要填 URN：[http://apidocs.joyent.com/sdcapidoc/cloudapi/#CreateMachine](http://apidocs.joyent.com/sdcapidoc/cloudapi/#CreateMachine)



先使用 sdc-listpackages 指令查出需要的機器等級的名稱 "S 1GB RAM (1CORE)"：

```
[qrtt1@localhost ~]$ sdc-listpackages]([qrtt1@localhost ~$ sdc-listpackages)
[
{
"name": "XS 512MB RAM (4CORE)",
"memory": 512,
"disk": 15360,
"vcpus": 4,
"swap": 1024,
"default": false
},
{
"name": "S 1GB RAM (1CORE)",
"memory": 1024,
"disk": 15360,
"vcpus": 1,
"swap": 2048,
"default": true
},
…(略)
]
```

查出 OS 的 URN，這個例子我們選用 CentOS 6：

```
[qrtt1@localhost ~]$ sdc-listdatasets]([qrtt1@localhost ~$ sdc-listdatasets)
[
…(略)
{
"id": "a77907fc-123b-11e1-86d8-2bb3c7c6aaf2",
"urn": "centos6:0.1.0",
"name": "centos6",
"os": "linux",
"type": "virtualmachine",
"description": "您選擇的是：CentOS 6(64bit)版本，提醒您可以透過SSH金鑰的建立，讓您的連線更加方便有效率。",
"default": false,
"requirements": {},
"version": "0.1.0"
},
{
"id": "0ac8200c-13b5-11e1-a042-7b2948257b3b",
"urn": "centos57:1.1.6",
"name": "centos57",
"os": "linux",
"type": "virtualmachine",
"description": "您選擇的是：CentOS 5(64bit)版本，提醒您可以透過SSH金鑰的建立，讓您的連線更加方便有效率。",
"default": false,
"requirements": {},
"version": "1.1.6"
}
]
```


相關資料備妥後，能真的建立機器：

```
[qrtt1@localhost ~]$ sdc-createmachine --package "S 1GB RAM (1CORE)" --dataset "centos6:0.1.0"]([qrtt1@localhost ~$ sdc-createmachine --package "S 1GB RAM  - 1CORE" --dataset "centos6:0.1.0")
{
"id": "4321d746-5df0-4e53-9178-d9390e507c17",
"name": "5177256",
"type": "virtualmachine",
"state": "provisioning",
"dataset": "sdc:sdc:centos6:0.1.0",
"ips": [
"211.78.245.129"
],
"memory": 1024,
"disk": 15360,
"metadata": {
"root_authorized_keys": "......"
},
"created": "2012-11-20T10:25:54+00:00",
"updated": "2012-11-20T10:25:54+00:00",
"primaryIp": "211.78.245.129"
}
```


常用功能:建立機器並指定user-s cript
===
使用 MiCloud 時，第一次開啟 CentOS 並安裝軟體，你可能會注意到自動選擇的 mirror site 常常覺得 cn 離它比較接近。而開 Debian 時，預設似乎是抓到 us 的 mirror site。所以每次新建機器後，變更 repo mirror site 成為一個必要的例行工作。您可能曾在 MiCloud 的 wiki 到過這篇 [CentOS mirror site](http://wiki.micloud.tw/Wiki/Wiki.jsp?page=CentOS%20mirror%20site)



對 IaaS 最迷人之處是：用 API 能搞定一切！所以，我們就換個角度，不應該手工地事後補救。我們可以事前指定要執行的s cript 。這功能幾乎是 IaaS Provider 都有支援的功能，指定開機時執行下列s cript ：

```
[qrtt1@localhost ~]$ cat change_yum.sh]([qrtt1@localhost ~$ cat change_yum.sh)
yum_cfg=https://raw.github.com/gist/4109252/2899290f3749bb7ce4a5a6934757512d9b980523/yum.base.cfg
curl $yum_cfg > /etc/yum.repos.d/CentOS-Base.repo
```


機器時，加上 --s cript參數：

```
[qrtt1@localhost ~]$ sdc-createmachine --package "S 1GB RAM (1CORE)" --dataset "centos6:0.1.0" -- s cript change_yum.sh]([qrtt1@localhost ~$ sdc-createmachine --package "S 1GB RAM  - 1CORE" --dataset "centos6:0.1.0" -- s cript change_yum.sh)
{
"id": "e743dde0-3005-41fd-9848-07a114e9819c",
"name": "a2bc32d",
"type": "virtualmachine",
"state": "provisioning",
"dataset": "sdc:sdc:centos6:0.1.0",
"ips": [
"211.78.245.180"
],
"memory": 1024,
"disk": 15360,
"metadata": {
"user-s cript": "yum_cfg=https://raw.github.com/gist/4109252/2899290f3749bb7ce4a5a6934757512d9b980523/yum.base.cfg
ncurl $yum_cfg > /etc/yum.repos.d/CentOS-Base.repo
n,
"root_authorized_keys": "..."
},
"created": "2012-11-22T14:46:37+00:00",
"updated": "2012-11-22T14:46:37+00:00",
"primaryIp": "211.78.245.180"
}
```


常用功能：查詢機器狀態
===
查詢機器狀態很直覺得要用 sdc-listmachines 指令，但對我來說比較關心的是我用了多久，也就是機器的 age。sdc-listmachines 會列出 json array：

```
[qrtt1@localhost ~]$ sdc-listmachines]([qrtt1@localhost ~$ sdc-listmachines)
[
{
"id": "2b36ed3a-6388-43d0-bcfe-446056952f3b",
"name": "dbd1362",
"type": "virtualmachine",
"state": "running",
"dataset": "sdc:sdc:centos6:0.1.0",
"ips": [
"211.78.245.129"
],
"memory": 1024,
"disk": 15360,
"metadata": {
"root_authorized_keys": "..."
},
"created": "2012-11-20T13:50:29+00:00",
"updated": "2012-11-20T13:50:39+00:00",
"primaryIp": "211.78.245.129"
}
]
```

我們能利用一開始安裝的 jsontool，直接查出建立時間（查詢 array index 0 的 created 欄位）：

```
[qrtt1@localhost ~]$ sdc-listmachines ]( json 0.created)
2012-11-20T13:50:29+00:00
```

查詢到建立時間就離取得機器的 age 不遠了！javas cript 直接支援解釋 ISO 8601 Date String，我們能寫個簡單的 s cript 換算：

```
[qrtt1@localhost ~]$ cat age.js]([qrtt1@localhost ~$ cat age.js)
#!/usr/bin/env node

var d = new Date(process.argv[process.argv.length-1]);](var d = new Date - process.argv[process.argv.length-1;)
var time = ((new Date()-d) / 1000) / 60;
console.log(Math.round(time));
```

配合 jsontool 執行結果如下：

```
[qrtt1@localhost ~]$ sdc-listmachines ]( json 0.created )
23
```

心得：如果能直接在 response 有 age 是最好，省得使用者要自己算。

常用功能:撤銷機器
===
MiCloud 的計價結束時間點是在刪除機後才記錄的，而機器要能被刪除必需是關機的狀態。所以，完整的撤銷機器步驟為：
*  關閉機器，使用 sdc-stopmachine 指令
*  刪除機器，使用 sdc-deletemachine 指令
接續在上一步學習使用到的 jsontool，我們能下達關機與刪除：

```
sdc-listmachines | json 0.id | xargs sdc-stopmachine
sdc-listmachines | json 0.id | xargs sdc-deletemachine
```


附錄：Node.js RPMs
===
由於 MiCloud 目前使用的 Cloud API 需要使用 Node.js。這通常得自己編譯，除了版本與現行最新版的差距外，另一個問題是它通常不在 Linux 主要的 software repo 內。我以我們單位主要用到的 CentOS 5 與 CentOS 6 打包了二組 RPMs。當然，我不是專業的 packager 只求能「動」就好。若你想要改變內容，也有 source rpm 版本可供下載：

```
http://s3-ap-southeast-1.amazonaws.com/qrtt1.software/rpms/nodejs-0.6.8-1.el5.src.rpm
http://s3-ap-southeast-1.amazonaws.com/qrtt1.software/rpms/nodejs-0.6.8-1.el6.src.rpm
```


```
http://s3-ap-southeast-1.amazonaws.com/qrtt1.software/rpms/nodejs-0.6.8-1.el5.x86_64.rpm
http://s3-ap-southeast-1.amazonaws.com/qrtt1.software/rpms/nodejs-0.6.8-1.el6.x86_64.rpm
```


附錄：Java API
===
由於我們單位的程式多半是以 Java 實作的，所以實作 Java 版的 API。目前只實作會用到的功能，但它是很容易擴充的，若是有需要額外的功能就 fork 專案去加唄。網址如下：[https://github.com/qrtt1/joyent.cloudapi](https://github.com/qrtt1/joyent.cloudapi)

----
轉載至:

[https://github.com/qrtt1/joyent.cloudapi/blob/master/MiCloud.Notes.zh_tw.md#%E5%B8%B8%E7%94%A8%E5%8A%9F%E8%83%BD%EF%BC%9A%E5%BB%BA%E7%AB%8B%E6%96%B0%E6%A9%9F%E5%99%A8 ]( https://github.com/qrtt1/joyent.cloudapi/blob/master/MiCloud.Notes.zh_tw.md#%E5%B8%B8%E7%94%A8%E5%8A%9F%E8%83%BD%EF%BC%9A%E5%BB%BA%E7%AB%8B%E6%96%B0%E6%A9%9F%E5%99%A8)
