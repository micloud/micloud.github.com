
公測/免費主機金鑰設置與連線教學
===
說明：本次公測主機為MiCloud 2XS型號主機，為小於一般市場提供之虛擬主機機型，提供一般網頁服務應用與開發使用，其中網路連線部分提供Public DNS，讓您用主機之專屬DNS連限，連線方式請參考下面說明：



您申請免費30天試用服務後，SmartOS/Linux主機連線必須透過SSH協定與SSH Key的認證，以確保您與您的伺服器之間的連線安全。


1.若您已設定ssh key則使用您原本的私鑰進行連線


2.<font color='blue'>若您尚未設定ssh key則系統會發送一組私鑰和公鑰給您,相關設定如下:</font>



Linux/MacOS主機
===
如您為Linux或MacOS用戶，在登入平台後，選擇主機，檢視主機的細項畫面，您可以看到如下資訊：


<img src='images/Free+machine+%26+Connect+SSH-dnsport.jpg' width='600' align='center'/>



請直接使用下面指令連線：

```
ssh root@your.domain.name -p ssh_port -i your_private_key
```

ex:

```
ex: ssh root@192-168-255-13.my.micloud.tw -p 65013 -i ~/.ssh/id_rsa
```




Windows主機(使用Putty工具連線範例)
===
由於Putty採用特有格式的puk檔案來封裝SSH Key，因此必須透過Putty相關工具將MiCloud產出之Key File進行轉換，轉換動作如下：


(1)將信件中的私鑰下載至您的電腦中，如下圖:<br />
(2)於下列網址下載PuTTy、Pageant and PuTTYgen，該工具可以協助您進行SSH Key的建立與SSH的連線。


&nbsp;&nbsp;&nbsp;網址為:[http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html ]( http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)


<img src='images/Free+machine+%26+Connect+SSH-putty.jpg' width='500' align='center'/>



(3)執行puttygen.exe並點選Load，”檔案類型”選擇所有檔案，匯入您所下載的key


<img src='images/Free+machine+%26+Connect+SSH-load.jpg' width='500' align='center'/>


<img src='images/Free+machine+%26+Connect+SSH-file.jpg' width='500' align='center'/>



(4)匯入後會才會產生putty可執行的key，並將此金鑰儲存。


<img src='images/Free+machine+%26+Connect+SSH-save.jpg' width='500' align='center'/>


<img src='images/Free+machine+%26+Connect+SSH-save2.jpg' width='500' align='center'/>



(5)開啟pageant.exe執行後程式會在螢幕的右下角如下圖:


<img src='images/Free+machine+%26+Connect+SSH-pageant.jpg' width='500' align='center'/>


點開後按下Add key按鈕，將上面所儲存的key開啟。


<img src='images/Free+machine+%26+Connect+SSH-addkey.jpg' width='500' align='center'/>


<img src='images/Free+machine+%26+Connect+SSH-addkey2.jpg' width='500' align='center'/>



(6)新增完後請先登入平台選擇主機，檢視主機的細項畫面，再開啟putty.exe，hostname為DNS，設定完按下open按鈕，即可使用。


<img src='images/Free+machine+%26+Connect+SSH-machine.jpg' width='600' align='center'/>


<img src='images/Free+machine+%26+Connect+SSH-dnsport1.jpg' width='600' align='center'/>


