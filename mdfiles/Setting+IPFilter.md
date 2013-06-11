設定IPFILTER
===
##安全與IPFILTER

在您全新Joyent的Smartmachines預設虛擬NIC的網路和default情況下， 這意味著您必須在您的電腦的網路協定中進行相關設訂。 最安全的做法，是建立一台防禦主機或是VPN伺服器，並以後端存取訪問相關服務，如資料庫存取或是Web伺服器，並加載負載平衡器如Zeus/Stingray。


以下是以IPFILTER為您的SmartOS Smartmachine所做的基本的分配概況：


##如何啟動與停止IPFILTER

以SmartOS的方式，在IPFILTER過程配置下運行的SMF（服務管理工具）進行停止和啟動服務。
查詢關於服務管理工具。


IPFILTER是在default情況下禁用。 如何啟用，禁用，啟動或停止服務:



```
# svcadm enable ipfilter
```



重新啟動該服務:


```
# svcadm restart ipfilter
```



檢查服務的狀態:



```
# svcs -a | grep ipfilter
online         20:49:27 svc:/network/ipfilter:default
```



##IPFilter相關範例規則

*  IPFilter規則都包含在/ etc / IPF / ipf.conf
*  src.ip.addr指定源頭和dest.ip.addr指定的目的地。
允許從一個特定的IP位址的進入:



```
pass in quick from src.ip.addr to dest.ip.addr
```



允許從特定IP位址的進入到一個特定的Port：:



```
pass in quick from src.ip.addr to dest.ip.addr port=22
```



允許ICMP只從一個特定的IP位址進入:



```
pass in quick proto icmp from src.ip.addr to dest.ip.addr keep state
```



允許任何人從SmartMachine出去:



```
pass out from src.ip.addr to any keep state
```



阻止一個特定的IP位址:



```
block in from src.ip.addr to dest.ip.addr
```



阻止一個特定的範圍:



```
block in from src.ip.addr/xx to dest.ip.addr
```



阻止從任何一個特定的IP進出:



```
block in from any to dest.ip.addr
```


阻止ICMP只從一個特定的IP進入:



```
block in proto icmp from src.ip.addr to dest.ip.addr
```



阻止所有從任何一個特定的port進出:



```
block in from any to dest.ip.addr port = (example:22)
```



設置default的拒絕規則，阻止除了443和80以外的Port:



```
pass out from src.ip.addr to any keep state
pass in quick from any to dest.ip.addr port=443
pass in quick from any to dest.ip.addr port=80
block in from any to dest.ip.addr
```



只要使用XXXX / XX，而不是使用一個特定的IP，範圍可以適用於任何規則.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
