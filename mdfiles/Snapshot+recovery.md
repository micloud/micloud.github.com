使用Snapshot備份及還原
===
系統快照功能，可幫助您還原被刪除或被破壞的系統。


當您需要操作到可能影響系統運作的動作時，可先建立系統快照，以防系統損壞無法回復。


##以下為系統快照之測試：


1.請先登入您的主機，並建立一個測試檔”text.txt”


<img src='images/Snapshot+recovery-snapshot2.jpg' width='650' align='center'/>


2.建立後，登入MiCloud平台中線上管理工具，選擇該台主機，並按下右邊的"建立系統快照"


<img src='images/Snapshot+recovery-snapshot.jpg' width='650' align='center'/>


建立完成，如下圖


<img src='images/Snapshot+recovery-snapshot1.jpg' width='650' align='center'/>


3.回到主機將text.txt檔刪除


<img src='images/Snapshot+recovery-snapshot3.jpg' width='650' align='center'/>


再到平台上選擇您欲回覆時間點的系統快照，點"回復選取的快照"。


<img src='images/Snapshot+recovery-snapshot7.jpg' width='650' align='center'/>


回復選取的快照主機會經過三個動作(關閉主機-->回復主機-->重新啟動)，待重啟完後主機即回覆到之前的時間點狀態。


<img src='images/Snapshot+recovery-snapshot8.jpg' width='650' align='center'/>


開始回復，如下圖


<img src='images/Snapshot+recovery-snapshot4.jpg' width='650' align='center'/>


4.系統回復過程中，主機會重新啟動，所以之前的連線動作會不存在，如下圖
<img src='images/Snapshot+recovery-snapshot9.jpg' width='650' align='center'/>


請重新連線後確認檔案是否回復


<img src='images/Snapshot+recovery-snapshot5.jpg' width='650' align='center'/>


Text.txt即被回復了。
