Windows Hostname設置
===
當您申請MiCloud上任何主機時，若未指定主機名稱，系統將預設以亂數產生一串文字做為您的主機名稱，可能類似：fxyzabcd.local的名稱。您可以以IP登入您的主機，並透過"hostname"之指令看到您的Hostname。


如您需要重設您的主機名稱，您可以修改某些檔案來達到修改Hostname的目的，詳細說明如下:





(1)點選開始，並且進入我的電腦，進入後點選上方工具，再點選資料夾選項
<img src='images/Setting+hostname+on+Windows-wihostname.jpg' width='650px' align='center'/>



(2)由於更改Hostname所在的資料夾為隱藏檔，藉由以下方式可以顯示出來。


選擇檢視欄位後往下方選擇，可以找到”顯示所有檔案和資料夾”的選項，並點選套用。
<img src='images/Setting+hostname+on+Windows-wihostname1.jpg' width='450px' align='center'/>



(3)成功之後開啟我的電腦進入以下路徑

```
C:
WINDOWS
system32
drivers
etc
```

利用記事本或是Notepad++開啟hosts文件並且在文件內裡面的127.0.0.1 localhost底下加入您想設定新的hostname，儲存後即可使用新的hostname。

```
127.0.0.1       localhost
127.0.1.1       windows.example.com localhost
```

