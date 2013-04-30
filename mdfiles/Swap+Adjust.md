
Swap調整
===
Micloud 客戶的Linux虛擬機會有兩個虛擬磁碟，第一個是OS掛載在/之下，另一個是packages中設定的disk space，預設掛載在/data下。


如果客戶新建一個新的VM，可以採用下列兩種任一，如果客戶已經寫了資料在/data 且無法更動，那只能選擇Case2。



swap目前有兩種做法，partition swap & file swap：
===
Case1. Partition swap：
===
-可以做為多重開機的swap重複使用，理論效能比較高一點點，但是無法變更大小，步驟稍為複雜。
Case2. File swap：
===
-的檔案是置於檔案系統之上，所以理論效能差一點點，可以刪除、移動與變更大小，步驟比前者簡單。

Case1. Partition swap
===
STEP 1：檢查您的磁碟
===

```
fdisk -l
```


<img src='images/Swap+Adjust-pic1.gif' width='500' align='center'/>
( 請檢查是否有 vda 與 vdb，其容量大小是否為您所申請的容量 )

STEP 2：卸載 /dev/vdb1
===

```
umount /dev/vdb1
```



STEP 3：磁碟分割，用您擅用的磁碟分割工具，我們以 fdisk 為例
===

```
fdisk /dev/vdb
```


<img src='images/Swap+Adjust-pic2.gif' width='500' align='center'/>

STEP 4：製作檔案系統
===

```
mkfs.ext4 /dev/vdb1
mkswap /dev/vdb2
```



STEP 5：掛載檔案系統
===

```
mount /dev/vdb1
swapon /dev/vdb2
```



STEP 6：檢查是否生效
===

```
df -h ( 檢查 /dev/vdb1 是否已經掛載 )
free -m ( 檢查 swap 是否有數值 )
```



STEP 7：開機自動掛載
===

```
vi /etc/fstab
加入一行 /dev/vdb2 swap swap defaults 0 0
```


<img src='images/Swap+Adjust-pic3.gif' width='500' align='center'/>
如果您變更過 /dev/vdb partition 的順序，或是您變更成非 ext4 檔案系統，那麼您還需要修改此檔案

STEP 8：重新開機並驗證
===


Case2. File swap
===
因預設設定之關係，某些虛擬機器在開通時候可能預設沒有掛載swap，雖現今的記憶體夠大，不一定會使用到 swap，但建議還是要掛載 swap，以增加系統穩定度。



STEP 1：製作一個當作 swap 的檔案
===

```dd if=/dev/zero of=/data/swap.img bs=1024k count=1024
( 1024k x 1024 = 1GB，請調整 count 達到您要的大小 )
```


STEP 2：製作 swap 檔案格式
===

```mkswap /data/swap.img```


STEP 3：立刻啟動 swap 空間
===

```swapon /data/swap.img```


STEP 4：檢查是否生效
===

```free -m```


STEP 5：開機自動掛載 swap
===

```vi /etc/fstab```

加入一行 /data/swap.img swap swap defaults 0 0



附註： /data 是目前 MiCloud Linux VMs 預設第二顆磁碟的掛載點，依客戶使用方式不同而有所差異
