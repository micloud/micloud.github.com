
MongoDB
===
##在SmartOS上安裝MongoDB

MiCloud 在SmartOS 32bit 提供預載MongoDB的服務，可以直接選擇此預載的套件，若當初沒有選擇預載服務，用戶可以依下列步驟進行安裝。



1.本範例將在 /tmp路徑下安裝MongoDB，請先切換至tmp目錄下。

```
# cd /tmp
```

<img src='images/MongoDB+SmartMachine-p1.png' width='650' align='center'/>

2.利用crul指令下載，其指令如下:

```
# curl http://fastdl.mongodb.org/sunos5/mongodb-sunos5-x86_64-2.2.0.tgz > mongodb.tgz
```

<img src='images/MongoDB+SmartMachine-p2.png' width='650' align='center'/>

3.解開壓縮檔，並切換至mongodb-sunos5-x86_64-2.2.0下的bin目錄中:

```
# tar -zxvf mongodb.tgz
# cd mongodb-sunos5-x86_64-2.2.0/bin
```

<img src='images/MongoDB+SmartMachine-p3.png' width='650' align='center'/>

4.建立資料庫的位置

```
# mkdir -p /data/db
```

<img src='images/MongoDB+SmartMachine-p4.png' width='650' align='center'/>

5.連結資料庫，其指令如下:

```
# nohup ./mongod &
```

<img src='images/MongoDB+SmartMachine-p5.png' width='650' align='center'/>

6.執行mongo指令，即可進入環境操作

```
# ./mongo
```

<img src='images/MongoDB+SmartMachine-p6.png' width='650' align='center'/>

##MongoDB操作說明


1.檢視服務狀態:


若State為online，代表服務已啟動；反之，則代表未啟動。

```
# svcs mongodb
```

<img src='images/MongoDB+SmartMachine-p7.png' width='650' align='center'/>

2.啟用服務:


利用svcadm enable mongodb指令來啟動服務，並以svcs指令來確認是否啟用成功。

```
# svcadm enable mongodb
# svcs mongodb
```

<img src='images/MongoDB+SmartMachine-p8.png' width='650' align='center'/>

3.停止服務:


利用svcadm disable mongodb指令來啟動服務，並以svcs指令來確認是否已停止服務。

```
# svcadm disable mongodb
# svcs mongodb
```

<img src='images/MongoDB+SmartMachine-p9.png' width='650' align='center'/>

4.連結至MongoDB：


在MiCloud平台中，自行安裝MongoDB及預載的連結方式有些許差異，自行安裝的連結方式，可參考前面介紹的指令；選擇預載的用戶，需要用admin來連結至MongoDB，其指令如下，另外，登入的密碼可以在主機細項的Credentials內查看。

```
# mongo -u admin -p admin
```

<img src='images/MongoDB+SmartMachine-p10.png' width='650' align='center'/>
<img src='images/MongoDB+SmartMachine-p11.png' width='650' align='center'/>
