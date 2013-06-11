
使用svcadm開啟或關閉服務
===
Solaris base的技術，可以利用svcadm管理系統服務，以下列出常用管理的指令。
##svcadm用法：


```
[root@MiCloudDBT /home/user]# svcadm
Usage: svcadm [-v] [-z zone] [cmd [args ... ]]

svcadm enable [-rst] <service> ...      - enable and online service(s)
svcadm disable [-st] <service> ...      - disable and offline service(s)
svcadm restart <service> ...            - restart specified service(s)
svcadm refresh <service> ...            - re-read service configuration
svcadm mark [-It] <state> <service> ... - set maintenance state
svcadm clear <service> ...              - clear maintenance state
svcadm milestone [-d] <milestone>       - advance to a service milestone

Services can be specified using an FMRI, abbreviation, or fnmatch(5)
pattern, as shown in these examples for svc:/network/smtp:sendmail

svcadm <cmd> svc:/network/smtp:sendmail
svcadm <cmd> network/smtp:sendmail
svcadm <cmd> network/*mail
svcadm <cmd> network/smtp
svcadm <cmd> smtp:sendmail
svcadm <cmd> smtp
svcadm <cmd> sendmail
```

----
##svcadm啟動服務


```
svcadm enable [軟體名稱]
ex:svcadm enable apache
```

----
##svcadm關閉服務


```
svcadm disable [軟體名稱]
ex:svcadm disable apache
```

----
##svcadm重新啟動服務


```
svcadm restart [軟體名稱]
ex:svcadm restart apache
```

