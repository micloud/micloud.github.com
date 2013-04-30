MiCloudAPI 實做案例
===

情境：
===
我是一個購物網站的主機管理員，當季的商品促銷期間常會造成流量爆滿，大量的transaction會導至網頁資料傳輸與反應變慢，運行在傳統的主機服務架構下，此時除非新增加伺服器規格外，似乎無其他方法... 但在雲端的環境下，我可以規劃我的促消時間，依照網站上統計的到訪人數資料來讓我可以知道大約尖峰時期在甚麼時候，透過MiCloudAPI，我建置了一個可以依據我所規劃的時間來進行增加服務端點的架構。

<img src='images/MiCloud+API+Implement+1-p12.png' width='450' align='center'/>
圖：利用MiCloudAPI建構可延展架構

架構中利用admin server做系統資源的監控，並由admin server在需要延展服務的情況下進行呼叫MiCloudAPI，請MiCloudAPI在我的帳戶底下多生成一臺主機，並且利用admin在新平台上進行服務部署工作將服務所需資源作一個調適分配，最後通知前端Load Balancer將服務需求平均分攤至新加入之伺服器上。

先介紹MiCloudAPI上的基本設定
===
設定主機與MiCloudAPI連線：
===


```
$ sdc-setup https://api.micloud.tw
Username (login): YOUR_ACCOUNT
Password:
The following keys exist in SmartDataCenter:
[1] key1]([1 key1)
Would you like to use an existing key? (yes) no
SSH public key: (/Users/xxxx/.ssh/id_rsa.pub)
```




設定環境變數
===


```
export SDC_CLI_URL=https://api.micloud.tw
export SDC_CLI_ACCOUNT=YOUR_ACCOUNT
export SDC_CLI_KEY_ID=id_rsa
export SDC_CLI_IDENTITY=$HOME/.ssh/id_rsa
```




檢視目前既有主機
===


```
$ sdc-listmachines
[
{
"id": "9626a584-187c-40b0-aa84-7f6f3a22ec44",
"name": "TS-72-SIMON-01",
"type": "smartmachine",
"state": "running",
"dataset": "sdc:sdc:smartosplus64:3.0.7",
"ips": [
"211.78.xxx.xxx"
],
"memory": 1024,
"disk": 15360,
"metadata": {},
"created": "2011-12-20T14:25:33+00:00",
"updated": "2011-12-29T04:08:25+00:00"
}
]
```





檢視可用之DataSet
===


```
$ sdc-listdatasets
[
{
"id": "1f26e71c-2bb7-11e1-8266-5b14c4eccd12",
"urn": "sdc:admin:WinSrv2008R2STDX64CHT:1.1.0",
"name": "WinSrv2008R2STDX64CHT",
"os": "WinSrv2008R2STDX64CHT",
"type": "virtualmachine",
"description": "WinSrv2008R2STDX64CHT 1.1.0 VM image",
"default": false,
"requirements": {},
"version": "1.1.0",
"created": "2011-12-21T09:37:42+00:00"
},
{
"id": "1f190e72-2d19-11e1-b4a2-7b85c599c5d2",
"urn": "sdc:admin:WinSrv2008R2ENTX64ENG:1.1.0",
"name": "WinSrv2008R2ENTX64ENG",
"os": "WinSrv2008R2ENTX64ENG",
"type": "virtualmachine",
"description": "WinSrv2008R2ENTX64ENG 1.1.0 VM image",
"default": false,
"requirements": {},
"version": "1.1.0",
"created": "2011-12-23T03:54:28+00:00"
},...(skip)
]

```



檢視可用之Package
===


```
$ sdc-listpackages
[
{
"name": "S 1GB RAM (1CORE)",
"memory": 1024,
"disk": 15360,
"swap": 2048,
"default": false
},
{
"name": "M 2GB RAM (1CORE)",
"memory": 2048,
"disk": 30720,
"swap": 4096,
"default": false
},...(skip
]
```




測試開啟主機的語法
===
調整一臺虛擬主機的記憶體大小
===


```
$ sdc-resizemachine -p "M 2GB RAM (1CORE)" 9626a584-187c-40b0-aa84-7f6f3a22ec44
```



開啟一臺主機
===


```
$ sdc-createmachine -name simontest123 -package "S 1GB RAM (1CORE)" -dataset sdc:sdc:smartos64:1.5.1
{
"id": "845f21fe-1910-4b38-a4ca-e2a81144f9a2",
"name": "simontest123",
"type": "smartmachine",
"state": "provisioning",
"dataset": "sdc:sdc:smartos64:1.5.1",
"ips": [
"211.78.xxx.xxx"
],
"memory": 1024,
"disk": 15360,
"metadata": {},
"created": "2012-01-18T02:13:31+00:00",
"updated": "2012-01-18T02:13:31+00:00"
}
```




刪除虛擬主機
===


```
$ sdc-deletemachine 845f21fe-1910-4b38-a4ca-e2a81144f9a2
Requested transition is not acceptable due to current resource state
```



(主機刪除前，必需要停機，否則會不能刪除)
*   Stop server first


```
$ sdc-stopmachine 845f21fe-1910-4b38-a4ca-e2a81144f9a2
```



*   Confirm stop OK and delete...


```
$ sdc-deletemachine 845f21fe-1910-4b38-a4ca-e2a81144f9a2
```




實際執行
===
需求：於聖誕節前(12/20 AM 0:10)新增加一臺主機加入服務，而請load balancer增加路由部份與程式部署部份，因不在MiCloudAPI討論範圍，暫時不列出來。
撰寫排程程式($ HOME / script / bin / createServer.sh )
===


```
#!/bin/bash
export SDC_CLI_URL=https://api.micloud.tw
export SDC_CLI_ACCOUNT=YOUR_ACCOUNT
export SDC_CLI_KEY_ID=id_rsa
export SDC_CLI_IDENTITY=/Users/simonsu/.ssh/id_rsa
sdc-createmachine -name simontest123

-package "S 1GB RAM (1CORE)"

-dataset sdc:sdc:smartos64:1.5.1
echo “Server Create Done” | mailx -s “Add a Server to MiCloud” simonsu.mail@gmail.com
```


增加load balancer路由(此部分程式碼需視不同Load Balancer實作)


```
addRoute2LoadBalancer.sh
```



部署應用程式(此部分程式碼需視不同應用程式實作)


```
doDeployApplication.sh
```


將服務加入Cron Job
===


```
10 0 20 12 * $ HOME / script / bin / createServer.sh
```


上述腳本正常執行後，就可以順利的在12/20當天延展AP主機的服務，並且提供服務囉！
