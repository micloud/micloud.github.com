MiCloudAPI 實做案例
===
##預防尖峰流量拖垮服務：Scale Out應用服務-使用CloudAPI排程

*  調整一臺虛擬主機的記憶體大小


```
simonsuteki-MacBook-Pro:~ simonsu$ sdc-resizemachine -p "M 2GB RAM (1CORE)"
9626a584-187c-40b0-aa84-7f6f3a22ec44
```



*  開啓一臺主機


```
simonsuteki-MacBook-Pro:~ simonsu$ sdc-createmachine -name simontest123 -package "S
1GB RAM (1CORE)" -dataset sdc:sdc:smartos64:1.5.1
{
   "id": "845f21fe-1910-4b38-a4ca-e2a81144f9a2",
   "name": "simontest123",
   "type": "smartmachine",
   "state": "provisioning",
   "dataset": "sdc:sdc:smartos64:1.5.1",
   "ips": [
   "211.78.245.41"
   ],
   "memory": 1024,
   "disk": 15360,
   "metadata": {},
   "created": "2012-01-18T02:13:31+00:00",
   "updated": "2012-01-18T02:13:31+00:00"
}
```


##流量恢復正常了～WEB刪除主機


*  WEB刪除虛擬主機
<img src='images/MiCloud+API+Implement+2-p11.PNG' width='650' align='center'/>

##流量恢復正常了～CloudAPI刪除主機


*  CloudAPI刪除虛擬主機


```
simonsuteki-MacBook-Pro:~ simonsu$ sdc-deletemachine 845f21fe-1910-4b38-a4cae2a81144f9a2
Requested transition is not acceptable due to current resource state
(主機刪除前，必需要停機，否則會不能刪除)
# Stop server first
simonsuteki-MacBook-Pro:~ simonsu$ sdc-stopmachine 845f21fe-1910-4b38-a4cae2a81144f9a2
# Confirm stop OK and delete...
simonsuteki-MacBook-Pro:~ simonsu$ sdc-deletemachine 845f21fe-1910-4b38-a4cae2a81144f9a2
```


