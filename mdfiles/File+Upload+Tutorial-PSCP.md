檔案上傳教學(指令)
===
影片:[MiCloud 使用 PSCP 配合 SSH-Key(.ppk) 上傳與下載檔案](http://www.youtube.com/watch?v=Ha17-BbePI4)
<div align="center">
<embed width="420" height="345" src="http://www.youtube.com/v/Ha17-BbePI4&hd=1" type="application/x-shockwave-flash"></embed>
</div>
使用 PSCP 配合 SSH-Key(.ppk) 上傳與下載檔案
===

設定環境變數
===
*  選擇一個資料夾放置 Putty 相關檔案(putty.exe,pscp.exe...)


本範例放在 __C:
putty__ 資料夾內


<img src='images/File+Upload+Tutorial-PSCP-a.png' width='600' align='center'/>
*  於我的電腦空白處按右鍵,選擇 __內容__


<img src='images/File+Upload+Tutorial-PSCP-a1.png' width='600' align='center'/>
*  於內容之上方表單選擇 __進階__ ,於下方點選 __環境變數(N)__


<img src='images/File+Upload+Tutorial-PSCP-a2.png' width='400' align='center'/>
*  於下方 __系統變數(S)__ 中下拉,點選變數 __Path__ , 使用編輯(I)


於變數值最後加上__分號(;)__接著加上您putty所在資料夾的路徑


本範例則是加上 __;C:
putty__
<img src='images/File+Upload+Tutorial-PSCP-a3.png' width='400' align='center'/>
*  按下 __開始__ -> __執行(R)__ -> 輸入 __cmd__ -> 按下 __確定__ 後便會開啟命令提示字元
<img src='images/File+Upload+Tutorial-PSCP-a4.png' width='400' align='center'/>
*  在命令提示字元中輸入 __pscp__ 測試環境變數之設定是否成功
<img src='images/File+Upload+Tutorial-PSCP-a5.png' width='650' align='center'/>

Putty 連線設定
===
左鍵雙擊下載之putty.exe，下圖為putty執行畫面：


請於__Host Name (or IP address)__內輸入您機器的IP,
__Port__ 則是輸入 __22__ (22為MiCloud的預設SSH連接阜)


下方的 __Saved Sessions__ 則是給您下次使用時能夠辨別這是哪一台機器用,所以能可以以您希望的名字命名,也可以使用當台機器的IP作為命名.




<img src='images/File+Upload+Tutorial-PSCP-b1.png' width='500' align='center'/>
輸入完成後請於左邊的Category表單中點選 __Connection__ -> __SSH__ -> __Auth__ 內(如下圖)


點選 __Browse...__ 後選擇您的private key加入


<img src='images/File+Upload+Tutorial-PSCP-b2.png' width='500' align='center'/>


為確保您使用Putty時不會出現中文亂碼,您可於左邊的Category表單中點選 __Window__ -> __Translation__


於右方 __Remote Character set:__ 的下拉式選單中選擇 __UTF-8__


<img src='images/File+Upload+Tutorial-PSCP-b4.png' width='500' align='center'/>

為了下次能夠方便使用,請於左邊的Category表單中點選__Session__


回到Session後,點選右方的Save


這樣下次要連線這台機器時你就不用特別再去設定,只需要於左方Saved Sessions中左鍵雙擊你存下來的那個名子即可.


<img src='images/File+Upload+Tutorial-PSCP-b3.png' width='500' align='center'/>

進入Putty後,他會要求你輸入帳號(Login as:),請輸入root


<font color="red">(註：連線時，請使用root登入，可不用輸入密碼：若使用預設帳號jill登入，則請參照Customer Portal上Credential設定。)</font>
<img src='images/File+Upload+Tutorial-PSCP-b6.png' width='500' align='center'/>
<img src='images/File+Upload+Tutorial-PSCP-b5.png' width='500' align='center'/>

PSCP 指令介紹
===
於MS-DOS 命令的視窗中輸入指令即可上傳與下載檔案
*  <font color="red">(1)  pscp  拷貝檔案(絕對路徑)  使用者(root)@電腦地址(IP):新檔名(絕對路徑)    - 從 MS Window 拷貝到 Linux 電腦

</font>
ex : 我要從我正在使用的電腦,放在C槽中的資料夾Windows_Test底下有一個upload.cpp的檔案,上傳到我在MiCloud申請的電腦(123.123.123.123)中,並放在/home/Linux_Test底下


所以我的指令會是 : pscp c:
Windows_Test
upload.cpp root@123.123.123.123:/home/Linux_Test
*  <font color="red">(2)  pscp  使用者(root)@電腦地址(IP):拷貝檔案(絕對路徑)  新檔名(絕對路徑)    - 從 Linux 拷貝到 MS Window 電腦

</font>
ex : 我要從我在MiCloud申請的電腦(123.123.123.123)中抓一個download.cpp的檔案,它放在/home/Linux_Test底下,並將它放到我的電腦C槽中的資料夾Windows_Test底下


所以我的指令會是 : pscp root@123.123.123.123:/home/Linux_Test/download.cpp c:
Windows_Test
<img src='images/File+Upload+Tutorial-PSCP-a6.png' width='650' align='center'/>
