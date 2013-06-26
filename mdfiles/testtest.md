
MiCloud API :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

__實做 MiCloud API:__

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

##關於 Tag：

__\#sdc-addmachinetags  -t  key=value  [machine id]__ 可以讓你添加新的標籤，而不是覆蓋現有的標籤
 
 此乎叫允許您傳送任意數量的參數，而這些參數將被轉為標籤可供您所使用
 
 使用方法如下:
 
```
#sdc-addmachinetags -t foo=bar  33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果如下:
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
  
  結果如下:

   bar
```

__\#sdc-listmachinetags [machine id]__ 可查詢所有tag與tag的值

使用方法如下:

```
 #sdc-listmachinetags 33fc3da1-2a33-4463-9dd8-f37f8b5597c5

 結果如下:
 {
   "foo": "bar"
 }
 
```



##關於 instrumentation：

__\#sdc-createinstrumentation__      

使用方法如下:

```
#sdc-createinstrumentation -m syscall -s syscalls

結果
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

結果
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


##關於 key：

__\#sdc-createkey__ 產生一個key


 使用方法如下:
 
```
#sdc-createkey -n id_rsa ~/.ssh/id_rsa.pub

結果
{
  "name": "id_rsa",
    "key": "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAuMb+L3kt4ZQELQ8q07VzZ/
          tOBe6G+POo8j/WNyriKLa/nG6+419EGRetcnPY6UpuE5adIppVdG7FqId6
		  XNIRcVzxYs6clZ7R1/8f9F9YJLZZphfoGQrR6YZHfePn2joRSZ1L02DAYx
		  N7UID3S8TEiT+2tnmUeTB2W9Y1ddkQOQE12w5jrtKIN3QwJBl5TZ7D+sv6
		  Pepw3yWvxKSrTQdsalrkkJC3tDgctyPCHY4yqNWIFEFui7hIbfZPThNRkI
		  vdqtAEAyB/9tlB9MrmHaoW2C49aFLnh2Qtf5xniT8FwJc9kurbYBJnK8pr
		  beJ/Kug5DdC11k/sJCoaFQ45Sw== root@*********",
  "created": "2013-06-26T06:46:45+00:00",
  "updated": "2013-06-26T06:46:45+00:00"
}
```

__\#sdc-deletekey  [key id]__ 刪除key

 使用方法如下:

```
 #sdc-deletekey id_rsa
```

__\#sdc-getkey [key id]__ 查詢單筆key

 使用方法如下:

```
#sdc-getkey id_rsa

結果
{
  "name": "id_rsa",
  "key": "ssh-rsa AAAAB3NzaC1yc2EAAAABIwAAAQEAuMb+L3kt4ZQELQ8q07VzZ/
          tOBe6G+POo8j/WNyriKLa/nG6+419EGRetcnPY6UpuE5adIppVdG7FqId6
		  XNIRcVzxYs6clZ7R1/8f9F9YJLZZphCoGQrR6YZHvePn2joRSZ1L02DAYx
		  N7UID3S8TEiT+2tnmUeTB2fd9Y1dNkQOQE12w5jrfKIN3QwJBl5TZ7D+sv
		  Pepw3yWvxKSdsQ+alrkkJC3tDgctyPCHY4yqNWIFEFui7hIbfZPThNRkIn
		  vdqtAEAyB/9tlB9MrmHaoW2C49aFLnh2Qtf5xniT8FwJc9kurbYBJnK8pr
		  beJ/Kug5DdC11k/sJCoaFQ45Sw== root@*********",
  "created": "2013-06-26T06:46:45+00:00",
  "updated": "2013-06-26T06:46:45+00:00"
}
```

__\#sdc-listkeys__ 查詢所有key

 使用方法如下:

```
#sdc-listkeys
```

##關於 metadata：

__\#sdc-updatemachinemetadata   --metadata key=value [mahine id]__ 新增metadata
 
 使用方式如下:
 
 ```
 #sdc-updatemachinemetadata --metadata foo=bar 33fc3da1-2a33-4463-9dd8-f37f8b5597c5
 
 結果
 
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
 
 結果
 
{
  "root_authorized_keys": "ssh-rsa ......................略",
  "foo": "bar"
}
```



##關於 datasets：

__\#sdc-getdataset [name]__  查詢單筆datasets，包含id,urn,name,os,type,description,default,requirement,version


使用方式如下:

```
#sdc-getdatasets chefserver

結果
  {
    "id": "e6f10814-a38d-11e2-8138-67b96e228c1e",
    "urn": "sdc:sdc:chefserver:1.1.0",
    "name": "chefserver",
    "os": "smartos",
    "type": "smartmachine",
    "description": "machine_new_SmartOS64ChefServer",
    "default": false,
    "requirements": {},
    "version": "1.1.0"
  }
```

__\#sdc-listdatasets__ 查詢所有datasets，包含id,urn,name,os,type,description,default,requirement,version

使用方式如下:
```
#sdc-listdatasets
```

##關於 packages：

__\#sdc-getpackage [name]__ 查詢單筆package，包含name,mwmory,disk,vcpus,swap,default

使用方式如下:

```
#sdc-listpackages "3XL 32GB RAM (4CORE)"

 結果
{
  "name": "3XL 32GB RAM (4CORE)",
  "memory": 32768,
  "disk": 512000,
  "vcpus": 4,
  "swap": 32768,
  "default": false
}
```


__\#sdc-listpackages__ 查詢所有package，包含name,mwmory,disk,vcpus,swap,default

使用方式如下:

```
#sdc-listpackages
```