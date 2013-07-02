
MiCloud API 基本操作(二) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 __使用Tag__,__使用Metadata__,__使用Instrumentation__。

##關於 Tag：
--------------------------------------------------------------------------------------
Returns the value for a single tag on this machine. Note that this API is "special",
as it returns content in text or plain; this also means you must set the Accept header to text or plain.


__\#sdc-addmachinetags  -t  key=value  [machine id]__ 可以讓你添加新的標籤，而不是覆蓋現有的標籤
 
 此乎叫允許您傳送任意數量的參數，而這些參數將被轉為標籤可供您所使用
 
 使用方法如下:
 
```
#sdc-addmachinetags -t foo=bar  33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果:
 {
   "foo": "bar"
 }
```   

__\#sdc-deletemachinetag [key] --machine [machine id]__ 刪除tag

 使用方法如下:
 
```
 #sdc-deletemachinetag foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
```

__\#sdc-getmachinetag [key] --machine [machine id]__ 可單筆查詢tag的值
 
 使用方法如下:

 ```
#sdc-getmachinetag  foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
  
  結果:

   bar
```

__\#sdc-listmachinetags [machine id]__ 可查詢所有tag與tag的值

使用方法如下:

```
 #sdc-listmachinetags 33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果:
 {
   "foo": "bar"
 }
 
```

##關於 metadata：
--------------------------------------------------------------------------------------
Allows you to update the metadata for a given machine. 
Note that updating the metadata via CloudAPI will result in the metadata being updated in the running instance.

The semantics of this call are sublty different that the AddMachineTags call, 
in that any metadata keys passed in here are created if they do not exist, and overwritten if they do.


__\#sdc-updatemachinemetadata   --metadata key=value [mahine id]__ 新增metadata
 
 使用方式如下:
 
 ```
 #sdc-updatemachinemetadata --metadata foo=bar 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果:
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```

__\#sdc-deletemachinemetadata [key] --machine [machine id] __ 刪除metadata
 
 使用方式如下:

 ```
 #sdc-deletemachinemetadata foo --machine 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
```

__\#sdc-getmachinemetadata    [mahine id]__ 查詢metadata

使用方式如下:

```
#sdc-getmachinemetadata  33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果:
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```

##關於 instrumentation：
--------------------------------------------------------------------------------------
Creates an instrumentation. 
Note you can clone an existing instrumentation by passing in the parameter clone, 
which should be a numeric id of an existing instrumentation.


__\#sdc-createinstrumentation__      

使用方法如下:

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

使用方法如下:

```
sdc-deleteinstrumentation 1
```

__\#sdc-getinstrumentation [instrumentation_id]__

使用方法如下:

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

使用方法如下:

```
#sdc-listinstrumentations
```

