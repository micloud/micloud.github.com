
MiCloud API 基本操作(三) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 管理[Key](#Key),查詢[Machinesnapshot](#Machinesnapshot),及[其他指令](#Other)。

##關於 key：<a name="Key"></a>
--------------------------------------------------------------------------------------
Keys are the means by which you operate on your SSH/signing keys. 
Currently CloudAPI supports uploads of public keys in the OpenSSH format.

Note that while it's possible to provide a name attribute for an SSH key in order to use it as an human friendly alias, 
this attribute presence is completely optional.

When it's not given, the ssh key fingerprint will be used instead to fill also the name attribute, 
appart of the always present fingerprint atribute.

On the following routes, the parameter placeholder :key can be replaced either with key's name or fingerprint.

It's strongly recommended to use fingerprint when possible, 
since name attribute hasn't got - neither will have - uniqueness restrictions.




目前CloudAPI支持以OpenSSH格式的公鑰上傳。
值得注意的是，在此也提供了相較友善的 "name" 屬性給 SSH key (其中name 可有可無)

__\#sdc-createkey__ 

上傳一個新的 OpenSSH key 到 SmartDataCenter。

範例如下:
 
```
#sdc-createkey -n id_rsa ~/.ssh/id_rsa.pub

結果:
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

__\#sdc-deletekey  [key id]__ 

刪除一個SSH key。

範例如下:

```
 #sdc-deletekey id_rsa
```

__\#sdc-getkey [key id]__ 

檢索個別Key的記錄。

範例如下:

```
#sdc-getkey id_rsa

結果:
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

__\#sdc-listkeys__  

列出指定帳戶的所有公共密鑰。

範例如下:

```
#sdc-listkeys
```

##關於 machinesnapshot ：<a name="Machinesnapshot"></a>
--------------------------------------------------------------------------------------
Allows you to take a snapshot of a machine. Note that snapshots are not usable with other machines; 
they are a point in time snapshot of "this" machine. Once you have one or more snapshots, 
you can boot the machine from a snapshot.

You can only take snapshots on machines that are of type 'smartmachine'.


__\#sdc-createmachinesnapshot [machine id]__  

對所指定smartmachine創見一個新的快照。

範例如下:

```
#sdc-createmachinesnapshot 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:
{
  "name": "20130701021139",
  "state": "queued",
  "created": "2013-07-01T02:11:39+00:00",
  "updated": "2013-07-01T02:11:39+00:00"
}

```

__\#sdc-deletemachinesnapshot [snapshot name] --machine [machine id]__  

刪除指定smartmachine的快照。

__\#sdc-getmachinesnapshot [snapshot name] --machine[machine id]__  

藉由name取得指定smartmachine的快照。

範例如下:

```
#sdc-getmachinesnapshot "20130701021139" --machine 0fa17f7b-7cf4-4504-b0c7-062178c3850c

結果:
{
  "name": "20130701021139",
  "state": "queued",
  "created": "2013-07-01T02:11:39+00:00",
  "updated": "2013-07-01T02:11:39+00:00"
}

```

__\#sdc-listmachinesnapshots__  

列出指定一個smartmachine的所有快照。

__\#sdc-startmachinefromsnapshot -n [snapshot name] [machine id]__  

當機器處於 'stopped' 狀態下，您可以選擇用快照起動機器。

##其他指令：<a name="Other"></a>
--------------------------------------------------------------------------------------

__\#sdc-describeanalytics__ 

檢索可以創建所使用的分析端點 instrumentations 的 架構。

範例如下:

```
#sdc-describeanalytics
```

__\#sdc-listdatacenters__ 

提供一個關於所有數據中心的列表 。

範例如下:

```
#sdc-listdatacenters
```

__\#sdc-setup__ 

在數據中心設置一個帳戶來使用。

範例如下:

```
#sdc-setup

SDC_ACCOUNT:    輸入您的username。

SDC_URL:   CloudAPI 端點.
例如，一個為JoyentCloud的CloudAPI端點https://us-west-1.api.joyentcloud.com。 
(每個數據中心在雲其自己的CloudAPI端點)。

SDC_KEY_ID:  您上傳到 SmartDC 的 key fingerprint。
```





