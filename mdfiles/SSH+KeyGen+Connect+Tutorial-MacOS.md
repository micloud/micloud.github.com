金鑰產生與連線教學(MacOS)
===

##SSH Key 限制

MiCloud SSH Key模組使用上有下面限制，使用前需要特別注意：


1. SSH Key僅適用於SmartOS及Linux主機，Windows主機不適用。
2. Linux server之SSH Key必須於server建立前匯入，如於Server建立後匯入之SSH Key將無法使用於Linux主機上(但SmartOS可以使用)。
3. <font color="red">申請Linux主機者，建議務必修改root密碼，並妥善保存，避免SSH Key遺漏時候造成無法連線問題。</font>



##MiCloud SSH Key 管理功能

MiCloud提供SSH Key的管理模組，您可透過MiCloud Customer Portal(http://micloud.tw) 進行SSH Key的上傳與管理，透過SSH協定與SSH Key的認證，將可確保您與您伺服器之間的連線安全。

SSH Key上傳與管理，["使用Windows連線SmartMachine"](/index.html?page=SSH+KeyGen+Connect+Tutorial-Windows.md) 說明

##Mac OS 建立 SSH-KEY 與使用方法

產生SSH Key:

```
ssh-keygen -t rsa
```

產生過程如下：
<img src='images/SSH+KeyGen+&+Connect+Tutorial-MacOS-pic1.png' width='500' align='center'/>
上圖底下的兩個紅色框框的內容為您的私鑰與公鑰所擺放的位置。

```
cd /user/[您的帳號資料夾]/.ssh	#切換到SSH Key的預設資料匣](cd /user/[您的帳號資料夾/.ssh	#切換到SSH Key的預設資料匣)
ls                              #查看該資料夾底下是否正確產生id_rsa(private key)及id_rsa.pub(public key)兩個檔案
cat id_rsa.pub		        #讀取產出的金鑰檔案
```

<img src='images/SSH+KeyGen+&+Connect+Tutorial-MacOS-pic2.png' width='500' align='center'/>
公開金鑰產出格式一不同機器略有不同。


複製上圖下方紅色框框內的文字貼於網頁中的SSH-Key欄位中即可



##Mac OS 連線方式

使用 openssh client，請帶參數-i來使用剛剛所建的id_rsa這個private ssh key。


例如：

```
ssh -i id_rsa root@211.123.123.31
```

<img src='images/SSH+KeyGen+&+Connect+Tutorial-MacOS-pic3.png' width='500' align='center'/>

