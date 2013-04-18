
Linux系統上安裝MySQL
===
依下達的指令不同，各作業系統的安裝說明如下:

CentOS、Fedora 安裝MySQL
===
1.請使用yum安裝

```
#yum install mysql-server
```

<img src='images/Install+MySQL+on+Linux-p1.png' width='650' align='center'/>

2.啟動MySQL服務

```
#service mysqld start
```

<img src='images/Install+MySQL+on+Linux-p2.png' width='650' align='center'/>

3.設置MySQL登入密碼，密碼可自訂，這裡舉例為1qaz

```
#mysqladmin -u root password 1qaz
```


4.連線至MySQL

```
#mysql -uroot -p
```

<img src='images/Install+MySQL+on+Linux-p4.png' width='650' align='center'/>




Ubuntu、Debian 安裝MySQL
===
1.請使用apt-get安裝MySQL

```
#apgt-get install mysql-server
```

<img src='images/Install+MySQL+on+Linux-p5.png' width='650' align='center'/>

2.啟動MySQL服務

```
#service mysql start
```

<img src='images/Install+MySQL+on+Linux-p6.png' width='650' align='center'/>

3.設置MySQL登入密碼，密碼可自訂，這裡舉例為1qaz

```
#mysqladmin -u root password 1qaz
```


4.連線至MySQL

```
#mysql -uroot -p
```

<img src='images/Install+MySQL+on+Linux-p4.png' width='650' align='center'/>

----
重設root密碼
===
若您忘記MySQL的root密碼，可以用以下的方式重設密碼:
1.請先將MySQL服務停止

```
#service mysqld stop
```

<img src='images/Install+MySQL+on+Linux-p7.png' width='650' align='center'/>

2.以不檢查密碼的方式啟動MySQL

```
#mysqld_safe --skip-grant-tables&
```

<img src='images/Install+MySQL+on+Linux-p8.png' width='650' align='center'/>

3.登入MySQL

```
#mysql
```

4.將root密碼重新設定為1234

```
mysql>update mysql.user set password=PASSWORD('1234') where user='root';
```


5.執行上一個步驟所下達的密碼設定指令

```
mysql> flush privileges;
```


6.退出MySQL

```
mysql> quit
```

<img src='images/Install+MySQL+on+Linux-p9.png' width='650' align='center'/>

7.重新啟動MySQL

```
#service mysqld restart
```

<img src='images/Install+MySQL+on+Linux-p10.png' width='650' align='center'/>

8.驗證密碼是否已更改

```
#mysql -uroot -p
```

<img src='images/Install+MySQL+on+Linux-p11.png' width='650' align='center'/>
