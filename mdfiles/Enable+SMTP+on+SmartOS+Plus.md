如果您需要建立電子郵件伺服器來收發電子郵件，您必須在您的主機上啟用此服務，而處理電子郵件收發服務的通訊協定為簡易郵件傳送通訊協定，簡稱SMTP(Simple Mail Transfer Protocol)，在SmartMachines上SMTP預設是關閉，但用戶可以利用以下步驟來啟用SMTP的服務。



前置作業
===
在啟動SmartOS 主機上的SMTP之前，必需先安裝postfix和courier，您可以先使用pkgin search指令搜尋是否已有存在postfix 、courier，指令如下：


```
#pkgin se postfix
```


<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP1.png' width='600' align='center'/>


```
# pkgin se courier
```


<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP2.png' width='600' align='center'/>


透過svcs指令確認postfix及courier的服務處於運行狀態


```
#svcs -a | grep -Ee "postfix|courier”
```


<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP3.png' width='600' align='center'/>


從上面的擷圖可以看出，預設只有postfix是啟動的(online)，而courier中的authlib及imap的服務是關閉狀態，您必須透過svcadm enable 指令來啟動courier的兩項服務，指令如下:


```
#svcadm enable svc:/network/courier:imap
#svcadm enable svc:/network/courier:authlib
```


<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP4.png' width='600' align='center'/>



避免有些服務未啟用，故再次執行svcs指令來確認服務是否正常執行中:
<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP5.png' width='600' align='center'/>

啟動SMTP
===

1. 啟動SMTP的過程中，首先需要做連結檔，未來postfix可以直接在此檔中找到我們所要的的函式庫(lib)，指令如下:


```
# ln -s /opt/local/etc/sasl2/etc/sasl2
```






2. postfix裡需修改main.cf及master.cf檔。main.cf是postfix最重要的設定檔，所有修改的動作皆需在這個檔案裡進行修改；master.cf主要是規定postfix每個程序的運作參數。



*  修改main.cf檔，此檔案的路徑存在 /opt/local/ect/postfix/main.cf，新增內容如下擷圖中以紅色框框起來的部分。


*  *inet_interfaces=all，設定postfix能使用的網路介面，一般預設為localhost， 如果是對外服務的郵件主機，就必須要設定為all。
*  *smtpd_sasl_auth_enable=yes，“確定是否針對Client啟動sasl的認證？”預設是不啟用，須自行將它啟用。


<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP6.png' width='600' align='center'/>






*  修改master.cf，此檔案的路徑存在 /opt/local/ect/postfix/master.cf，新增內容如下擷圖中以紅色框框起來的部分。
*  *smtpd_enforce_tls=no，啟動auth 驗證。
*  *smtpd_tls_cert_file=opt/local/etc/openssl/private/salfsigned.pem
*  *smtpd_tls_loglevel=0
*  *smtpd_use_tls=yes
<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP7.png' width='600' align='center'/>







驗證程序
===
1. 服務設定完成後，利用以下指令確認是否設定成功，其中”Content” 為信件內容，”The Subject”為信件主旨，在信件主旨之後則是您需要測試收到系統所發出的電子郵件地址，此範例的電子郵件地址是設定傳送到Gmail。
<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP8.png' width='600' align='center'/>


2. 完成後可以前往電子郵件信箱確認是否收到信件，如下圖所示收到主旨為“The Subject”的郵件，表示此設定為成功。
<img src='images/Enable+SMTP+on+SmartOS+Plus-SMTP9.png' width='600' align='center'/>
