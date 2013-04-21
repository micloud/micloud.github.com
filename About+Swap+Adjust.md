
Swap調整
===

Micloud 客戶的Linux虛擬機會有兩個虛擬磁碟，第一個是OS掛載在"/"之下，另一個是packages中設定的disk space，預設掛載在/data下。 MiCloud已為SmartMachine、及1G以下用戶預先做好swap空間的預留，其餘類型的虛擬主機沒有預設swap空間，用戶需自行做設定。


如果客戶新建一個新的VM，可以採用下列Partition swap及File swap兩種方式中任一種，如果客戶已經寫了資料在/data 且無法更動，那只能選擇File swap的方式。

兩種swap設定方法及說明如下：

## Partition swap

可以做為多重開機的swap重複使用，理論效能比較高一點點，但是無法變更大小，步驟稍為複雜，設定步驟如下。

(1)檢查您的磁碟

```
#fdisk -l
```

<img src='images/About+Swap+Adjust-p3.jpg' width='650' align='center'/>
<center>( 請檢查是否有 vda 與 vdb，其容量大小是否為您所申請的容量 )</center>



(2)卸載 /dev/vdb1

```
#umount /dev/vdb1
```


(3)磁碟分割，用您擅用的磁碟分割工具，我們以 fdisk 為例

```
#fdisk /dev/vdb
```

<img src='images/About+Swap+Adjust-fdisk.jpg' width='650' align='center'/>


(4)製作檔案系統

```
#mkfs.ext4 /dev/vdb1
```

<img src='images/About+Swap+Adjust-mk.jpg' width='650' align='center'/>

```
#mkswap /dev/vdb2
```

<img src='images/About+Swap+Adjust-mk2.jpg' width='650' align='center'/>


(5)掛載檔案系統

```
#mount /dev/vdb1
#swapon /dev/vdb2
```



(6)檢查是否生效

```
#df -h ( 檢查 /dev/vdb1 是否已經掛載 )
```

<img src='images/About+Swap+Adjust-df.jpg' width='650' align='center'/>

```
#free -m ( 檢查 swap 是否有數值 )
```

<img src='images/About+Swap+Adjust-free2.jpg' width='650' align='center'/>

(7)開機自動掛載

```
#vi /etc/fstab
加入一行 /dev/vdb2 swap swap defaults 0 0
```

<img src='images/About+Swap+Adjust-mount.jpg' width='650' align='center'/>

(8)重新開機並驗證
<img src='images/About+Swap+Adjust-free2.jpg' width='650' align='center'/>


## File swap

File swap的檔案是置於檔案系統之上，所以理論效能差一點點，可以刪除、移動與變更大小，步驟比partition swap簡單，其設定步驟如下。



(1)製作一個當作 swap 的檔案

```
# dd if=/dev/zero of=/data/swap.img bs=1024k count=1024
( 1024k x 1024 = 1GB，請調整 count 達到您要的大小 )
```

<img src='images/About+Swap+Adjust-dd.jpg' width='650' align='center'/>

(2)製作SWAP檔案格式

```
# mkswap /data/swap.img
```

<img src='images/About+Swap+Adjust-filemk.jpg' width='650' align='center'/>

(3)立刻啟動SWAP空間

```
# swapon /data/swap.img
```


(4)檢查是否生效

```
#free -m
```

<img src='images/About+Swap+Adjust-free.jpg' width='650' align='center'/>

(5)自動掛載SWAP

```
# vi /etc/fstab
加入一行/data/swap.img swap swap defaults 0 0
```

<img src='images/About+Swap+Adjust-mount2.jpg' width='650' align='center'/>
附註： /data 是目前 MiCloud Linux VMs 預設第二顆磁碟的掛載點，依客戶使用方式不同而有所差異
