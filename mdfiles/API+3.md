
MiCloud API 基本操作(三) :
===

若在command line下輸入 sdc- +[tab][tab] (字元補其)會出現所有指令

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法

以下將教您如何 __管理Key__,__查詢Machinesnapshot__,及__其他指令__。

##關於 key：
--------------------------------------------------------------------------------------
Keys are the means by which you operate on your SSH/signing keys. 
Currently CloudAPI supports uploads of public keys in the OpenSSH format.

Note that while it's possible to provide a name attribute for an SSH key in order to use it as an human friendly alias, 
this attribute presence is completely optional.


__\#sdc-createkey__ 產生一個key

 使用方法如下:
 
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

__\#sdc-deletekey  [key id]__ 刪除key

 使用方法如下:

```
 #sdc-deletekey id_rsa
```

__\#sdc-getkey [key id]__ 查詢單筆key

 使用方法如下:

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

__\#sdc-listkeys__ 查詢所有key

 使用方法如下:

```
#sdc-listkeys
```

##關於 machinesnapshot ：
--------------------------------------------------------------------------------------
Allows you to take a snapshot of a machine. Note that snapshots are not usable with other machines; 
they are a point in time snapshot of "this" machine. Once you have one or more snapshots, 
you can boot the machine from a snapshot.

You can only take snapshots on machines that are of type 'smartmachine'.


__\#sdc-createmachinesnapshot [machine id]__

使用方式如下:

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

__\#sdc-getmachinesnapshot [snapshot name] --machine[machine id]__   

You can poll on GetMachineSnapshot until the state is success.

使用方式如下:

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

__\#sdc-startmachinefromsnapshot -n [snapshot name] [machine id]__  

