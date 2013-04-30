Linux/Unix Like 檔案傳輸
===
使用 openssh client，請帶參數 -i 來使用 private ssh key。


上傳：

```scp -i id_rsa /home/Test/upload.txt root@211.123.123.123:/home/Test_2```

<img src='images/File+Upload+Tutorial-Linux+or+Unix-l4.png' width='720' align='center'/>
下載：

```scp -i id_rsa root@211.123.123.123:/home/Test_2/download.txt /home/Test```

<img src='images/File+Upload+Tutorial-Linux+or+Unix-l3.png' width='720' align='center'/>
