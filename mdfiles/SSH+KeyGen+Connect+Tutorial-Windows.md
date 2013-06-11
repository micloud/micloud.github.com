金鑰產生與連線教學(Windows)
===

##SSH Key限制

MiCloud SSH Key模組使用上有下面限制，使用前需要特別注意：


1. SSH Key僅適用於SmartOS及Linux主機，Windows主機不適用。
2. Linux server之SSH Key必須於server建立前匯入，如於Server建立後匯入之SSH Key將無法使用於Linux主機上(但SmartOS可以使用)。


影片:[MiCloud SSH Key 產生與管理](http://www.youtube.com/watch?v=QdHGTfH-WGg)
<div align="center">
<embed width="420" height="345" src="http://www.youtube.com/v/QdHGTfH_WGg&hd=1" type="application/x-shockwave-flash"></embed>
</div>
影片:[Windows主機使用PuTTY連線MiCloud機器](http://www.youtube.com/watch?v=1s1HZiPV17Q)
<div align="center">
<embed width="420" height="345" src="http://www.youtube.com/v/1s1HZiPV17Q&hd=1" type="application/x-shockwave-flash"></embed>
</div>

##MiCloud SSH Key管理功能

MiCloud提供SSH Key的管理模組，您可透過[MiCloud Customer Portal](http://micloud.tw)進行SSH Key的上傳與管理，透過SSH協定與SSH Key的認證，將可確保您與您伺服器之間的連線安全。



<font color="red">申請 Linux/Unix 主機者，建議務必修改root密碼，並妥善保存，避免SSH Key遺漏時候造成無法連線問題。</font>



##Windows端SSH連線設定

下面將介紹MiCloud上建立SSH Key與上傳SSH Key的方式：


1. 於下列網址下載 Putty and PuttyGen，該工具可以協助您進行SSH連線與產生SSH連線金鑰(SSH Key)。


[Putty download page](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-putty-download-page.png' width='500' align='center'/>

2. 執行 PuttyGen.exe，並點選”Generate”按鈕


<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-putty-generator.png' width='500' align='center'/>
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-putty-generator2.png' width='500' align='center'/>
在執行的時候請<font color="red" style="font-weight:bold">一直搖晃您的滑鼠</font>直到密碼產生。
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-putty-generator3.png' width='500' align='center'/>
執行完成後，請儲存您的public key (Save public key按鈕)與private key (Save private key)按鈕。


3.上傳SSH Key


登入系統後，點選右上方帳戶並點選下方SSH Key頁籤 ，填上SSH Key名稱，並將上面PuttyGen產生的檔案內容拷貝貼在SSH金鑰欄位。
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-p1+-7.png' width='650' align='center'/>
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-upload-key2.png' width='500' align='center'/>
上圖圈起的key即是public key ，可將裡面的內容全部直接複製貼上於SSH 金鑰的欄位內即可。或是開啟SSH public key檔案。


__SSH public key檔案:__
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-upload-key3.png' width='600' align='center'/>
Public key檔案內容範例如上圖，請將第3-7行拷貝下來貼到SSH金鑰欄位，並在最前面加上“ssh-rsa ”，填寫畫面與填寫內容如下圖所示：
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-upload-key4.png' width='500' align='center'/>
上述動作已完成SSH Key之上傳動作，請妥善保管public / private keys。

##Windows使用SSH登入系統

左鍵雙擊下載之putty.exe，下圖為putty執行畫面：


請於__Host Name (or IP address)__內輸入您機器的IP,
__Port__ 則是輸入 __22__ (22為MiCloud的預設SSH連接阜)


下方的 __Saved Sessions__ 則是給您下次使用時能夠辨別這是哪一台機器用,所以能可以以您希望的名字命名,也可以使用當台機器的IP作為命名.



輸入完成後請於左邊的Category表單中點選 __Connection__ -> __SSH__ -> __Auth__ 內(如下圖)
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b1.png' width='500' align='center'/>

點選 __Browse...__ 後選擇您的private key加入


為確保您使用Putty時不會出現中文亂碼,您可於左邊的Category表單中點選 __Window__ -> __Translation__


<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b2.png' width='500' align='center'/>

於右方 __Remote Character set:__ 的下拉式選單中選擇 __UTF-8__


為了下次能夠方便使用,請於左邊的Category表單中點選__Session__


<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b4.png' width='500' align='center'/>

回到Session後,點選右方的Save


這樣下次要連線這台機器時你就不用特別再去設定,只需要於左方Saved Sessions中左鍵雙擊你存下來的那個名子即可.


<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b3.png' width='500' align='center'/>

進入Putty後,他會要求你輸入帳號(Login as:),請輸入root


<font color="red">(註：連線時，請使用root登入，可不用輸入密碼：若使用預設帳號jill登入，則請參照Customer Portal上Credential設定。)</font>
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b6.png' width='500' align='center'/>
<img src='images/SSH+KeyGen+&+Connect+Tutorial-Windows-b5.png' width='500' align='center'/>
