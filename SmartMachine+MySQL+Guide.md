SmartMachines come with a Pkgsrc install of MySQL5 in /opt/local. Our older imaged Accelerators come with a Blastwave install of MySQL5 in /opt/csw/mysql5 and MySQL4 in /opt/csw/mysql4. MySQL5 is preferred over MySQL4 because many fixes and features have gone in to 5, especially in replication and clustering. Whatever is used, this guide will work for any of them. This will assume you have a Pkgsrc imaged SmartMachine.


Replication
===
Replication is a method that MySQL uses to mirror changes asynchronously to a secondary server. It is important to know that replication is not a true redundant configuration because there is no automatic fail over, but it is a good way to have a backup copy always on standby. Because of its limited requirements it can be used in lower memory and lower bandwidth situations making replication a good choice for using on small or large Joyent SmartMachines.

```
Do not get MySQL replication mixed up with MySQL clustering. MySQL clustering is synchronous and a true fail over solution, while replication is asynchronous and only mirrors changes to a secondary server. You would have to use BigIP to handle the fail over case.
Any kind of replication with MySQL is pretty simple. Whether you are doing a master to slave or a master to master, MySQL replication is all one in the same. Once you understand how replication works, the configurations are applied the same way in each setup. And for the small amount of time it takes to implement, you can get huge gains such as redundancy, backups, or even load balancing.
```

Master to slave
===
In a master to slave setup, the master server holds all of the information and handles client requests whereas the slave just contains a complete copy of the information. The slave is a mirror of the master server. It does this by constantly checking the master's binary log for updates and replicates them to its self. Because the master has to handle client traffic and slave traffic, the master is usually a more powerful box.

```
To use a master to slave setup for load balancing the master can do read and writes, but the slave can only do reads. This is because if you do writes on the slave, the master has no way of knowing and copying them over, leaving you with inconsistent data between the two. This problem can be solved in a master to master setup.
To get started you need to setup a replicating user for the servers to talk between with:
```

On the master:


```
mysql> grant replication slave, replication client on *.* to 'repuser'@'slaveip'
identified by 'password';
```



Note that here I give it privileges to any database, you can specify if you only want to give it access to a certain database.

Now to the my.cnf settings. For the master, we only need 2 lines under the mraw:mysqld heading.

On the master's /opt/local/etc/my.cnf:



```
server-id = 1
log-bin = /var/log/mysql/binary.log
#binlog-do-db = testdb
```



server-id is a number to identify the master server. In a replicating setup you have to give your servers these unique numbers so they don't get confused with each other.

log-bin is the path and file to the binary log, where it stores all of the changes. Be sure this directory exists and the user mysql has write access to it. This file will also be replaced with an index number as new log files are created, such as bin.000001, bin.000002, etc.

binlog-do-db is an option that tells to only replicate a certain database. It is commented out here so we will replicate all databases. If you use this, you must have it on the master and slave.

For the slave, we need more lines. It should look like this:

On the slave's /opt/local/etc/my.cnf:



```
server-id = 2
master-host = masterip
master-port = 3306
master-user = repuser
master-password = password
log-bin = /databases/binary.log
log-bin-index = /databases/log-bin.index
log-error = /databases/error.log
relay-log = /databases/relay.log
relay-log-info-file = /databases/relay-log.info
relay-log-index = /databases/relay-log.index
master-info-file = /databases/master.info
#binlog-do-db = testdb
```



You should know server-id from the previous configuration, and the next four lines are authentication settings from when we created the user earlier.

log-bin was mentioned before, but this one is on the slave.

log-bin-index holds the latest binary log file name to use. As mentioned before, the binary log gets rotated (bin.000001, bin.000002, etc), and as they are rotated this file keeps the file names and knows which one is the latest.

log-error is a file that holds any errors that come up in the replication process. It's always a good idea to have this logging so you know when things go wrong.

relay-log is a file that is for holding a copy of a change that the slave finds in the master's binary log. These are rotated like binary logs are.

relay-log-info-file holds the name of the file and its position where the relay change was found.

relay-log-index holds the name of the current relay log file to use.

master-info-file holds the user and password information to connect to the master. It also holds the position that it is at of the log.

binlog-do-db is an option that tells to only replicate a certain database. It is commented out here so we will replicate all databases. If you use this, you must have it on the master and slave.

Once you get these settings in and restart each server, everything is ready to go.

On the master and slave:



```
# svcadm restart mysql
```





```
Also be sure to check the bind-address is listening on the proper IP, and not 127.0.0.1. If it's listening on 127.0.0.1 it can't communicate with another server. The choices are to either map bind-address to the private IP of the machine and communicate over the local network, or use a ssh tunnel.
```


Generally, a good way to get the master and slave machines to see each other is to leave both bound to 127.0.0.1, and use an ssh tunnel from the slave that maps a new port to mysql on the master. For example, port 3306 would be the slave local database as before, and port 3307 would provide access to the master database through a ssh tunnel.

If you are starting with a blank MySQL, create a database on the master and then check the slave to see if it replicated over. It should be almost instant.

If you already have a database in the master that you want replicated to the slave, you have two options:

*  Run the LOAD DATA FROM MASTER; commmand on the slave which will tell it to grab all the data from the master. Beware this will lock all of the tables and only works with MyISAM
*  Take a mysqldump of the database and import it to the slave. When doing this make sure you use the mysqldump option --master-data so it will insert the master's binary log file name and position of the log. After imported to the slave, run:
On the slave:



```
mysql> start slave;
```



This will tell it to connect to the master and start checking for changes in the binary log.

Master to master
===
In a master to master configuration both servers are configured as masters where each one can update each other. Either server can receive writes and they will mirror the changes back and forth to each other, unlike a master to slave configuration where only the master will propagate changes. It does this by constantly check each other's binary log files for changes.



```
Load balancing is a lot easier on multi-master because either server can update each other, allowing them both to perform reads and writes without data becoming inconsistent.
```


One important thing to be aware of in a multi-master setup is because each server can receive writes, auto increment can be a problem if one fails and it starts adding increments that are already there.

To fix this use these two options: auto_increment_increment and auto_increment_offset.

MySQL4 doesn't have these which makes a multi-master setup on MySQL4 a real pain. These settings keep the increments unique so that they won't clash with each other. A good explanation of this can be found at:

[http://www.onlamp.com/pub/a/onlamp/2006/04/20/advanced-mysql-replication.html](http://www.onlamp.com/pub/a/onlamp/2006/04/20/advanced-mysql-replication.html)

The first thing to do is to setup the users on each server:

On master1:



```
mysql> grant replication slave, replication client on *.* to 'master1'@'master2ip'
identified by 'password';
```



On master2:



```
mysql> grant replication slave, replication client on *.* to 'master2'@'master1ip'
identified by 'password';
```



The next part is the settings in /opt/local/etc/my.cnf. Both master1 and master2 will pretty much look the same. Both will be configured as masters with different server-id's, swapped authentication information, and an auto_increment value.

On master1 under the mraw:mysqld section:



```
server-id = 1

master-host = master2ip
master-port = 3306
master-user = master2
master-password = password

log-bin = /var/log/mysql/bin.log
log-slave-updates
log-bin-index = /var/log/mysql/log-bin.index
log-error = /var/log/mysql/error.log

relay-log = /var/log/mysql/relay.log
relay-log-info-file = /var/log/mysql/relay-log.info
relay-log-index = /var/log/mysql/relay-log.index
master-info-file = /var/log/mysql/master.info

auto_increment_increment = 10
auto_increment_offset = 1
replicate-same-server-id = 0
```



On master2 under the mraw:mysqld section:



```
server-id = 2

master-host = master1ip
master-port = 3306
master-user = master1
master-password = password

log-bin = /var/log/mysql/bin.log
log-slave-updates
log-bin-index = /var/log/mysql/log-bin.index
log-error = /var/log/mysql/error.log

relay-log = /var/log/mysql/relay.log
relay-log-info-file = /var/log/mysql/relay-log.info
relay-log-index = /var/log/mysql/relay-log.index
master-info-file = /var/log/mysql/master.info

auto_increment_increment = 10
auto_increment_offset = 2
replicate-same-server-id = 0
```



You can see the only main difference here is the authentication information is swapped so they connect to each other. Here are the options explained:

server-id is a number to identify each server. In a replicating setup you have to give your servers these unique numbers so they don't get confused with each other.

master-host, master-port, master-user, and master-password are authentication settings to communicate with the other server.

log-bin is the path and file to the binary log, where it stores all of the changes. Be sure this directory exists and the user mysql has write access to it. This file will also be replaced with an index number as new log files are created, such as bin.000001, bin.000002, etc.

log-slave-updates tells the server to write changes that it receives from it's master through the relay log to its own log.

log-bin-index holds the latest binary log file name to use. The binary log gets rotated (bin.000001, bin.000002, etc), and as they are rotated this file keeps the file names and knows which one is the latest.

log-error is a file that holds any errors that come up in the replication process. It's always a good idea to have this logging so you know when things go wrong.

relay-log is a file that is for holding a copy of a change that the slave finds in the master's binary log. These are rotated like binary logs are.

relay-log-info-file holds the name of the file and its position where the relay change was found.

relay-log-index holds the name of the current relay log file to use.

master-info-file holds the user and password information to connect to the master. It also holds the position that it is at of the log.

replicate-same-server-id tells each server to ignore any statements that originated from its own server ID. This prevents infinite replication loops.

It is a good idea to be watching the error.log on both master1 and master2 while they are starting up so you can understand how they communicate with each other.

On master1 and master2:



```
# svcadm restart mysql
```



When you restart them it is likely you won't be able to restart them at exactly the same time so one of them will refuse the connection at first. On one of the servers you'll probably see:



```
070608 20:15:12 [ERROR] Slave I/O thread: error connecting to master 'master1@x.x.x.x:3306':](070608 20:15:12 [ERROR Slave I/O thread: error connecting to master 'master1@x.x.x.x:3306':)
Error: 'Lost connection to MySQL server at 'reading initial communication packet', system
error: 146'  errno: 2013  retry-time: 60  retries: 86400
```


Just ignore this and give it a minute or so to retry and sync up. You should see this when it finally does connect successfully:



```
070608 20:16:27 [Note] Slave I/O thread: connected to master 'master1@x.x.x.x:3306',](070608 20:16:27 [Note Slave I/O thread: connected to master 'master1@x.x.x.x:3306',)
replication started in log 'FIRST' at position 4
```


Now you want to go to both master1 and master2 and run:



```
mysql> show slave status
G;
*  ************************** 1. row ***************************
Slave_IO_State: Waiting for master to send event
Master_Host: x.x.x.x
Master_User: master1
Master_Port: 3306
Connect_Retry: 60
Master_Log_File: bin.000001
Read_Master_Log_Pos: 278
Relay_Log_File: relay.000027
Relay_Log_Pos: 229
Relay_Master_Log_File: bin.000001
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
Replicate_Do_DB:
Replicate_Ignore_DB:
Replicate_Do_Table:
Replicate_Ignore_Table:
Replicate_Wild_Do_Table:
Replicate_Wild_Ignore_Table:
Last_Errno: 0
Last_Error:
Skip_Counter: 0
Exec_Master_Log_Pos: 278
Relay_Log_Space: 229
Until_Condition: None
Until_Log_File:
Until_Log_Pos: 0
Master_SSL_Allowed: No
Master_SSL_CA_File:
Master_SSL_CA_Path:
Master_SSL_Cert:
Master_SSL_Cipher:
Master_SSL_Key:
Seconds_Behind_Master: 0
1 row in set (0.00 sec)
```



If Slave_IO_Running and Slave_SQL_Running are both set to Yes, everything should be working properly.

Now check that you can create a database on master1 and it replicated to master2. Then check that you can create a database on master2 and it replicate to master1.

If one of the servers fail for some reason and you start the failed server, they should sync up and be ready to go without any kind of changes. You should not have to tell either one to start slave; This is a good test to do once you get everything setup:

Go to master1, stop it, check the show slave status
G on master2

You should see:



```
Slave_IO_Running: No
Slave_SQL_Running: Yes
```



Now goto master1, start it, and check the slow slave status
G on both of them. After 30 seconds or so they should both show:



```
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
```



You should also see them sync back up in the error.log file.

Troubleshooting
===
*  Check that you can telnet to each server on the MySQL listening port from one another.
*  Become familiar with the show slave status command.
On the slave:



```
mysql> show slave status
G;
*  ************************** 1. row ***************************
Slave_IO_State: Waiting for master to send event
Master_Host: x.x.x.x
Master_User: repuser
Master_Port: 3306
Connect_Retry: 60
Master_Log_File: bin.000003
Read_Master_Log_Pos: 1077
Relay_Log_File: relay.000003
Relay_Log_Pos: 312
Relay_Master_Log_File: bin.000003
Slave_IO_Running: Yes
Slave_SQL_Running: Yes
Replicate_Do_DB:
Replicate_Ignore_DB:
Replicate_Do_Table:
Replicate_Ignore_Table:
Replicate_Wild_Do_Table:
Replicate_Wild_Ignore_Table:
Last_Errno: 0
Last_Error:
Skip_Counter: 0
Exec_Master_Log_Pos: 1077
Relay_Log_Space: 312
Until_Condition: None
Until_Log_File:
Until_Log_Pos: 0
Master_SSL_Allowed: No
Master_SSL_CA_File:
Master_SSL_CA_Path:
Master_SSL_Cert:
Master_SSL_Cipher:
Master_SSL_Key:
Seconds_Behind_Master: 0
```



If Slave_IO_Running and Slave_SQL_Running are Yes, the slave is connected and working. If they say No, check your log-error file.

*  Check your log-error file.
*  Check your user and password configuration again. If you change the user and password information in my.cnf, you will need to delete the var/master.info file first before starting up otherwise it will not pick up the changes. "reset master" will do the same.
Extra configuration options
===
The configurations shown above in this guide will only get you started with replication. There are many other options mentioned here that you will want to look at.

sync_binlog = num - This option tells MySQL to flush the binary log to disk after every number change. It is recommended you leave this value alone. Setting this value to something other than the default can kill your performance.

relay_log_purge = 1 - This says you want to turn purging of log files on.

expire_logs_days = 4 - This goes with the option above, saying to delete binary logs older than 4 days.

report-host = server1 - This will report the name of the server as shown in the "show slave hosts" command.

slave-skip-errors = 1062 - This will ignore "Duplicate Entry" errors. This error is very common on master to master setups and will cause your replication to break.

Extra commands
===
This shows you the status information of the binary log files on the master.
On the master:



```
mysql> show master status;
+------------+----------+--------------+------------------+
| File       | Position | Binlog_Do_DB | Binlog_Ignore_DB |
+------------+----------+--------------+------------------+
| bin.000003 |     1077 |              |                  |
+------------+----------+--------------+------------------+
1 row in set (0.00 sec)
```



*  Lists the binary logs on the server:
On the master or slave:



```
mysql> show binary logs;
+------------+-----------+
| Log_name   | File_size |
+------------+-----------+
| bin.000001 |       210 |
| bin.000002 |       870 |
| bin.000003 |      1077 |
+------------+-----------+
3 rows in set (0.00 sec)
```



*  Lists replication slaves (you must have the slave started with --report-host=slave_name, or report-host in your mraw:mysqld section of /opt/local/etc/my.cnf) for it to show the slave:
On the master or slave:



```
mysql> show slave hosts;
+-----------+--------+------+-------------------+-----------+
| Server_id | Host   | Port | Rpl_recovery_rank | Master_id |
+-----------+--------+------+-------------------+-----------+
|         2 | slave1 | 3306 |                 0 |         1 |
+-----------+--------+------+-------------------+-----------+
1 row in set (0.00 sec)
```



Help my replication is screwed
===
A common problem with replication is the binary logs get too far behind on one server or the positions get mixed up with each other. This especially happens on master to master configurations. This will show you how to sync them back up with each other depending on what configuration you have.

Master to Slave
===
To sync a slave back up with a master all that is needed is a dump of the master, import on the slave, and start the slave with the correct coordinates.

On the master dump the database without the the mysql user tables and use the --master-data=2 option which puts the binary file and coordinates at the top of the dump file:



```
# mysqldump -uroot -p --master-data=2 -A --ignore-table=mysql.user  --ignore-
table=mysql.host --ignore-table=mysql.tables_priv --ignore-table=mysql.servers --ignore-table=mysql.db > /opt/dump.sql
```


Send this file to the slave:



```
# scp /opt/dump.sql admin@x.x.x.x:/home/admin
```



Import the data on the slave:



```
# mysql -uroot -p < /home/admin/dump.sql
```



Get the binary file and coordinates from the dump file. It will be a 'CHANGE MASTER TO' statement at the top:



```
# head -30 /home/admin/dump.sql
```



On the slave reset the binary files and issue the CHANGE MASTER TO statement replacing master_user, master_password, master_host with the masters information and master_log_file, master_log_post with the binary file and coordinates you found in the dump.sql file:



```
# mysql -uroot -p
mysql> stop slave;
mysql> reset master;
mysql> reset slave;
mysql> CHANGE MASTER TO master_user = 'repuser', master_password = 'password', master_host = 'x.x.x.x', master_log_file = 'bin.xxx', master_log_pos=xxxxxx;
mysql> start slave;
```



Check to make sure everything looks good:



```
mysql> show slave status
G;
```



If it does you will see Slave_IO_Running and Slave_SQL_Running showing 'Yes'.

Master to Master
===
To clean out everything and re-sync two master servers all you need to do is flush out both servers binary logs, take a dump of one DB import it on the other (while tables are write locked), and then start the other back up.

Flushing the binary logs will not lose you anything since all the binary log holds are changes that have happened to the database.

On server1 (active):



```
mysql> reset master;
mysql> reset slave;
mysql> flush tables with read lock;
mysql> stop slave;
# mysqldump -u root -p database > db.sql
# scp db.sql root@server2:/opt
```



On server2:



```
mysql> reset master;
mysql> reset slave;
# mysql -u root -p < /opt/db.sql
# svcadm restart mysql
```



On server1:



```
mysql> unlock tables;
mysql> start slave;
```



Sync to Master script
===
This script will do all of the steps above in the master to slave case. It assumes that your my.cnf already has the proper slave configuration in place and all that needs is the dump, import, and CHANGE MASTER statement issued. This script is to be run on the slave.

You must first run this on the master mysql. This gives the slave permission to add users:



```
mysql> grant all on *.* to 'root'@'10.%.%.%' identified by 'masterpass' with grant option;
mysql> flush privileges;
```



Then edit the top of the file and change the variables. The MASTERUS, MASTERPW, SLAVEUS, and SLAVEPW are the mysql root user and passwords for each instance. The REPUS and REPPW can be anything and is the replication user and password used for communication between the two.



```
## Edit these lines below for master and slave. Use internal IPs.
##
## Master mysql
MASTERIP="x.x.x.x";
MASTERUS="root";
MASTERPW="password";
## Slave mysql (this host)
SLAVEIP="x.x.x.x";
SLAVEUS="root";
SLAVEPW="password";
## Replication user
REPUS="repuser";
REPPW="password";
##
## DO NOT EDIT BLEOW THIS LINE. Stop editing here.
```



And run the file on the slave:



```
# /opt/synctomaster.sh
====> Dumping SQL data from x.x.x.x..
====> Import SQL data from dump..
====> Adding slave user to x.x.x.x..
====> Getting binary coordinate position from x.x.x.x..
====> Stopping slave and changing master to x.x.x.x..
====> Verifiying the slave is connected to the master..
====> Looks good! We are done.
```



Script:



```
#!/usr/bin/bash
#
# This will configure the slave host to the master host
# specified, sync all data to the slave, and start replication.
# This script is to be run on the slave.
#
# REQUIREMENTS:
# 1) You must have the master host root user grant allowed from 10.2.* with grant option:
#    On the master mysql, do:
#    mysql> grant all on *.* to 'root'@'10.2.%.%' identified by 'masterpass' with grant option;
#    mysql> flush privileges;
#
# 2) The master must have the proper master configuration in place: server-id, log-bin, log-bin-index, and log-error all set
#
# 3) The slave must have the proper slave configuration in place: server-id, log-bin, log-bin-index, log-error, master-host,
#    master-info-file, master-port, master-user, master-password relay-log, relay-log-info-file, and relay-log-index all set

## Edit these lines below for master and slave. Use internal IPs.
##
## Master mysql
MASTERIP="x.x.x.x";
MASTERUS="root";
MASTERPW="password";
## Slave mysql (this host)
SLAVEIP="x.x.x.x";
SLAVEUS="root";
SLAVEPW="password";
## Replication user
REPUS="repuser";
REPPW="password";
##
## DO NOT EDIT BLEOW THIS LINE. Stop editing here.

DUMPFILE="/opt/dump.sql";
GSEDBIN="/opt/local/bin/gsed";
SVCADMBIN="/usr/sbin/svcadm";
RMBIN="/usr/bin/rm";
GREPBIN="/usr/xpg4/bin/grep";
CATBIN="/usr/bin/cat";
AWKBIN="/usr/xpg4/bin/awk";
MYSQLDUMPBIN=`which mysqldump`;
MYSQLBIN=`which mysql`;
HEADBIN="/usr/bin/head";

echo "====> Dumping SQL data from ${MASTERIP}..";
${MYSQLDUMPBIN} -u${MASTERUS} -p${MASTERPW} --host=${MASTERIP} --master-data=2 -A --ignore-table=mysql.user --ignore-table=mysql.host --ignore-table=mysql.tables_priv --ignore-table=mysql.servers --ignore-table=mysql.db > ${DUMPFILE}

echo "====> Import SQL data from dump..";
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} < ${DUMPFILE}
${RMBIN} ${DUMPFILE}

echo "====> Adding slave user to ${MASTERIP}..";
${MYSQLBIN} -u${MASTERUS} -p${MASTERPW} --host=${MASTERIP} -sN -e "grant replication slave, replication client on *.* to '${REPUS}'@'${SLAVEIP}' identified by '${REPPW}'"
${MYSQLBIN} -u${MASTERUS} -p${MASTERPW} --host=${MASTERIP} -sN -e "flush privileges"

echo "====> Getting binary coordinate position from ${MASTERIP}..";
BINFILE=`${HEADBIN} -30 ${DUMPFILE} | ${GREPBIN} MASTER_LOG_FILE | ${AWKBIN} -F
' '{ print $2 }'`;
BINPOS=`${HEADBIN} -30 ${DUMPFILE} | ${GREPBIN} MASTER_LOG_FILE | ${AWKBIN} -F= '{ print $3 }' | ${AWKBIN} -F
; '{ print $1 }'`;

echo "====> Stopping slave and changing master to ${MASTERIP}..";
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -sN -e "stop slave"
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -sN -e "reset master"
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -sN -e "reset slave"
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -sN -e "CHANGE MASTER TO master_user='${REPUS}', master_password='${REPPW}', master_host='${MASTERIP}', master_log_file='${BINFILE}', master_log_pos=${BINPOS}"
${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -sN -e "start slave"

echo "====> Verifiying the slave is connected to the master..";
SLAVEIO=`${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -s -e "show slave status
G" | ${GREPBIN} Slave_IO_Running | ${AWKBIN} '{ print $2 }'`;
SLAVESQL=`${MYSQLBIN} -u${SLAVEUS} -p${SLAVEPW} -s -e "show slave status
G" | ${GREPBIN} Slave_SQL_Running | ${AWKBIN} '{ print $2 }'`;

if [[ "${SLAVEIO}" == "Yes" ]] && [[ "${SLAVESQL}" == "Yes" ]]; then](if [[ "${SLAVEIO}" == "Yes" ] && [[ "${SLAVESQL}" == "Yes" ]]; then)
echo "====> Looks good! We are done.";
else
echo "====> ERROR: Both slave threads aren't running, check your setup and try again.";
exit;
fi

${SVCADMBIN} disable mysql
sleep 4;
${SVCADMBIN} enable mysql

echo "====> Done!";
```



Performance and Tuning
===
Caching
===
By default, SmartMachines come with our best guess MySQL memory tunings. However, this doesn't satisfy everyone as your tunings can vary depending on many things.

Tuning a MySQL database for your SmartMachine depends on two main things: How large your SmartMachine is (memory), and what engine you are going to be using (MyISAM, InnoDB). You want to be able to dedicate as much memory as possible to your database without going over the SmartMachine's memory limit. When you go over the limit your SmartMachine will start swapping and it will completely lock you out because it won't be able to allocate memory for other processes. Then you will get worse performance than before you started. So you want to give MySQL about 80% of your RAM size and leave the 20% for room to grow. This is assuming all you are running is MySQL and nothing else.

A main part of tuning MySQL is having proper cache'ing. The more MySQL can use the cache and less the disk, the better performance you will get. Tuning these settings can improve the cache and MySQL in general:

MyISAM
===
key_buffer = numM - Cache's MyISAM index data only. A good measurement to check the sum of all of your *.MYI files and then match that size. Use:



```
# gdu -sch `find /var/mysql -name *.MYI`
```



If you have available memory, then set it to more than this value. If you don't have available memory to cover this value then you should upgrade or look at other ways to help performance here.

myisam_sort_buffer_size = numM - This amount of memory is allocated when using REPAIR TABLE or when creating indexes with CREATE INDEX or ALTER TABLE. More memory will help speed these operations up. The default value on your SmartMachine is usually fine.

read_buffer_size = numM - This buffer is used when performing sequential table scans. Increasing it allows for more chunks of of the table to be read at a time which can reduce the amount of disk activity used. Be careful as this is a per-connection setting and will use this amount of memory per connection.

read_rnd_buffer_size = numM - Goes along with read_buffer_size but used for intermediate SORT's. If this value isn't set it will default to what read_buffer_size is set to. This is a per-connection setting.

sort_buffer_size = numM - Used for ORDER BY and GROUP BY operations. If you have a lot of queries sorting large sets, increasing this value can improve performance. Be careful as this is a per-connection setting and will use this amount of memory per connection.

InnoDB
===
innodb_buffer_pool_size = numM - Cache's InnoDB index and data information. A good measurement is to check the size of your innodb data file and then match that size. Use:



```
# ls -alh /var/mysql/ibdata
```



If you have available memory, then set it to more than this value. If you don't have available memory to cover this value then you should upgrade or look at other ways to help performance here.

innodb_additional_mem_pool_size = numM - Additional memory to allocate for InnoDB buffer when it runs out.

innodb_log_file_size = numM - Holds most recent transactions and gets flushed in a circular rotation. This value can really improve write performance with a higher value. InnoDB by default uses 5M which is way too small. If you have a lot of writes, start with a value of 100MB or more. If you need to change this value, you have to perform a few extra steps. Shut down mysql, rename the ib_logfile's, change the setting, and then start mysql back up:



```
# svcadm disable mysql
# mv /var/mysql/ib_logfile0 /var/mysql/ib_logfile0.bak
# mv /var/mysql/ib_logfile1 /var/mysql/ib_logfile1.bak
<edit my.cnf, change setting and save file>
# svcadm enable mysql
```



The new ib_logfile's will be created on start up.

innodb_log_buffer_size = numM - Keeps most recent changes in the buffer and flushes to innodb log files once it gets full. A higher value can help improve write performance. The maximum value is 8MB which is what we set by default on pkgsrc SmartMachines.

innodb_flush_log_at_trx_commit = 0|1|2 - Controls how the Innodb buffer gets flushed. The best setting for performance to loss of data is 2. This tells it to write the log buffer to the log file at every commit, but don't flush it. InnoDB will schedule a flush once per second. Warning: If you set this value to 1 you will most likely suffer write performance on your SmartMachine.

innodb_doublewrite = 0 - Setting this value to 0 turns off the doublewrite buffer in mysql which keeps partial writes from never happening. Because we use the ZFS file system, it does this for us so we can disable this setting. This saves us one less fsync() per write.

For any table type, pay attention to these variables
===
table_cache = num - This controls how many table opens will be cached. If your database uses many tables, this can help. If the Opened_tables from show status; starts increasing, you should increase this value.

thread_cache_size = num - This cache's threads, each thread represents a connection to MySQL. If you have a lot of connections opening and closing, this can hog up CPU. Check Threads_cached to Threads_created in the output of show status;. You need to up this variable if you have a lot created, and none cached.

query_cache_size = numM - Cache's queries. If you have a lot of SELECT's, this can be very helpful. If you have a lot of inserts and updates, this can be wasteful. The formula to check your hit ratio is:

qcache_hit_ratio = qcache_hits / (qcache_hits + qcache_inserts + qcache_not_cached)

thread_concurrency = num - Tells MySQL how many CPUs it can use. Set this to however many cores are in the system. For SmartMachines, this is set to 8 or 16.

Network
===
skip_name_resolv - Tells MySQL to not use DNS look ups on clients. This is good for security and performance since it will speed up connections and reduce DOS attacks. Be aware that using this you cannot use hostnames in user privileges but you can still use the 'localhost' value.

Using DTrace on MySQL
===
Even though there aren't DTrace probes for MySQL released yet, we can still get useful information from MySQL. DTrace has a pid provider which allows us to get into any function the program is executing and see it's arguments. The only drawback is you have to go digging around in the source code to find out what you want to see. But thanks to guys like Brendan Gregg, they have already done some of the digging for us

Even if we want to go digging around ourselves, it's really not that hard; you just have to get your feet wet. And because SmartMachines have DTrace probes enabled, you can take advantage of using DTrace on MySQL. I will show some examples of this and how easy it is to hunt down your own functions.

First let's start with functions that have already been dug up for us:



```
mysql_parse(thd, thd->query, length, & found_semicolon);
```




This is the function MySQL uses to parse a query. So all we have to do is trace this function through the pid provider and we get to see all the queries coming through. This shows arg1 as being the query, and we must copy it in to kernel land where DTrace works for it to see the string:


```
root@ferrari:~#  dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { printf("%Y      %s
n", walltimestamp, copyinstr(arg1)) }' -p `pgrep -x mysqld`
2007 Sep 27 10:04:35    select * from blah
2007 Sep 27 10:04:58    select * from tablenothere
```



Notice that this will show all queries, even if they aren't successful. Now that we can trace queries, this can give us good information. For example we can see what queries are executed the most:



```
root@ferrari:~# dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { @queries[copyinstr(arg1)] = count() }' -p `pgrep -x mysqld`](root@ferrari:~# dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { @queries[copyinstr - arg1 = count -  }' -p `pgrep -x mysqld`)
^C

select * from blah                                                5
select * from tablenothere                                        10
```


You can't get this kind of information from MySQL unless you write some kind of script to parse through the query log. If we know that there is a query being executed 1000 more times than the others, we could always try to get this one to cache. Now lets say we want to find out how long a query took to execute. The function mysql_execute_command does the actual execution of the queries so all we do here is subtract the entry and return timestamps of this function. The script shown below uses this:



```
root@ferrari:~# ./exactquerytimes.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

Query: SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like'%GOOGLE%' and upper(vs_browser) not like'%GOOGLE BOT%' and upper(vs_browser) not like'%BOT%' and upper(vs_browser) not like'%MSN%' and upper(vs_browser) not like'%MSNBOT%' and upper(,

Time: 2.32
```



On the MySQL side, it showed this query being executed at 2.32 seconds as well:



```
1 row in set (2.32 sec).
```



This is awesome information because as of now MySQL doesn't allow you to see a slow query that is less than 1 second (I believe this is a fix in MySQL 5.1). So with this, we can see not just slow queries, but all queries and how long they take to execute with their times.

Now let's try this same query but I bumped my query_cache_size up to 50M:

The first try (won't hit the cache):



```
root@ferrari:~# ./exactquerytimes.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

Query: SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like'%GOOGLE%' and upper(vs_browser) not like'%GOOGLE BOT%' and upper(vs_browser) not like'%BOT%' and upper(vs_browser) not like'%MSN%' and upper(vs_browser) not like'%MSNBOT%' and upper(,

Time: 2.28
```



And the second try hits the cache but doesn't show anything through DTrace. So this means a query that is served from the cache won't show up in mysql_parse. Right now this probably doesn't mean much, but as you learn more about how the internals of MySQL work, then troubleshooting becomes much easier down the road.

So far this has all been information that was provided. Now I will show how simple it is search through MySQL's source and look at functions.

First we need to decide what to look for. Let's say we want to find out every time that slow query is written to the slow query log. First we download the MySQL source code from http://www.mysql.com. Now we can search through the source code for 'slow query':

root@ferrari:/export/home/derek/mysql-5.0.45# ggrep -ri 'slow query' *
This turns up only a few source code files, one of them looking most obvious called log.cc with the expression "Write to the query log". The MySQL code is very well commented so it makes searching really easy. Looking in this file, that comment is right above the function:



```
/*
Write to the slow query log.
*  /
bool MYSQL_LOG::write(THD *thd,const char *query, uint query_length,time_t query_start_arg)
```



It's obvious that this function is the function that writes to the slow query log. Running this script below, looking for function LOG while a slow query is being inserted shows this function being executed with some weird characters around it:



```
root@ferrari:~# dtrace -F -n 'pid$1:mysqld:*LOG*:entry {} pid$1:mysqld:*LOG*:return {}' `pgrep -x mysqld`
dtrace: description'pid$1:mysqld:*LOG*:entry ' matched 126 probes
CPU FUNCTION
0  -> _ZN9MYSQL_LOG5writeEP3THD19enum_server_commandPKcz
0  -> _ZN9MYSQL_LOG5writeEP3THDPKcjl
0  < - _ZN9MYSQL_LOG5writeEP3THDPKcjl
```



The only thing bad about tracing MySQL through the pid provider is that these weird characters change between MySQL versions, so we can't always trace for '_ZN9MYSQL_LOG5writeEP3THDPKcjl' if we want it to work on other machines. We have to trace for MYSQ*LOG*write which slowquerycounts.d uses:



```
root@ferrari:~# ./slowquerycounts.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like'%GOOGLE%' and upper(vs_browser) not like'%GOOGLE BOT%' and upper(vs_browser) not like'%BOT%' and upper(vs_browser) not like'%MSN%' and upper(vs_browser) not like'%MSNBOT%' and upper(

3
```



As you can see DTrace can be very powerful even if we don't have probes released yet, we just have to do a little extra work. Some of the information shown can be obtained from MySQL, but using DTrace still provides a benefit because we don't have to enable anything in the MySQL configuration, possibly making us restart the server. I'm providing these scripts in the MySQLDTraceKit.tar.gz
Hopefully in the near future we will have real MySQL probes.

Repairing a MySQL database
===
To repair a corrupted MySQL (MyISAM) table, do following

*  Sign in to Virtualmin
*  Select a database from the drop down menu on the left. A list of tables in that database will appear directly below the drop down menu.
*  In the main content area, select the check box next to the table you want to repair
*  In the With Selected drop down bellow, select Repair Table . You should now see a SQL-query message telling you that the status of the table is OK
*  At the top of the main content area, click the STRUCTURE tab
*  Select the same table again but this time select Optimize Table from the With Selected drop down. You should now see a SQL-query message telling you that the status of the table is OK.
Your MySQL table should now be repaired.

Backing up a MySQL database
===
To backup a MySQL database, do the following.

Using Virtualmin
===
*  Sign in to Virtualmin.
*  Select a domain from the drop-down in the left-hand navigation (your main domain should be already selected when you first login to Virtualmin).
*  Click Edit Databases. You should now see a list of your current databases on the Edit Databases page.
*  Select the MySQL database you want to back up from the left-hand column under Database name and click Manage...
*  Click Backup Database. You should now see the Backup Database page.
*  For Backup to file, enter a location on your account where you want the data base to be saved and a suitable filename (e.g., /users/home/yourusername/dbbackup). Clicking ... will allow you to browse to a suitable location on your account.
*  Select whether you want all tables to be saved, or just a few specific ones. If you want to back up everything, then just leave All tables selected
*  For Add drop table statements to backup?, leave it as No unless you need a drop table statment
*  Leave Character set for backup as the default
*  Leave Backup compatability format as the default
*  And for Compression format decide whether you want to compress your backup to save space.
*  Now, click Backup Now. You should now see a page confirming a successful backup and your database should be saved in your desired location
And that's it, you've just made a backup of your MySQL database!

Using the Shell
===
*  cd to the directory where you wish to store the data.
*  Enter:


```
mysqldump --compress --user=USERNAME -p --opt --lock-tables=false --skip-add-locks --skip-extended-insert DATABASE > DATABASE.sql
```





```
Replace the values in CAPS with the specific values for your account. You can also change the character set, if you wish. The file can be compressed for faster transfer with:

gzip DATABASE.sql
```



Restoring up a MySQL database
===
To restore/import a MySQL database, do the following.

Using Virtualmin
===
*  Sign in to Virtualmin.
*  Select a domain from the drop-down in the left-hand navigation (your main domain should be already selected when you first login to Virtualmin).
*  Click Edit Databases. You should now see a list of your current databases on the Edit Databases page.
*  Select the MySQL database you want to back up from the left-hand column under Database name and click Manage...
*  Click Execute SQL. You should now see the Execute SQL page.
*  Near the bottom of the page either enter a location on your account where you want the data base to be restored from for From local file (clicking ... will allow you to browse and select the file) or select From uploaded file and click Choose File to select a file from your local machine.
*  For File format, leave it as Tab separated
*  Now, click Execute. You should now see the Import Data page confirming a successful restoration and your MySQL database.
And that's it, you've just restored your MySQL database!

Using the Shell
===
*  cd to the directory where your sql data is stored.
*  Enter:


```
mysql --user=USERNAME --password=PASSWORD DATABASE < DATABASE.sql
```





```
If you have the file gzip'ed, gunzip it first, or change the command above to:

zcat DATABASE.sql.gz | mysql --user=USERNAME --password=PASSWORD DATABASE
```








----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
