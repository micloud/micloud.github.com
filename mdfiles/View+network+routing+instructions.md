SmartOS檢視網路路由指令
===

透過netstat指令檢視路由表：

```
# netstat -rn
```




```
Routing Table: IPv4
Destination           Gateway           Flags  Ref     Use     Interface
-------------------- -------------------- ----- ----- ---------- ---------
default              211.78.255.254       UG        3        193
127.0.0.1            127.0.0.1            UH        3          8 lo0
211.78.255.0         211.78.255.31        U         3          0 net0

Routing Table: IPv6
Destination/Mask            Gateway                   Flags Ref   Use    If
--------------------------- --------------------------- ----- --- ------- -----
::1                         ::1                         UH      2       0 lo0
```



檢視到某個網站的路由：

```# traceroute google.com```



```
traceroute: Warning: google.com has multiple addresses; using 74.125.31.138
traceroute to google.com (74.125.31.138), 30 hops max, 40 byte packets
1  254.2.......54)  0.189 ms  0.194 ms  0.096 ms
2  211..........1 ms  0.453 ms  0.444 ms
....
```


