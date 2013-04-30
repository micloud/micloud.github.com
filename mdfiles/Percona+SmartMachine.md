The Joyent Percona SmartMachine is a dynamically scalable virtual machine that is optimized for the cloud. It's based on a standard MySQL SmartMachine, with general software stripped down to bare minimum, and with Percona Server (MySQL) pre-installed and preconfigured for ultimate performance and scalability. Percona Server (MySQL) is better suited for cloud environments with its added features and performance enhancements.

The Joyent Percona Smartmachine is available in both Percona Server 5.1 and Percona Server 5.5.  Both are 64-bit.  The corresponding dataset templates in my.joyentcloud.com are as follows:

Percona 5.1: percona:1.0.7

Percona 5.5: percona:1.2.2

In this page:



Directory Layout
===

The directory layout is similar to a standard Joyent MySQL SmartMachine:

||Directory	 ||Description
|/mysql	         |Holds Percona Server MySQL binaries
|/databases	 |The data directory for MySQL
|/var/log/mysql	 |Where all MySQL logs are kept
|/backups	 |Backups files are stored here from Joyent QuickBackup
Starting and stopping Percona Server (MySQL)
===

The Percona Server (MySQL) process is configured to run under SMF (Service Management Facility); the SmartOS way to stop and start services. See About the Service Management Facility.

Percona already comes started by default. To disable or stop the service:



```
# svcadm disable mysql:percona
```



To enable or start the service:



```
# svcadm enable mysql:percona
```



To restart the service:



```
# svcadm restart mysql:percona
```



Connecting to Percona Server (MySQL)
===

The Percona MySQL server is configured to listen on the private IP address. The private IP can be seen through the portal or by using ifconfig -a; it is the one that starts with 10.. It is strongly recommended that you connect to your Percona Server MySQL appliance from a different SmartMachine (such as a standard generic SmartMachine) using the private IP, regardless of whether from your website code directly (for regular use), or whether you set up phpMyAdmin on another SmartMachine for management or troubleshooting.

We recommend as a best practice that you not use ther MySQL root user. Instead, you should first set up a restricted user with the minimum privileges actually needed.

You can just connect to your appliance and log into MySQL using mysql using the MySQL root password when prompted:



```
# mysql -uroot -p
```



Such a connection takes place over a localhost UNIX socket.

Connecting to Percona Server (MySQL) using SSH tunnels
===

While you can re-configure your MySQL instance to listen on the public IP instead (or all available IPs), it is not recommended to do that for security reasons. Instead, you can use SSH tunnels for secure remote connections. Some MySQL administrator tools (e.g. Navicat) already provide for SSH tunneling functionality. You'd use these values when configuring such tool:

*  SSH hostname: <smartmachine-hostname-or-ip>
*  SSH port: 22 (should be default)
*  SSH username (login): admin
*  SSH password: <smartmachine-admin-password>
*  MySQL hostname: <smartmachine-private-ip>
*  MySQL port: 3306 (should be default)
*  MySQL username: root (or a custom user your created)
*  MySQL password: <smartmachine-mysql-password>
To use 'ssh' in a terminal to open the tunneled connection instead:



```
ssh -L3336:<smartmachine-private-ip>:3306 -N admin@<smartmachine-hostname>
```



You'd change 3336 to anything you like, that's the local port on your computer that you'll connect the MySQL client to afterwards.

Backing up MySQL with Joyent QuickBackup
===

Part of the Joyent Percona SmartMachine is Joyent QuickBackup, a fast non-blocking MySQL backup service powered by Percona Xtrabackup on the back end. This service comes already configured with the username and password configured, but disabled by default. You do not need to change the username and password settings. Only minute, hour, day, and expiredays need to be set.

To configure the backup service, use the svccfg command to set the following values. By default the service is set to backup every night at midnight

||Property	 ||Description	 ||Accepted Values	 ||Default Value
|quickbackup/username	 |MySQL user for QuickBackup	 |16 characters	 |qb-xxxxxxxx
|quickbackup/password	 |MySQL password for QuickBackup |41 characters	 |xxxxxxxxxxx
|quickbackup/minute	 |Minute of the hour to backup	 |0-60 comma separated or 'all'	 |0
|quickbackup/hour	 |Hour of the day to backup	 |0-23 comma separated or 'all'	 |0
|quickbackup/day	 |Day of the week to backup	 |sun-sat comma separated or 'all'	 |all
quickbackup/expiredays	 Number of days to keep backups	 1-255 or 'none'	 |3
To see the current settings, use the svcprop command like this:



```
# svcprop svc:/network/mysql:quickbackup | grep quickbackup | head -6
quickbackup/day astring all
quickbackup/expiredays astring 3
quickbackup/hour astring 0
quickbackup/minute astring 0
quickbackup/username astring qb-xxxxxxxx
quickbackup/password astring xxxxxxxx
```



For example, to have the service do a backup every 15 minutes of every hour Monday, Tuesday, Wednesday, Thursday, and Friday, you would use the following svccfg commands:



```
# svccfg -s network/mysql:quickbackup setprop quickbackup/minute = astring: 0,15,30,45
# svccfg -s network/mysql:quickbackup setprop quickbackup/hour = astring: all
# svccfg -s network/mysql:quickbackup setprop quickbackup/day = astring: mon,tue,wed,thur,fri
```


After setting the properties use the svcadm command to refresh and restart the service:



```
# svcadm refresh mysql:quickbackup
# svcadm restart mysql:quickbackup
# svcs mysql:quickbackup
STATE          STIME    FMRI
enabled        Apr_13   svc:/network/mysql:quickbackup
```



Each backup will be its own file in /backups in files named %Y-%m-%d_%H-%M-%S-backup.tar.gz. The backup files contain all of the databases. A future release will let you back up specific databases.

QuickBackup backup messages are logged to /var/log/mysql/backups.log. If the backup completed successfully you will see:



```
Backup completed successfully.
```



in the log file at the end of every back up.

At the end of every backup QuickBackup will do a clean up of old backup files and remove them if older than quickbackup/expiredays set. It does this by checking the last modification time of the backup file.

Restoring a MySQL backup with Joyent QuickBackup
===

To restore a backup you must first shut down the MySQL server:



```
# svcadm disable mysql:percona
# svcs mysql:percona
STATE          STIME    FMRI
disabled       14:19:21 svc:/network/mysql:percona
```



Next, tell QuickBackup which backup you want to restore by giving it the proper file of the backup. If everything works as expected you'll see the message that the restore completed successfully:



```
# quickbackup restore /backups/2011-04-16_20-20-00-backup.tar.gz
Restore from /backups/2011-04-16_20-20-00-backup.tar.gz
Restore completed successfully.
```



If you receive an error you'll need to check the QuickBackup restore log file at /var/log/mysql/restores.log to see what happened.

Once the restore is complete, re-enable MySQL, and everything will be running from the backup you just restored from:



```
# svcadm enable mysql:percona
# svcs mysql:percona
STATE          STIME    FMRI
online         14:30:31 svc:/network/mysql:percona
```







----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
