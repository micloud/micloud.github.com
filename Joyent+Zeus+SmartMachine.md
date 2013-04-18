The Zeus TM (Traffic Manager) controls your application traffic, inspecting, transforming and routing requests as it load-balances them across the application infrastructure, all through an easy to use GUI interface.



Product Differentiation
===

|| || || || ||Features || ||
||Description	||Load Balancing	||SSL Offload	||Content Caching	||Real Time Analytics	||Bandwidth Management	||Service Level Monitoring
|﻿Zeus Simple Load Balancer - 200 Mbps|v	| | | | |
|Zeus Load Balancer - 200 Mbps|v| | | | |
|ZXTM Standard   - 200 Mbps|v|v|v| | |
|ZXTM Hi-Throughput - 1 Gbps|v|v|v| | |
|ZXTM Enterprise - 200 Mbps|v|v|v|v|v|v
|ZXTM Enterprise Hi-Throughput - 1 Gbps	|v|v|v|v|v|v

Logging into Zeus TM
===
Open the Zeus admin in your browser, in this form:



```
https://<yourPublicIp>:9090/
```



You may find the public IP address as the first IP address in your machine details in the portal.

Use username 'admin' and the password provided in the machine credentials next 'zeus'.

TrafficScript tricks
===
Adding a X-Forwarded-For header
===
Add a traffic script rule which contains:



```
http.setHeader("X-Forwarded-For", request.getRemoteIP());
```







----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
