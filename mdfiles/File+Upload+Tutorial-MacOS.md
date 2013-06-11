使用指令上傳檔案(MacOS)
===
##Mac OS 檔案傳輸

使用 openssh client，請帶參數 -i 來使用 private ssh key。


上傳：

```
scp -i id_rsa ./MiCRM.tgz root@211.123.123.123:/root/
```

<img src='images/File+Upload+Tutorial-MacOS-l2.png' width='650' align='center'/>
下載：

```
scp -i id_rsa root@211.123.123.123:/tmp/MiCRM.tgz .
```

<img src='images/File+Upload+Tutorial-MacOS-l1.png' width='650' align='center'/>
