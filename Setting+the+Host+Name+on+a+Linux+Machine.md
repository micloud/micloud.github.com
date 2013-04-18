You set the name of your machine when you order it on my.joyent.com. If you want to change the name later on, follow the instructions for the Linux distribution you're using.



__
```
You need to be logged in as root or be using sudo to change the host name.
```

__
Debian
===
*  Set the host name in the /etc/hostname file:


```
echo "debian.example.com" > /etc/hostname
```



*  Using and text editor, edit the file /etc/hosts so that the hostname points to the loopback address:


```
127.0.0.1       localhost
127.0.1.1       debian.example.com localhost

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```


*  Run the host name initialization script.


```
/etc/init.d/hostname.sh start
```



Ubuntu
===

*  Set the host name in the /etc/hostname file:


```
echo "debian.example.com" > /etc/hostname
```



*  Using and text editor, edit the file /etc/hosts so that the hostname points to the loopback address:


```
127.0.0.1       localhost
127.0.1.1       ubuntu.example.com localhost

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
```



*  Run the host name initialization script.


```
start hostname
```



CentOS
===

*  Using any text editor, edit the file /etc/sysconfig/network so that the HOSTNAME line contains your fully qualified domain name:


```
NETWORKING=yes
NETWORKING_IPV6=no
HOSTNAME=centos.example.com
```



*  Edit the file /etc/hosts so that the host name points to the loopback addresses:


```
# Do not remove the following line, or various programs
# that require network functionality will fail.
127.0.0.1  centos  localhost
::1        centos  localhost6
```



*  Reboot your machine by either using the reboot command or by going to my.joyent.com and clicking the Reboot button.
