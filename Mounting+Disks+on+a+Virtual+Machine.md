The new Joyent Cloud offering currently does not autoprovision with formatted and mounted data volumes for Linux and Windows Virtual Machines. We plan to automate this in the provisioning tool in the near future, however the following is a workaround to do this.

In this page:

Mounting the Data Volume on Windows
===

To mount the data volume on Windows, you can use the Disk Manager application or the diskpart command line tool.

Using Disk Manager
===
To mount the secondary drive using Disk Manager, follow these steps:

*  Choose Run from the Start menu.
*  Type diskmgm.msc and press Enter.

The Disk Manager application will open.
*  The secondary disk is listed on the disks pane. Right click on the secondary volume, click Format, then follow the wizard instructions
Using Diskpart
===
To mount the secondary drive using the diskpart command line tool, follow these instructions:

*  Choose Run from the Start menu.
*  Type cmd.exe and press Enter.

The Command Prompt window appears.
*  Type diskpart, press Enter, and follow the instructions.
You can also use this guide:



```
rescan
select disk 1
attributes clear disk readonly
online disk
create partition
format fs=ntfs quick
exit
```



Mounting the Data Volume on Linux
===

With Linux, you can choose the formatting of the file system you need. Some best pratices are:

*  to use a journaled filesystem such as ext3, ext4, or reiserfs on partitions that have persistent data
*  for partitions with many small files you may want to increase the inode count
*  there is no need to use software RAID as you virtual server still resides on KVM in SmartOS, so it has access to the actual benefits of ZFS FS on the hardware RAID
*  you can recover the reserved space for root and increase performance of the drive by using the tune2fs command.


```
The following example uses /dev/vdb. Your configuration may use a different device as your disk.
```


*  Use fdisk to set up the disk.


```
$ fdisk /dev/vdb
```



*  Select n for new partition: p for primary, 1 for partition number, select whole range of disk(1-xxxxx), w to write out new partition
*  Create the file system.


```
$ mkfs.ext3 /dev/vdb1
```



*  Create a mountpoint for the new file system.


```
$ mkdir /data
```



*  Mount the drive.


```
$ mount -t ext3 /dev/vdb1 /data
```



*  Verify that the drive is mounted.


```
$ df -kh
```



To make the mount presistent across rebooting, add the following line the file /etc/fstab":



```
/dev/vdb1            /data            ext3       defaults      0 0
```



Reboot your system to verify the disk is mounted on reboot.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
