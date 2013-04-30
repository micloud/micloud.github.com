SmartOS install Oracle
===



準備
===
開始安裝Oracle Universal前，的準備工作：
*  建立資料庫專用帳戶、群組與目錄
*  修改主機Shared Memory設定
*  安裝X11相關套件

設定步驟可參考下面指令：

```
admin$ su
...
# groupadd -g 1000 dba
# groupadd -g 1001 oinstall
# groupadd -g 1002 oper
# mkdir -p /u01/app/oracle
# useradd -u 1000 -g oinstall -G dba,oper -s /bin/bash -d /u01/app/oracle oracle
# chown -R oracle:dba /u01
# mkdir -p /u02/oradata
# chown -R oracle:dba /u02
# passwd oracle
...
# projadd -U oracle -K "project.max-shm-memory=(priv,2GB,deny)" user.oracle
# exit
admin$ su oracle
...
```


遠端安裝Oracle
===
在開始遠端安裝Oracle之前，您需要先安裝X11相關套件，於Mac OS, Linux上以支援X11服務，您可以開啓式窗界面，然後直接使用下面指令將X Window Forward回到您的桌面：

```
$xhost +
access control disabled, clients can connect from any host
$ssh -X oracle@your.machine.ip
```


完成X11套件設定與安裝後，您可以直接下載Oracle之套件進行解壓縮安裝，安裝步驟如下：

```
$ ./runInstaller -ignoreSysPrereqs
Starting Oracle Universal Installer...

Checking installer requirements...

Checking operating system version: must be 5.10.    Actual 5.11
Failed <<<<


>>> Ignoring required pre-requisite failures. Continuing...

Preparing to launch Oracle Universal Installer ...
```

注意：OpenSolaris (5.11)版本非Oracle原廠建議之作業系統，因此安裝前需要加設作業系統檢查參數：-ignoreSysPrereqs

其他資訊
===
如果您需要更多有關於Oracle之安裝資訊，您可以參考Oracle installation manuals及 The Cuddletech SAs Guide to Oracle.
