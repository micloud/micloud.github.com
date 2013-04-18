
建置Nagios網路監控主機
===
Nagios是一套網路監控軟體，不僅可以監控主機(本地端或遠端)及服務，管理者可自行依需求來撰寫當監控主機或服務發生問題時的反應動作，例如.可以設置當服務出現問題時會透過電子郵件的方式通知管理人員，讓管理人員更快、精準掌握網路、主機設備等狀況。

Fedora
===
安裝Nagios及相關必要套件
===
__前置作業：__


新增一個使用者(nagios)做為程式的預設使用者



```
#useradd -m nagios
```

<img src='images/Setting+Nagios-add.png' width='650' align='center'/>

__安裝Nagios及相關套件__


a.安裝httpd、php，方便您可以透過網頁使用Nagios(Nagios需建置在apache中，故於安裝Nagios前先安裝)

```
#yum -y install httpd
```

<img src='images/Setting+Nagios-yumhttpd.png' width='650' align='center'/>


```
#yum install php
```

<img src='images/Setting+Nagios-yumphp.png' width='650' align='center'/>



b.安裝gcc套件(此套件在安裝Nagios時會做check動作，故於安裝Nagios前先安裝)

```
#yum -y install gcc
```

<img src='images/Setting+Nagios-yumgcc.png' width='650' align='center'/>

c.安裝Nagios


下載Nagios軟體

```
#wget http://prdownloads.sourceforge.net/sourceforge/nagios/nagios-3.4.1.tar.gz
```

<img src='images/Setting+Nagios-wget.png' width='650' align='center'/>

解壓縮 (預設會建一個nagios目錄，並將檔案放在此目錄下)

```
#tar -xzf nagios-3.4.1.tar.gz
```


切換至nagios目錄下，並透過configure、make進行編譯

```
#./configure
```

<img src='images/Setting+Nagios-config.png' width='650' align='center'/>


```
#make all
```

<img src='images/Setting+Nagios-make.png' width='650' align='center'/>


```
#make install
#make install-init	      使用make install來安裝主程序,CGI和HTML文件
#make install-commandmode     使用make install-init在/etc/rc.d/init.d安裝啟動腳本
#make install-config          使用make install-commandmode來配置目錄權限
#make install-webconf
```


d.安裝nagios-plugins-1.4.11 套件

```
#wget http://prdownloads.sourceforge.net/sourceforge/nagiosplug/nagios-plugins-1.4.11.tar.gz
```

<img src='images/Setting+Nagios-wget2.png' width='650' align='center'/>

解壓縮檔 (預設會建一個nagios-plugins-1.4.11目錄，並將檔案放在此目錄下)

```
#tar -xzf nagios-plugins-1.4.11.tar.gz
```


切換至nagios-plugins-1.4.11目錄下，並透過configure、make進行編譯

```
#./configure
#make
#make install
```





設定
===
a.設定一個帳號，此帳號可以透過網頁登入做管理(帳號為nagios)

```
#htpasswd -c /usr/local/nagios/etc/htpasswd.users nagios
```

<img src='images/Setting+Nagios-pwd.png' width='650' align='center'/>

b.將上方的帳號加入cgi.cfg中，使此帳號有監控的權限。

```
#vi /usr/local/nagios/etc/cgi.cfg
```

於下方參數中加入您的帳號(有多個帳號時請用逗號分開)

```
authorized_for_system_information=nagiosadmin,nagios
authorized_for_configuration_information=nagiosadmin,nagios
authorized_for_system_commands=nagiosadmin,nagios
authorized_for_all_services=nagiosadmin,nagios
authorized_for_all_hosts=nagiosadmin,nagios
authorized_for_all_service_commands=nagiosadmin,nagios
authorized_for_all_host_commands=nagiosadmin,nagios
```

<img src='images/Setting+Nagios-cgi.png' width='650' align='center'/>

c.設定系統有異常時，通知的email。請編輯contacts.cfg檔，在下圖中紅色框框的地方輸入被通知的email地址

```
#vi /usr/local/nagios/etc/objects/contacts.cfg
```

<img src='images/Setting+Nagios-nagios.png' width='650' align='center'/>

檢查設定檔是否有問題

```
#/usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
```

<img src='images/Setting+Nagios-co.png' width='650' align='center'/>

d.將nagios加入chkconfig中，方便查詢及開啟服務

```
#chkconfig --add nagios
```

e.將nagios設定於開機時自動啟動

```
#chkconfig nagios on
```

f.啟動nagios

```
#service nagios start
```

g.啟動httpd並更改開機自動啟動此服務

```
#service httpd start
#chkconfig httpd on
```

h.關閉防火牆，網頁才能正常開啟，並設置防火牆於開機時不自動啟動

```
#/etc/init.d/iptables stop
#chkconfig iptables off
```





驗證
===
a.請在瀏覽器上，輸入http://192.168.xxx.xxx/nagios/ ，輸入您設置好的帳號及密碼
<img src='images/Setting+Nagios-login.png' width='650' align='center'/>
成功登入之頁面
<img src='images/Setting+Nagios-success.png' width='650' align='center'/>

b.監控Services
安裝完成後，您會發現http服務會有一個警告訊息如下圖紅色框框的部分
<img src='images/Setting+Nagios-su2.png' width='650' align='center'/>
原因:
雖然http服務正常，但預設apache網頁目錄/var/www/html沒有相關的index.html檔，才會出現這個警告請在此目錄下加入一個空的index.html，幾分鐘後警告即被排除，指令如下:

```
#touch /var/www/html/index.html
```


c.驗證是否收到系統報警通知
<img src='images/Setting+Nagios-http.png' width='650' align='center'/>
由上方service監控畫面上，可以看出Swap Usage為Critical，故Nagios會自動發信至您之前設定的郵件地址，信件內容如下
<img src='images/Setting+Nagios-mail.png' width='650' align='center'/>
