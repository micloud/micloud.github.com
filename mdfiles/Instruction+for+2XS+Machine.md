
免費主機主機使用說明
===
Small Package 服務主機為256M記憶體、10GB硬碟、1Core CPU之SmartOs主機，網路配置部分，提供一個內部私有IP，並透過外部DNS設定串聯，內部主機彼此間可以透過私有IP互通。一般設定說明如下:


##HTTP/HTTPS使用

開放80、443、8080、3000、10000等port供HTTP(S)連線使用，連線時請使用主機DNS名稱連線(Ex:http://192-168-255-13.my.micloud.tw)



##80:Default HTTP protocol

預設web目錄：/opt/local/share/httpd/htdocs


預設支援：php模組


使用者可以透過下面指令操作服務：


啟動：svcadm enable apache


關閉：svcadm disable apache


瀏覽網址：http://you_domain_name/


說明：如欲修改預設的htdoc目錄，可異動：includes/directory.conf與includes/core.conf兩個檔案，置換對應的目錄
*  includes/directory.conf: 修改DocumentRoot至您的目錄
*  includes/core.conf: 修改Directory物件之目錄位置至您的目錄

##443: Default HTTPS protocol (HTTP轉SSL，使用443 Port)

預設目錄：/opt/local/share/httpd/htdocs


預設支援：php模組


使用者可以透過下面指令操作服務：


啟動：svcadm enable apache


關閉：svcadm disable apache


瀏覽網址：https://you_domain_name/


說明：SmartOS主機提供預設Self-Sign的SSL金鑰，位置為：/opt/local/etc/openssl/private/selfsigned.pem，設定上只需參考下面檔案，然後重起主機即可

```
# vi /opt/local/etc/httpd/virtualhosts/myssl.conf
<VirtualHost _default_:443>
SSLEngine On
SSLCertificateFile /opt/local/etc/openssl/private/selfsigned.pem
SSLCertificateKeyFile /opt/local/etc/openssl/private/selfsigned.pem
DocumentRoot /opt/local/share/httpd/htdocs
</VirtualHost>
```


##8080:Default Tomacat HTTP protoca

由於Smartos預設沒有Tomcat, 需自行下載，指令如下


搜尋可下載的Tomcat(黃色框框部分為可下載的版本)

```
#pkgin se tomcat
```

<img src='images/Instruction+for+2XS+Machine-setomcat.jpg' width='650' align='center'/>
下載您需要的版本

```
#pkgin in apache-tomcat-7.0.22
```

<img src='images/Instruction+for+2XS+Machine-intomcat.jpg' width='650' align='center'/>
預設JDK版本：JDK6


Tomcat目錄：/opt/local/share/tomcatl


部署目錄：/opt/local/share/tomcat/webapps


使用者可以透過下面指令操作服務：


啟動：/opt/local/share/tomcat/bin/startup.sh


關閉：/opt/local/share/tomcat/bin/shutdown.sh


瀏覽網址：http://you_domain_name:8080/



##3000: Default Node.js (ExpressJS) protocal

Node.js版本：v0.6.17


Npm版本：v1.2.21


預載Npm套件：express@2.5.9, forever@0.9.1, smartdc@6.5.3


使用範例：


$ express TestProject


$ cd TestProject && npm install


啓動服務：node app.js


關閉服務：kill `ps -ef | grep “node app.js” | awk ‘{print $2}’`


瀏覽網址：http://you_domain_name:3000/



##10000: Default Webmin protocal

(背後服務走HTTPS 10000 Port，Stingray負責重導流量)


使用者可以透過下面指令操作服務：


啟動：svcadm enable webmin


關閉：svcadm disable webmin


瀏覽網址：https://you_domain_name:10000/



##其他-SmartOS套件安裝與管理：


```
搜尋：pkgin search [package name]](搜尋：pkgin search [package name)
安裝：pkgin install [package name]](安裝：pkgin install [package name)
移除：pkgin remove [package name]](移除：pkgin remove [package name)
```


##其他-SMF服務管理：


```
啓動服務：svcadm enable [service name]](啓動服務：svcadm enable [service name)
關閉服務：svcadm disable [service name]](關閉服務：svcadm disable [service name)
服務狀態檢視：svcs -a ]( grep [service name)
服務LOG檢視：tail -f `svcs -L [service name]`](服務LOG檢視：tail -f `svcs -L [service name`)
```

