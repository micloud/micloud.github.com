memcached是一套 Name-Value Pair(NVP) 分散式記憶體快取系統，其主要目的是在於減少資料庫的負擔。透過memcached的快取對於使用者在等待資料存取時間可以加快進行而不會延遲服務。以下將會教您如何在SmartMachine去啟用和設置memcached。



啟動 Memcached
===


利用root權限或是利用sudo指令來啟動memcached:


```
#svcadm enable memcached
```






輸入svcs指令確認memcached啟動是否成功，如以下的畫面中，可以看到memcached是online狀態，表示是啟用中:


```
#svcs memcached
```


<img src='images/Using+Memcached-memcached-1.png' width='650' align='center'/>




確認目前設定:


```
#prctl -i process -n process.max-file-descriptor `pgrep memcached`
```


<img src='images/Using+Memcached-memcached-2.png' width='650' align='center'/>




設置 Memcached
===

用戶可以自行設置memcached的大小以及所允許的連線數量，使用svcprop驗證目前memcached的大小:


```
# svcprop -p config/memory memcached
```


<img src='images/Using+Memcached-memcached-3.png' width='650' align='center'/>


從上方的擷圖可以看到目前memcached大小為64 MB
另外，用戶可以利用指令來調整memcached大小， 例如.從64MB調至128MB:


```
# svccfg -s memcached setprop config/memory=128
# svcadm refresh memcached
# svcprop -p config/memory memcached
128
```


<img src='images/Using+Memcached-memcached-4.png' width='650' align='center'/>
