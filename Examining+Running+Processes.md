在這個主題中，您可以找到：


從 shell 檢查程序
===

||相關資訊	||使用此命令
|通用處理器和內存統計資料	|prstat -Z -s cpu

If prstat changes your terminal settings, use the reset command to reset them.
|正在運行的程序列表	|ps -elf
|admin用戶程序列表	|ps -uadmin -o pcpu,user,pid,args,comm,s

ps -uadmin -o user,args,pcpu,pmem,vsz,time,comm
|MySQL用戶程序	|ps -umysql -o pcpu,vsz,osz,args,comm,s
|CPU使用率	|sudo /root/jinf -C
|記憶體使用	|sudo /root/jinf -m
|互換空間的使用情況	|sudo /root/jinf -S


檢查Webmin的過程
===
*  登錄到Virtualmin（請參考帳戶登錄及重要網址一文 ）。
*  點擊Webmin在左上方的選單，然後點選系統=>運行的程序。
*  點擊PID、用戶、記憶體、或是CPU，以便為您的帳戶上運行的程序列表，分別按不同標準進行排序。




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
