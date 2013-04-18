
主機監控之設定
===
Windows
===

1.MiCloud平台虛擬主機之監控程式需使用nodejs來執行，__請先登入您的Windows虛擬主機__，再至[http://nodejs.org/](http://nodejs.org/)
<img src='images/Monitor+System-node.png' width='650' align='center'/>



2.請下載由MiCloud研發團隊撰寫的監控程式並解壓，下載網址為

```
http://211.78.245.110:3000/install/nomon-lastest.tgz
```

<img src='images/Monitor+System-nom.png' width='500' align='center'/>



3.請在桌面上新增一個副檔名為.bat的檔案(XXX.bat)，如下圖，這邊建立的檔案為test.bat
<img src='images/Monitor+System-bat.png' width='500' align='center'/>



在檔案上點選右鍵→編輯，在檔案中貼上下方指令(如下圖)



```
node您將檔案解壓縮後存放的位置
main.js，主要用來設定排程應該執行哪支程式。
```

<img src='images/Monitor+System-node1.png' width='650' align='center'/>



4.點選開始--系統管理工具--工作排程器，設定程式排程
<img src='images/Monitor+System-p1.png' width='650' align='center'/>



5.點選建立工作來新增排程
<img src='images/Monitor+System-p2.png' width='650' align='center'/>



6.在建立工作--一般，打上排程名稱，名稱可以自己命名，這裡舉例將它命名為”node”(如下圖)
<img src='images/Monitor+System-p3.png' width='650' align='center'/>



7.點選建立工作--觸發程序之新增並做設定，將排程設定為每5分鐘執行一次且是持續不間斷
<img src='images/Monitor+System-p4.png' width='650' align='center'/>
<img src='images/Monitor+System-set.png' width='650' align='center'/>



8.點選建立工作--動作之新增並設定，將前面設定的*.bat執行檔的路徑填入(步驟3中建立的檔案)
<img src='images/Monitor+System-p6.png' width='650' align='center'/>
<img src='images/Monitor+System-p8.png' width='650' align='center'/>



9.完成上方所有的排序設定後，即可在工作排程器主頁上的進行中工作裡看到您新增的排程。
<img src='images/Monitor+System-p7.png' width='650' align='center'/>



10.完成排程設定後，15分鐘後即可至MiCloud平台點選您所設置監控的主機，即可檢視您主機上的CPU、Memory、Disk的使用率。
<img src='images/Monitor+System-cpu.png' width='650' align='center'/>


歷史監控資料，可檢視一週、一個月或整年的監控狀況，並可下載近半年的原始資料。
<img src='images/Monitor+System-cpu2.png' width='650' align='center'/>


----

Linux
===
1.登入MiCloud主機清單中，選擇任何一台Linux主機
<img src='images/Monitor+System-pl1.png' width='650' align='center'/>

2.進入主機細項後，請點選”主機監控”頁籤並點擊”複製指令”按鈕
<img src='images/Monitor+System-pl2.png' width='650' align='center'/>

3.完成上述步驟後，請登入您欲監控的虛擬主機並貼上剛剛的指令

```
# curl http://211.78.245.110:3000/install/install.sh | bash
```

<img src='images/Monitor+System-pl3.png' width='650' align='center'/>

執行成功後，可由下方指令檢視監控程式是否己加入例行排程中

```
#crontab -l
```

<img src='images/Monitor+System-pl4.png' width='650' align='center'/>

4.cron job設定完成後，15分鐘後即可至MiCloud管理平台檢視您主機上的CPU、Memory、Disk的使用率。
<img src='images/Monitor+System-pl5.png' width='650' align='center'/>
也可以在歷史監控資料中查看週、月、年的資訊，並可下載近半年的原始資料。
<img src='images/Monitor+System-pl6.png' width='650' align='center'/>

