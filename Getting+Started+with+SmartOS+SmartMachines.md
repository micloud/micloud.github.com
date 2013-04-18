This topic introduces you to your SmartMachine. It shows you how to verify that it's up and running and tells you what steps you should take next.
In this topic


First Things First - Joyent SmartLogin
===

The my.joyentcloud.com portal includes a feature we called SmartLogin, which allows customers to add ssh keys to their account which in turn is use to access provisioned SmartMachines and Linux VMs. In order to provision a machine (SmartMachine, Linux, Windows), you must have an ssh key set up in your My Account under "SSH Keys".You can manage multiple SSH keys here which will be required for the default initial access to your SmartMachines and Linux VMs.






__While an SSH key is required before you can provision a SmartMachine, Linux VM, or Windows VM, access to a Windows VM is via user/password. The username and password are provided under the Machine Details page for the Windows VM.__






For SmartOS and Appliance SmartMachines, you may edit, add or remove SSH keys at anytime and the changes will occur immediately on any running SmartMachines and SmartOS Appliances. For Linux VMs, the SSH key you wish to use must be added to your my.joyentcloud.com account before provisioning in order for it to be be added to the VM. Additional SSH keys must be manually added to Linux Virtual Servers for additional users post-provisioning.

Once you have at least one SSH key present in your account, you may choose from the list of servers, sizes and datacenters to provision and name a virtual server.  Once provisioned, you may refresh and access details regarding your server, which will provide IP address and any additional login credentials for software or access privileges within your server.

Accessing Your SmartMachine From a Browser
===

Once your SmartMachine is running, it is available on the Internet. Until you set up domain name service for your SmartMachine, you can access it through the public IP address shown in your my.joyentcloud.com portal.

The Preconfigured Accounts
===

We have a variety of SmartMachine datasets and appliances that come with varying levels of preconfigured software and services. Depending on the SmartOS you choose, you may find additional credentials to these services within your SmartMachine Details, by clicking on the server name in your Machines list. Click show credentials to find various password information.

We are in the process of improving the organization of these credentials, but to clarify various usernames and services, please refer to the following:
SmartOSPlus is our primary SmartOS template that includes the most preconfigured and developer friendly packages and services.  Information on various SmartOS datasets may be found here: http://wiki.joyent.com/display/jpc2/SmartOS+Smartmachine+Datasets.
%%(color:red)
Credential Examples:
```
root : password		  (this refers to your root user below)
admin : password		  (this refers to your admin user below)
mysql :  password		  (this refers to your mysql “root” user below)
pgsql : password              (this refers to your postgresql “postgres” user below
virtualmin : password	  (this refers to your virtualmin “admin” user password)
jill : password               (this refers to username “jill” below)
```

%%
root:
===
This is the root user for your SmartMachine. As with other Unix-like systems, root is the superuser and has permission to change any file on the system.You may login directly as root with your ssh keys, or as admin and su - to root.

admin:
===
The admin user is the default administration user for command line operation. It is a member of the staff group, so you can use sudo to perform administrative tasks without logging in as root. Use SSH to log in as admin:ssh admin@your.public.ip.address

mysql:
===
This refers to the running MySQL service on your SmartOSPlus SmartMachine. The default user account for this is “root”, and the password is found next to mysql in your system credentials.  This is the account for the root user for MySQL databases. This is the MySQL user that has privileges to create more MySQL users. You can use the MySQL root account to create new databases, new users, to assign privileges to users, and so on. To access MySQL use the following command: mysql -u root -p. When prompted for a password, use the MySQL password for MySQL access from the system credentials, not the password for the root user.

pgsql:
===
This refers to the PostgreSQL service on your SmartOSPlus SmartMachine (the service is not running by default, but has been pre-configured). The default user for this is “postgres”, and the password is found next to pgsql in your system credentials.  This is the account for the root user for PostgreSQL databases. This is the user that has privileges to create more PostgreSQL users.

virtualmin:
===
This is the web interface deployed and running on a SmartOSPlus SmartMachine, that allows you to create new users, change passwords, create and administer virtual web servers, run simple commands, and so on.  The Default user for Virtualmin is “admin”.  The default password, is the password found in your credentials next to Virtualmin.To access Virtualmin, use the following address in a browser:https://your.public.ip.address:10000
%%(color:blue)
*   You may get a warning that the identify of the website may not be verified. You can safely ignore this and proceed to login to virtualmin.
%%



*  5 Child Pages Reorder Pages:
*  *[Setting Up Your SmartMachine]](*  *[Setting Up Your SmartMachine)
*  *[Finding Your Way Around a SmartMachine]](*  *[Finding Your Way Around a SmartMachine)
*  *[How to use SSH Keys with a Joyent Machine]](*  *[How to use SSH Keys with a Joyent Machine)
*  *[Changing Default SmartMachine Passwords]](*  *[Changing Default SmartMachine Passwords)
*  *[Introduction to Virtualmin and Webmin]](*  *[Introduction to Virtualmin and Webmin)
