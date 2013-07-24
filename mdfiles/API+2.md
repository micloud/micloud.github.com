
MiCloud API 基本操作(二) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 使用[Tag](#Tag),使用[Metadata/ User Script](#Metadata),使用[Instrumentation](#Instrumentation)。

##關於 Tag：<a name="Tag"></a>

tag是一個以key/value存在的一組一組值，對於一個管理者而言，tag可以當做附加給這台主機的一些額外屬性，讓主機可以有更多的資訊可以作為日後自動化的參考值...

附屬在主機之下，在CloudAPI中可以透過下面方式對主機增加tag。

(其中主機的id可以在sdc-listmachines中，每台主機的id欄位中找到):

--------------------------------------------------------------------------------------

__\#sdc-addmachinetags  -t  key=value  [machine id]__ 

 此指令可以讓你添加新的標籤，而不是覆蓋現有的標籤
 
 此乎叫允許您傳送任意數量的參數，而這些參數將被轉為標籤可供您所使用
 
 範例如下:
 
```
#sdc-addmachinetags -t foo=bar  33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果:
 {
   "foo": "bar"
 }
```   

若您希望依次新增多個tag，也可以這樣做：

```
# sdc-addmachinetags -t foo=bar -t servername=testtag01 b34f99ea-ef8d-4332-b043-9f4d49104833
{
  "foo": "bar" ,
  "servername": "testtag01"
}
```


__\#sdc-deletemachinetag [key] --machine [machine id]__ 

 刪除指定機器上的tag與其值

 範例如下:
 
```
 #sdc-deletemachinetag foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
```

__\#sdc-getmachinetag [key] --machine [machine id]__

 可檢索指定機器上的tag的值
 
 範例如下:

 ```
#sdc-getmachinetag  foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
  
  結果:

   bar
```

__\#sdc-listmachinetags [machine id]__

 檢索某一機器的所有tag與其值

範例如下:

```
 #sdc-listmachinetags 33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果:
 {
   "foo": "bar"
 }
 
```

如果在shell中欲使用到tag中的某一個數值，可以這樣做：

(PS:請先安裝json tool套件：npm install jsontool -g)

```
# sdc-listmachinetags b34f99ea-ef8d-4332-b043-9f4d49104833 | json foo

bar

```

##關於 Metadata / User Script：<a name="Metadata"></a>

Metadata主要存放與tag相同格式的key/value 參數值，而不同的是，當您設定 key=user-script時，

將會有特殊用途 ─ 就是主機將在開機的時候，直接使用shell執行user-script所帶的參數內容。

此部份的設定是讓使用者可以自訂開通或開機時候的執行腳本，讓自動化部屬在每次開機時候完成...

可以透過與tag相通的設定方式在主機上attach參數(唯一不一樣的是，它叫做 sdc-updatemachinemetadata)

--------------------------------------------------------------------------------------

__\#sdc-updatemachinemetadata   --metadata key=value [mahine id]__ 
 
範例如下:
 
 ```
 #sdc-updatemachinemetadata --metadata foo=bar 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果:
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```

如果要機器聽話在開通或開機完成的時候自動執行您的腳本，

直接在metadata指定key=user-script的屬性，並且帶入值為您欲執行的腳本即可：

```
# sdc-updatemachinemetadata --metadata "user-script"="echo HELLO > /root/user-script.log" b34f99ea-ef8d-4332-b043-9f4d49104833
{
  "foo": "bar",
  "user-script": "echo HELLO > /root/user-script.log"
}
```

設定完的user-script可以透過sdc-getmachine來看到設定的結果：

__\#sdc-getmachinemetadata  [mahine id]__

 查詢某一機器的metadata

 範例如下:

```
#sdc-getmachinemetadata  b34f99ea-ef8d-4332-b043-9f4d49104833
 
 結果:
 
{
  "id": "b34f99ea-ef8d-4332-b043-9f4d49104833",
  "name": "212ec88",
  "type": "smartmachine",
  "state": "running",
  "dataset": "local:robin:hadoop-node:0.1.0",
  "ips": [
    "211.78.254.144"
  ],
  "memory": 1024,
  "disk": 15360,
  "metadata": {
    "foo": "bar",
    "user-script": "echo HELLO > /root/user-script.log"
  },
  "created": "2013-03-23T14:50:21+00:00",
  "updated": "2013-06-07T04:29:29+00:00",
  "primaryIp": "211.78.254.144"
}

```

尚若主機一開始沒有設定任何user-script時候，

使用sdc-getmachinemetadata會得到空的json物件

```
# sdc-getmachinemetadata b34f99ea-ef8d-4332-b043-9f4d49104833
{}
```

其中可以透過 sdc-deletemachinemetadata 刪除某一機器的指定之metadata。

__\#sdc-deletemachinemetadata [key] --machine [machine id] __  
 
如下:

```
 #sdc-deletemachinemetadata foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
```

主機重新開機後，user-script將會應用至該主機：

```
# sdc-rebootmachine b34f99ea-ef8d-4332-b043-9f4d49104833

# ssh root@211.78.254.144
Last login: Fri Jun  7 10:59:34 2013 from 211.78.254.110

[root@b34f99ea-ef8d-4332-b043-9f4d49104833 ~]# ls -l
總計 1
-rw-r--r-- 1 root root 6 6月   7 12:30 user-script.log
[root@b34f99ea-ef8d-4332-b043-9f4d49104833 ~]# cat user-script.log
HELLO

```

順道一提，當在撰寫user-script時候，script的內容可以直接參考到其他的metadata屬性

如下：

```
sdc-updatemachinemetadata \
--metadata "user-script"="echo HELLO $USER > /root/user-script.log" \
--metadata USER=simon b34f99ea-ef8d-4332-b043-9f4d49104833
```

則重開機後，會發現user-script.log裡面會是：

```
# cat user-script.log
HELLO simonsu
```

另一種建立user-script的方式，是直接在create machine的參數中給予script參數，

內容需要帶入一個腳本檔案，範例如下：

建立主機的指令：

# sdc-createmachine \
--dataset local:robin:hadoop-node:0.1.0 \
--package "S 1GB RAM (1CORE)" \
--script ./install.sh \
--tag servername=JoomlaServer01

其中install.sh內容如下

# cat install.sh
curl -k https://raw.github.com/micloud/installer/master/smartos-standard64/install-joomla.sh | sh


##關於 instrumentation：<a name="Instrumentation"></a>
--------------------------------------------------------------------------------------

__\#sdc-createinstrumentation__      

 創建一個instrumentation。

範例如下:

```
#sdc-createinstrumentation -m syscall -s syscalls

結果:
{
  "module": "syscall",
  "stat": "syscalls",
  "predicate": {},
  "decomposition": [],
  "value-dimension": 1,
  "value-arity": "scalar",
  "enabled": true,
  "retention-time": 600,
  "idle-max": 3600,
  "transformations": {},
  "nsources": 0,
  "granularity": 1,
  "persist-data": false,
  "crtime": 1372235215353,
  "value-scope": "interval",
  "id": "1",
  "uris": [
    {
      "uri": "/sunwing/analytics/instrumentations/1/value/raw",
      "name": "value_raw"
    }
  ]
}
```


__\#sdc-deleteinstrumentation [instrumentation_id]__

 刪除instrumentation。

範例如下:

```
sdc-deleteinstrumentation 1
```

__\#sdc-getinstrumentation [instrumentation_id]__

 藉由id 檢索 instrumentation 的組態。

範例如下:

```
#sdc-getinstrumentation 1

結果:
{
  "module": "syscall",
  "stat": "syscalls",
  "predicate": {},
  "decomposition": [],
  "value-dimension": 1,
  "value-arity": "scalar",
  "enabled": true,
  "retention-time": 600,
  "idle-max": 3600,
  "transformations": {},
  "nsources": 0,
  "granularity": 1,
  "persist-data": false,
  "crtime": 1372235215353,
  "value-scope": "interval",
  "id": "1",
  "uris": [
    {
      "uri": "/sunwing/analytics/instrumentations/1/value/raw",
      "name": "value_raw"
    }
  ]
}
```

__\#sdc-listinstrumentations__

檢索木前所創建的所有instrumentations。

範例如下:

```
#sdc-listinstrumentations
```

