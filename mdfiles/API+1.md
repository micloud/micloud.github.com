
MiCloud API 基本操作(一) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 管理[Machine](#Machine)   ,查詢[Datasets](#Datasets),查詢[Packages](#Packages)。


##關於 machine：<a name="Machine"></a>
--------------------------------------------------------------------------------------

在Machine建立的當下，MiCloud賦予Machine一些主機上的特殊屬性，讓使用者可以透過API的方式查詢。

一般我們可以在CLI上查詢Create Machine的 help page可以知道有哪些參數可以帶入：

__\# sdc-createmachine --help__

```
sdc-createmachine [--account string] [--debug boolean] [--dataset string] [--help boolean] 

[--identity path] [--keyId string] [--metadata ] [--name string] [--package string] [--tag ] [--url url]

```

__\#sdc-createmachine --package [name] --dataset [urn]__ 

建立一台新機器，參數Datasets與Packages是必要條件。(其他參數若使用者沒輸入則電腦會自動預設好)

可以查看[__關於Datasets__](#Datasets),[__關於Packages__](#Packages)。

範例如下:

```
#sdc-createmachine --package "regular_512" --dataset "sdc:sdc:nodejs:1.1.4"

結果:
{
  "id": "0fa17f7b-7cf4-4504-b0c7-062178c3850c",
  "name": "0f3e84f",
  "type": "smartmachine",
  "state": "provisioning",
  "dataset": "sdc:sdc:nodejs:1.1.4",
  "ips": [
    "211.78.254.30"
  ],
  "memory": 512,
  "disk": 10240,
  "metadata": {},
  "created": "2013-07-01T01:41:37+00:00",
  "updated": "2013-07-01T01:41:37+00:00",
  "primaryIp": "211.78.254.30"
}


```
__\#sdc-deletemachine [machine id] __

刪除指定機器(其中機器的狀態必須是"stopped"方可進行刪除動做)。

__\#sdc-getmachine [machine id]__ 

藉由id查詢指定機器詳細資料。

範例如下:

```
#sdc-getmachine 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:
{
  "id": "0fa17f7b-7cf4-4504-b0c7-062178c3850c",
  "name": "0f3e84f",
  "type": "smartmachine",
  "state": "provisioning",
  "dataset": "sdc:sdc:nodejs:1.1.4",
  "ips": [
    "211.78.254.30"
  ],
  "memory": 512,
  "disk": 10240,
  "metadata": {},
  "created": "2013-07-01T01:41:37+00:00",
  "updated": "2013-07-01T01:41:37+00:00",
  "primaryIp": "211.78.254.30"
}

```
__\#sdc-listmachines__

檢索該帳戶上的所有機器。


__\#sdc-rebootmachine [id]__

藉由id而重新啟動該機器。

範例如下:

```
#sdc-rebootmachine 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:

  "state": "running" → "state": "stopped" → "state": "running"
```

__\#sdc-resizemachine --package [name] [machine id]__  

修改機器 (memory,disk)

範例如下:

```
#sdc-resizemachine --package "S 1GB RAM (1CORE)" 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:
{
  "id": "0fa17f7b-7cf4-4504-b0c7-062178c3850c",
  "name": "0f3e84f",
  "type": "smartmachine",
  "state": "running",
  "dataset": "sdc:sdc:nodejs:1.1.4",
  "ips": [
    "211.78.254.30"
  ],
  "memory": 1024,
  "disk": 15360,
  "metadata": {},
  "created": "2013-07-01T01:42:23+00:00",
  "updated": "2013-07-01T02:07:03+00:00",
  "primaryIp": "211.78.254.30"
}


```
__\#sdc-startmachine [machine id]__

藉由id而啟動該機器。

範例如下:

```
#sdc-startmachine 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:

  "state": "running"
```

__\#sdc-stopmachine [machine id]__

範例如下:

```
#sdc-stopmachine 0fa17f7b-7cf4-4504-b0c7-062178c3850c

藉由id而停止該機器。

結果:

  "state": "stopped"
```

##關於 datasets：<a name="Datasets"></a>
--------------------------------------------------------------------------------------

__\#sdc-getdataset [name]__  

檢索指定的 datasets，包含其id,urn,name,os,type,description,default,requirement,version等。

範例如下:

```
#sdc-getdatasets chefserver

結果:
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

__\#sdc-listdatasets__ 

檢索所有的datasets，包含id,urn,name,os,type,description,default,requirement,version等。

範例如下:

```
#sdc-listdatasets
```

##關於 packages：<a name="Packages"></a>
--------------------------------------------------------------------------------------

__\#sdc-getpackage [name]__ 

檢索單筆的package，包含name,mwmory,disk,vcpus,swap,default等。

範例如下:

```
#sdc-listpackages "3XL 32GB RAM (4CORE)"

 結果:
{
  "name": "3XL 32GB RAM (4CORE)",
  "memory": 32768,
  "disk": 512000,
  "vcpus": 4,
  "swap": 32768,
  "default": false
}
```


__\#sdc-listpackages__ 

檢索所有package，包含name,mwmory,disk,vcpus,swap,default等。

範例如下:

```
#sdc-listpackages
```
