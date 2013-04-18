
SmartOS上安裝MySQL
===
MiCloud在SmartOS Plus、SmartOS32中提供預載MySQL的服務，若剛開始沒有選擇預載之用戶，可以參考以下的步驟進行安裝，由於32bit及64bit的安裝過程有些許差異，故分開描述。

SmartOS 32bit安裝步驟
===
1.請先搜尋MySQL的套件，並找到mysql-server最高版本

```
# pkgin se mysql
```

<img src='images/Install+MySQL+on+SmartOS-p1.png' width='650' align='center'/>

2.安裝MySQL

```
# pkgin in mysql-server-5.5.16nb1
```

<img src='images/Install+MySQL+on+SmartOS-p2.png' width='650' align='center'/>

3.安裝完成後，請先找到mysql.xml，並修改此檔。

```
# find / -name mysql.xml
```

<img src='images/Install+MySQL+on+SmartOS-p3.png' width='650' align='center'/>


```
# vi /opt/local/share/smf/manifest/mysq l.xml
```

進入編輯畫面後， 請將下圖中這二個參數路徑改為/opt/local/share/smf/method/svc-mysql，指令如下

```
<exec_method name='start' type='method' exec='/opt/local/share/smf/method/svc-mysql start' timeout_seconds='18446744073709551615'/>
<exec_method name='stop' type='method' exec='/opt/local/share/smf/method/svc-mysql stop' timeout_seconds='18446744073709551615'/>
```

<img src='images/Install+MySQL+on+SmartOS-p8.png' width='650' align='center'/>

4.將mysql.xml匯入smf中

```
# svccfg import /opt/local/share/smf/manifest/mysql.xml
```

<img src='images/Install+MySQL+on+SmartOS-p5.png' width='650' align='center'/>

5.先關閉後再重新啟動MySQL服務

```
# svcadm disable mysql
# svcadm enable mysql
```

<img src='images/Install+MySQL+on+SmartOS-p6.png' width='650' align='center'/>

6.檢視服務是否啟動

```
# svcs mysql
```

<img src='images/Install+MySQL+on+SmartOS-p7.png' width='650' align='center'/>

7.設置MySQL登入密碼，密碼可自訂，這裡舉例為1qaz

```
# mysqladmin -u root password 1qaz
```


8.連線至MySQL

```
# mysql -uroot -p
```

<img src='images/Install+MySQL+on+SmartOS-http://wiki.micloud.tw/Wiki/attach/Install%20MySQL%20on%20Linux/p4.png' width='650' align='center'/>





SmartOS 64bit安裝步驟
===
1.請先搜尋MySQL的套件

```
# pkgin se mysql
```

<img src='images/Install+MySQL+on+SmartOS-p61.png' width='650' align='center'/>

2.以安裝5.1.58為例

```
# pkgin in mysql-server-5.1.58
```

<img src='images/Install+MySQL+on+SmartOS-p62.png' width='650' align='center'/>

3.先關閉後再啟動MySQL服務

```
# svcadm disable mysql
# svcadm enable mysql
```

<img src='images/Install+MySQL+on+SmartOS-p6.png' width='650' align='center'/>

4.檢視服務是否啟動

```
# svcs mysql
```

<img src='images/Install+MySQL+on+SmartOS-p7.png' width='650' align='center'/>

5.設置MySQL登入密碼，密碼可自訂，這裡舉例為1qaz

```
# mysqladmin -u root password 1qaz
```


6.連線至MySQL

```
# mysql -uroot -p
```

<img src='images/Install+MySQL+on+SmartOS-http://wiki.micloud.tw/Wiki/attach/Install%20MySQL%20on%20Linux/p4.png' width='650' align='center'/>

7.外部連線設定


因為SmartOS 64因安全性考量，目前服務安裝完成後預設IP是binding 127.0.0.1，所以3306 port服務外部不能連線,可以透過更新MySQL設定來開放外部連線：

```
# vi /opt/local/etc/my.cnf
```

修改下方紅色框框部份
<img src='images/Install+MySQL+on+SmartOS-set.png' width='650' align='center'/>

關閉服務，再重新啓動，連線設定即完成

```
# svcadm disable mysql
# svcadm enable mysql
```


----
重設root密碼
===
若您忘記MySQL的root密碼，可以用以下的方式重設密碼


1.請先將Mysql服務停止

```
# svcadm disable mysql
```


2.在/home/admin下建立一個檔案名稱為reset-mysql-root-password-init，並在檔案內加入密碼設定指令

```
#vi /home/admin/reset-mysql-root-password-init
```

在檔案中加入下方指令。(密碼您可以自行輸入，這裡以1234為範例)

```
UPDATE mysql.user SET Password=PASSWORD('1234') WHERE User='root';
FLUSH PRIVILEGES;
```

<img src='images/Install+MySQL+on+SmartOS-p63.png' width='650' align='center'/>

3.使用特殊的MySQL伺服器 - 初始化文件選項

```
# /opt/local/bin/mysqld_safe --init-file=/home/admin/reset-mysql-root-password-init &
```

<img src='images/Install+MySQL+on+SmartOS-p64.png' width='650' align='center'/>

4.關閉MySQL

```
# svcadm disable network/mysql
```


5.刪除創建的文件:

```
# rm /home/admin/reset-mysql-root-password-init
```


6.重新啟動MySQL服務:

```
# svcadm enable network/mysql
```


7.驗證密碼是否已更改

```
# mysql -uroot -p
```

<img src='images/Install+MySQL+on+SmartOS-http://wiki.micloud.tw/Wiki/attach/Install%20MySQL%20on%20Linux/p11.png' width='650' align='center'/>
