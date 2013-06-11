Linux (Redhat / Fedora / CentOS) 設定時間的方式
===

(1) copy /usr/share/zoneinfo/* 內的確切時區資料檔案為 /etc/localtime



```
# cp /usr/share/zoneinfo/GMT+0 /etc/localtime
```

(2) 執行 date -u



```
# date -u
```

(3) 輸入 date 看看是否已經是正確時區



```
# date
```

(4) 重開後生效



```
# reboot
```

