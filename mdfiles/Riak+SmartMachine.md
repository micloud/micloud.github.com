安裝Riak
===
Riak為開放式、高擴增性、可容錯的NoSQL資料庫套件，提供大量資料快速存儲服務，以開放程式碼為基礎的分散式資料庫系統。
MiCloud所提供的SmartOS主機中，已有預載Riak服務的主機只有SmartOS32+Riak這個版本，若其他規格的主機想安裝Riak於您的主機上，請按照下列步驟進行安裝。



1.檢視主機上Riak可安裝的版本



```
#pkgin se riak
```

<img src='images/Riak+SmartMachine-p1.png' width='650' align='center'/>

2.進行安裝

```
# pkgin in riak-1.0.2nb1
```

<img src='images/Riak+SmartMachine-p2.png' width='650' align='center'/>

3.完成後啟動服務，但會發現服務的狀態為offline

```
#svcadm enable riak
#svcs riak
```

<img src='images/Riak+SmartMachine-p3.png' width='650' align='center'/>
請使用下方指令檢視服務無法啟動的原因

```
#svcs -xv riak
```

<img src='images/Riak+SmartMachine-p4.png' width='650' align='center'/>

4.啟動epmd服務，並將riak重新啟動

```
#svcadm enable svc:/network/epmd:default
#svcadm disable riak
#svcadm enable riak
```

<img src='images/Riak+SmartMachine-p6.png' width='650' align='center'/>

5.檢視服務是否已啟動

```
#svcs riak
```

<img src='images/Riak+SmartMachine-p7.png' width='650' align='center'/>

6.連線至riak

```
#riak attach
```

<img src='images/Riak+SmartMachine-p8.png' width='650' align='center'/>
