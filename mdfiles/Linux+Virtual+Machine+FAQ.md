Frequently Asked Questions


What is the difference between a Linux Virtual Machine and a SmartMachine?
===
Both SmartMachines and Linux Virtual Machines are virtual servers that give you the power of running an entire server. SmartMachines use SmartOS, which is major fork of OpenSolaris. Linux Virtual Machines run one of three popular Linus distributions: Debian, Ubuntu, or CentOS.

What is my host name?
===
To find your host name, use the hostname command.

Help The software I need is missing.
===
Linux Virtual Machines come preconfigured with a very small number of tools, such as Perl, Python, bash, vim, diff, and so on. To install a web server or a database, use the package manual for your Linux distribution: apt for Debian and Ubuntu, yum for CentOS.

What is my IP address?
===
The following one-line script displays the IP address of your Virtual Machine:



```
/sbin/ifconfig eth0|grep inet|awk {'print $2'}|cut -d":" -f2
```



How do I add another Linux instance?
===
To add another Linux machine, go to https://my.joyentcloud.com.

How do I login to my Linux instance?
===
When you request a Virtual Machine, you should first make sure you have added a valid SSH key via https://my.joyentcloud.com. You will be using this key to access your new Linux instance. Once provisioned, you can login as the root user using your machine's IP address.



```
ssh root@192.0.2.10
```



Once you log in, you may want to do the following:

*  Change the root user's password.
*  Create an admin user account
*  Disable SSH root access


```
What Linux Distribution am I running?
```



The /proc/version file contains information about the Linux distribution. If you use the command cat /proc/version, you'll see one of these:



```
CentOS
Linux version 2.6.18-164.el5 (mockbuild@builder10.centos.org)
(gcc version 4.1.2 20080704 (Red Hat 4.1.2-46)) #1 SMP Thu Sep 3 03:28:30 EDT 2009
```





```
Ubuntu
Linux version 2.6.32-22-server (buildd@yellow)
(gcc version 4.4.3 (Ubuntu 4.4.3-4ubuntu5) ) #33-Ubuntu SMP Wed Apr 28 14:34:48 UTC 2010
```





```
Debian
Linux version 2.6.26-2-amd64 (Debian 2.6.26-19) (dannf@debian.org)
(gcc version 4.1.3 20080704 (prerelease) (Debian 4.1.2-25)) #1 SMP Wed Aug 19 22:33:18 UTC 2009
```






----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
