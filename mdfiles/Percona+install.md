
安裝Percona
===
MiCloud只有在SmartOS中有預載Percona的服務，用戶可參考以下的步驟，在Linux環境下安裝。

##在CentOS中安裝Percona

1.將Percona的套件安裝至主機的套件庫中

```
#rpm -Uhv http://www.percona.com/downloads/percona-release/percona-release-0.0-1.x86_64.rpm
```

<img src='images/Percona+install-c1.png' width='650' align='center'/>

2.請搜尋Percona的套件，並安裝下方框起來的二個套件

```
#yum search percona
```

<img src='images/Percona+install-c2.png' width='650' align='center'/>

3.安裝Percona

```
# yum install Percona-Server-client-55.x86_64
```

<img src='images/Percona+install-c3.png' width='650' align='center'/>


```
# yum install Percona-Server-server-55.x86_64
```

<img src='images/Percona+install-c4.png' width='650' align='center'/>

4.請至etc下建立一個檔案，且命名為my.cnf，並加入下方列出的幾個設定

```
#vi /etc/my.cnf
```


```
[mysqld]
plugin-load=handlersocket.so

loose_handlersocket_port = 9998
# the port number to bind to (for read requests)

loose_handlersocket_port_wr = 9999
# the port number to bind to (for write requests)

loose_handlersocket_threads = 16
# the number of worker threads (for read requests)

loose_handlersocket_threads_wr = 1
# the number of worker threads (for write requests)

open_files_limit = 65535
# to allow handlersocket accept many concurrent
# connections, make open_files_limit as large as
# possible.
```

<img src='images/Percona+install-c5.png' width='650' align='center'/>

5.啟動服務

```
#service mysql start
```

<img src='images/Percona+install-c6.png' width='650' align='center'/>

6.設定root密碼

```
# mysqladmin -u root password 1qaz
```


7.登入mysql

```
#mysql -uroot -p
```

<img src='images/Percona+install-c7.png' width='650' align='center'/>

----
##在Ubuntu、Debian安裝Percona

1.下載Percona套件至套件套中並安裝

```
#gpg --keyserver  hkp://keys.gnupg.net --recv-keys 1C4CBDCDCD2EFD2A
#gpg -a --export CD2EFD2A | sudo apt-key add -
```

<img src='images/Percona+install-u1.png' width='650' align='center'/>

2.依照不同OS及OS版本，加入不同的設定至/etc/apt/sources.list中。

```
#vi /etc/apt/sources.list
```

2-1 Ubuntu


a. Ubuntu10

```
deb http://repo.percona.com/apt lucid main
deb-src http://repo.percona.com/apt lucid main
```

<img src='images/Percona+install-u2.png' width='650' align='center'/>

b. Ubuntu12

```
deb http://repo.percona.com/apt precise main
deb-src http://repo.percona.com/apt precise main
```

<img src='images/Percona+install-u3.png' width='650' align='center'/>

2-2 Debian

```
deb http://repo.percona.com/apt squeeze main
deb-src http://repo.percona.com/apt squeeze main
```

<img src='images/Percona+install-d1.png' width='650' align='center'/>

3.更新套件庫

```
#apt-get update
```

<img src='images/Percona+install-u4.png' width='650' align='center'/>

4.安裝Percona

```
#apt-get install percona-server-server-5.5 percona-server-client-5.5
```

<img src='images/Percona+install-u5.png' width='650' align='center'/>

5.設定root密碼

```
# mysqladmin -u root password 1qaz
```


6.登入mysql

```
#mysql -uroot -p
```

<img src='images/Percona+install-c7.png' width='650' align='center'/>
