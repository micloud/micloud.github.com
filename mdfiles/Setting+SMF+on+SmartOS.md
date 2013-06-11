在SmartOS上設置SMF
===
SmartOS中的服務管理功能 (Service Management Facility, SMF)，類似於Linux系統中init.d的service架構，使用者可透過SMF的管理，系統會依設定來開啟會暫停每個服務。 本範例為如何建立一個服務加入SMF中。



若要執行一項服務，首先必須設置一個腳本，透過腳本即可設定服務的狀態，SMF中所使用之腳本的檔案類型為xml。以下將透過下載一個腳本做為範例，我們將利用此下載的腳本來修改為我們需要的腳本並進行測試及驗證。



##下載腳本範例(manifest)


```
#wget --no-check-certificate http://github.com/isaacs/joyent-node-on-smart-example/raw/master/node-hello-world-service-manifest.xml
```


##設定服務

以自建服務至主機為範例，必須修改的指令如下。

```
# vi noode-hello-world-service-manifest.xml
```


更改部分如下:


```
1.修改設定服務名稱，由node-hello-world-service 改為testSMF。
原設定：<service_bundle type="manifest" name="node-hello-world-service">
修改為：<service_bundle type="manifest" name="testSMF">

2.修改SMF服務啟動時，服務中的狀態名稱:
原設定：<service name="site/node-hello-world-service" type="service" version="1">
修改為：<service name="site/testSMF" type="service" version="1">

3.在執行服務的路徑中，可設定所需執行檔案的資料夾中:
原設定：<method_context><working_directory="/home/admin/hello-world">
修改為：<method_context><working_directory="/root/testSMF">

4.設定user以及group中，可以執行的名稱，原範例是admin及staff，我們將他們皆設定為root。
原設定：<method_credential user="admin" group="staff" privileges='basic,net_privaddr' />
修改為：<method_credential user="root" group="root" privileges='basic,net_privaddr' />

5.設定執行檔路徑變數，我們的範例是Nodejs服務，故需建立Nodejs執行檔的路徑。
原設定：<envvar name="PATH" value="/home/admin/local/bin:/usr/local/bin:/usr/bin:/usr/sbin:/bin"/>
修改為：<envvar name="PATH" value="/opt/node/bin:/usr/local/bin:/usr/bin:/usr/sbin:/bin"/>

6.設定目錄的環境變數:
原設定：<envvar name="HOME" value="/home/admin"/>
修改為：<envvar name="HOME" value="/root"/>

7.設定執行檔的路徑:
原設定：exec="/opt/local/bin/node /home/admin/hello-world/server.js"
修改為：exec="/opt/local/bin/node /root/testSMF/server.js "

```



上述修改的位置如下方黃色框框所示:


<img src='images/Setting+SMF+on+SmartOS-CaptureWiz143.png' width='650' align='center'/>

##驗證服務啟動

完成以上步驟後，開始驗證此自訂服務並將其服務匯入SMF，其指令如下:

```
# svccfg import node-hello-world-service-manifest.xml
```

<img src='images/Setting+SMF+on+SmartOS-p1.png' width='650' align='center'/>

檢視匯入服務狀態，指令如下:

```
# svcs –a | grep testSMF
```

<img src='images/Setting+SMF+on+SmartOS-p2.png' width='650' align='center'/>
從上方擷圖可看出，testSMF已成功匯入，但未啟動。


利用svcadm指令來啟用服務，並且再次檢視服務狀態，online表示已啟動:

```
# svcadm enable testSMF
# svcs–a | grep testSMF
```

<img src='images/Setting+SMF+on+SmartOS-p3.png' width='650' align='center'/>

##刪除已匯入的SMF

刪除服務之前，須先關閉後，方可進行刪除動作。


(1) 關閉 testSMF 服務

```
# svcadm disable testSMF
# svcs testSMF
```

<img src='images/Setting+SMF+on+SmartOS-p4.png' width='650' align='center'/>

(2) 刪除 testSMF服務

```
# svccfg delete testSMF
# svcs testSMF
```

<img src='images/Setting+SMF+on+SmartOS-p5.png' width='650' align='center'/>
