Your SmartMachine can be identified by several names, depending where it's being accessed from.

IP Addresses
===
An IP address is the unique address of your machine on a network. Every SmartMachine has two IP addresses:

*  a public (external) address that identifies your machine on the Internet
*  a private (internal) address that identifies your machine within the local network of SmartMachines
__Displaying the external IP adddress__


```
ifconfig external0:1 | grep inet | awk {'print $2'} | cut -d":" -f2
```



__Displaying the internal IP adddress__


```
ifconfig internal0:1 | grep inet | awk {'print $2'} | cut -d":" -f2
```



Host Name
===
This is the name of the machine. The Domain Name Service (DNS) maps this name to an IP address. See Setting the Host Name of a SmartMachine to learn how to set your host name.

Zone Name
===
Your SmartMachine is a virtual machine that resides inside a physical server. The zone name is the virtual server's name within the physical server.

Use the zonename command to display your SmartMachine's zone name.

In addition to any host name you set up for your machine, you can always access your SmartMachine with the address zonename.joyent.us.

Reverse PTR Records
===
Domain Name Service maps a host name to an IP address. A reverse pointer record maps an IP address to a host name. In most cases, a reverse pointer record isn't necessary. If you plan to set up a mail server, however, you will probably need one. In that case, submit a support ticket to request one. Be sure to provide your zone name and your public IP address.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
