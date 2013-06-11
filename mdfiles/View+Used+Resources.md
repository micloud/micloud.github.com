如何檢視已使用的資源?
===
##檢查磁碟使用情況


|如何得到這個資訊	|請使用此命令
|--|--|
|查詢整個文件系統的磁碟空間使用情況	|df -ht
|查詢當前目錄的磁碟空間使用情況	|du -h
|查詢摘要目錄使用的空間	|du -hs /opt
在這些命令中的-h參數的結果，是以“人類可讀”的形式呈現。





##從 shell 檢查程序


|相關資訊	|使用此命令
|--|--|
|通用處理器和內存統計資料	|prstat -Z -s cpu <br>If prstat changes your terminal settings, use the reset command to reset them.
|正在運行的程序列表	|ps -elf
|admin用戶程序列表	|ps -uadmin -o pcpu,user,pid,args,comm,s<br>ps -uadmin -o user,args,pcpu,pmem,vsz,time,comm
|MySQL用戶程序	|ps -umysql -o pcpu,vsz,osz,args,comm,s
|使用80 port的所有程序	|/root/bin/pcp -p 80
|2806過程中使用的所有埠	|/root/bin/pcp -P 28068
|所有埠和程序的資訊	|/root/bin/pcp -a
|CPU使用率	|sudo /root/jinf -C
|記憶體使用	|sudo /root/jinf -m
|互換空間的使用情況	|sudo /root/jinf -S





##檢查Webmin的過程

*  登錄到Virtualmin（請參考帳戶登錄及重要網址一文 ）。
*  點擊Webmin在左上方的選單，然後點選系統=>運行的程序。
*  點擊PID、用戶、記憶體、或是CPU，以便為您的帳戶上運行的程序列表，分別按不同標準進行排序。




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
