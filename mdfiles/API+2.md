
MiCloud API 基本操作(二) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 使用[Tag](#Tag),使用[Metadata](#Metadata),使用[Instrumentation](#Instrumentation)。

##關於 Tag：<a name="Tag"></a>
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

##關於 metadata：<a name="Metadata"></a>
--------------------------------------------------------------------------------------

__\#sdc-updatemachinemetadata   --metadata key=value [mahine id]__ 新增metadata
 
 允許您更新某一機器的metadata。
 
範例如下:
 
 ```
 #sdc-updatemachinemetadata --metadata foo=bar 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果:
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```

__\#sdc-deletemachinemetadata [key] --machine [machine id] __ 

 刪除某一機器的指定之metadata。
 
 範例如下:

 ```
 #sdc-deletemachinemetadata foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
```

__\#sdc-getmachinemetadata  [mahine id]__

 查詢某一機器的metadata

 範例如下:

```
#sdc-getmachinemetadata  33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果:
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```

##關於 instrumentation：<a name="Instrumentation"></a>
--------------------------------------------------------------------------------------

__\#sdc-createinstrumentation__      

 創見一個instrumentation。

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

