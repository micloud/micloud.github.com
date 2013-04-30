SmartOS HTTPS安裝Self-Gen SSL憑證
===

STEP1: 產生Self-Gen SSL金鑰
===
openssl req -new -key server.key -out server.csr

```
[root@SmartOS /opt/local/share]# cd /opt/local/etc/httpd/]([root@SmartOS /opt/local/share# cd /opt/local/etc/httpd/)
[root@SmartOS /opt/local/etc/httpd]# openssl genrsa -des3 -out server.key 1024]([root@SmartOS /opt/local/etc/httpd# openssl genrsa -des3 -out server.key 1024)
Generating RSA private key, 1024 bit long modulus
......++++++
......................++++++
e is 65537 (0x10001)
Enter pass phrase for server.key:
Verifying - Enter pass phrase for server.key:
[root@SmartOS /opt/local/etc/httpd]# openssl req -new -key server.key -out server.csr]([root@SmartOS /opt/local/etc/httpd# openssl req -new -key server.key -out server.csr)
Enter pass phrase for server.key:
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:TW](Country Name  - 2 letter code [AU:TW)
State or Province Name (full name) [Some-State]:Taipei](State or Province Name  - full name [Some-State:Taipei)
Locality Name (eg, city) []:Taiwan](Locality Name  - eg, city [:Taiwan)
Organization Name (eg, company) [Internet Widgits Pty Ltd]:MiCloud](Organization Name  - eg, company [Internet Widgits Pty Ltd:MiCloud)
Organizational Unit Name (eg, section) []:](Organizational Unit Name  - eg, section [:)
Common Name (e.g. server FQDN or YOUR name) []:MiCloud](Common Name  - e.g. server FQDN or YOUR name [:MiCloud)
Email Address []:service@micloud.tw](Email Address [:service@micloud.tw)

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:](A challenge password [:)
An optional company name []:](An optional company name [:)
```

openssl rsa -in server.key.org -out server.key

```
[root@SmartOS /opt/local/etc/httpd]# cp server.key server.key.org]([root@SmartOS /opt/local/etc/httpd# cp server.key server.key.org)
[root@SmartOS /opt/local/etc/httpd]# openssl rsa -in server.key.org -out server.key]([root@SmartOS /opt/local/etc/httpd# openssl rsa -in server.key.org -out server.key)
Enter pass phrase for server.key.org:
writing RSA key
```


openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

```
[root@SmartOS /opt/local/etc/httpd]# openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt]([root@SmartOS /opt/local/etc/httpd# openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt)
Signature ok
subject=/C=TW/ST=Taipei/L=Taiwan/O=MiCloud/CN=MiCloud/emailAddress=service@micloud.tw
Getting Private key
```


STEP2: 編輯Virtual Host資訊
===

```
# vi /opt/local/etc/httpd/virtualhosts/test.conf
<VirtualHost _default_:443>
SSLEngine On
SSLCertificateFile /opt/local/etc/httpd/server.crt
SSLCertificateKeyFile /opt/local/etc/httpd/server.key
ServerName 192-168-255-10.my.micloud.tw
DocumentRoot /opt/local/share/httpd/htdocs
</VirtualHost>
```


STEP3: 測試連線
===

```
瀏覽器連線：https://your.ip.or.domaonname/
```

