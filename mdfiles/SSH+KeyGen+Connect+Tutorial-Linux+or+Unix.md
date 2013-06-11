金鑰產生與連線教學(Linux/Unix)
===

##SSH Key 限制

MiCloud SSH Key模組使用上有下面限制，使用前需要特別注意：


1. SSH Key僅適用於SmartOS及Linux主機，Windows主機不適用。
2. Linux server之SSH Key必須於server建立前匯入，如於Server建立後匯入之SSH Key將無法使用於Linux主機上(但SmartOS可以使用)。
3. <font color="red">申請Linux主機者，建議務必修改root密碼，並妥善保存，避免SSH Key遺漏時候造成無法連線問題。</font>



影片:[MiCloud SSH金鑰產生教學(Linux/Unix)](http://www.youtube.com/watch?v=MUxTHgrMj-E)
<div align="center">
<embed width="420" height="345" src="http://www.youtube.com/v/MUxTHgrMj_E&hd=1" type="application/x-shockwave-flash"></embed>
</div>
##MiCloud SSH Key 管理功能

MiCloud提供SSH Key的管理模組，您可透過MiCloud Customer Portal\(http://micloud.tw \)進行SSH Key的上傳與管理，透過SSH協定與SSH Key的認證，將可確保您與您伺服器之間的連線安全。

SSH Key上傳與管理，請參考 ["使用Windows連線SmartMachine"](/index.html?page=SSH+KeyGen+Connect+Tutorial-Windows.md) 說明


##Linux/Unix Like 系統建立SSH-KEY與使用方法

產生SSH Key:

```
ssh-keygen -t rsa
```

產生過程如下：

```
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):	#按Enter繼續下一步
/root/.ssh/id_rsa already exists.
Overwrite (yes/no)? yes					        #如果已經存在會詢問是否覆蓋
Enter passphrase (empty for no passphrase):			#按Enter繼續下一步
Enter same passphrase again:					#按Enter繼續下一步
Your identification has been saved in /root/.ssh/id_rsa.	#private key (預設產出路徑為$HOME/.ssh)
Your public key has been saved in /root/.ssh/id_rsa.pub.	#public key
The key fingerprint is:
ad:a2:53:fc:2c:eb:f1:3a:3d:6b:44:92:29:33:f0:a5 root@XXXXX.local
```

確定並複製產出的SSH Key:

```
cd $HOME/.ssh/		#切換到SSH Key的預設資料匣
cat id_rsa.pub		#讀取產出的金鑰檔案
```

公開金鑰產出格式一不同機器略有不同，但大至上類似下面一串文字：

```
ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAsU6C3X3dwtRcpHDGb1nrYOmdWwsLAu1DVtR+UebO53Cr
QWl7j/FKcLQFPRliiIIsR0rmt5+8s3JyIwkpd+2Ci5Szvhs/URpVhtoei4Xn0TMQg/I/8ZnKHxAsZ2tg
r91eLfYSbMGqqkqS371G68HFDqTgjSAOoPUTWms8afMZ67B/Fr3Yrt8egEaSdpTw== root@XXXX
```

複製這段文字貼於網頁中的SSH-Key欄位中即可


下圖為Linux參考畫面:


<img src='images/SSH+KeyGen+&+Connect+Tutorial-Linux+or+Unix-linux-key.png' width='500' align='center'/>

##Linux/Unix Like 系統連線方式

使用 openssh client，請帶參數-i來使用剛剛所建的id_rsa這個private ssh key。


例如：

```
ssh -i id_rsa root@211.123.123.31
```


##Linux 主機更新SSH Key

MiCloud Linux主機於開通主機時會將您帳戶資料中之SSH Key匯入新開通的Linux主機中，匯入的目錄位於：$HOME/.ssh/authorized_keys檔案中，此為一次性設定，日後再登錄至MiCloud Customer Portal之SSH Key將不會再寫入Linux主機中(SmartOS之認證為結合SSH Key Database之認證，因此不在此限制下)。若您需要更新SSH Key，可採下面步驟：

*  產生SSH Key:
請參考：“MiCloud自助服務操作資訊 > SSH金鑰相關使用教學”中金鑰產生部分。

*  將Public Key寫入Server端$HOME/.ssh/authorized_keys檔案中，以斷行隔開

```
vi $HOME/.ssh/authorized_keys
```

增加您產生的public key至該檔案中

##Joyent Wiki使用SSH連線教學與資訊

*  SSH金鑰產生與設定：http://wiki.joyent.com/display/gen/SSH+Guide
*  SSH連線緩慢之設定調整：http://wiki.joyent.com/display/gen/SSH+Guide#SSHGuide-SSHslowfromUbuntuLinuxorCygwin