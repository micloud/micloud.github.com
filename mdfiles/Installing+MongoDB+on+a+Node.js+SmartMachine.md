This page shows you how to install MongoDB on your Node.js™ SmartMachine.

In this page:



In the interest of conserving your no.de's RAM and CPU, if you're looking for a good hosted MongoDB instance during the 48-hour NodeKnockout Competition, we recommend checking out the free offering from MongoHQ

Using an Installation Script
===

The easiest way to install MongoDB on your Node.js SmartMachine is to use this installation script .

First, log into your no.de smartmachine as "admin", by running



```
ssh admin@yourmachine.no.de
```



then become root with:



```
sudo bash
```



... you'll follow that "become root" process when you need to run the mongo shell, or perform other maintenance work, too.

then:



```
$ curl -O http://wiki.joyent.com/download/attachments/1639170/mongodbnode.sh
$ bash mongodbnode.sh 1.8.1
```



The installation script

*  downloads MongoDB and the additional library needed
*  unpacks the tar files
*  creates the directories ~/local/bin, ~/local/lib, ~/local/var/mongodb if they don't already exist
*  moves the files to the appropriate directories
*  creates an SMF manifest for the MongoDB service
To start MongoDB, and to ensure that it restarts when your machine reboots, run these commands:



```
source ~/.bashrc
pfexec svcadm enable mongodb
```



Installing Manually
===

Follow these instructions to install MongoDB 1.8.1 on your Node.js SmartMachine.



```
$ curl -O http://fastdl.mongodb.org/sunos5/mongodb-sunos5-x86_64-1.8.1.tgz
$ tar -xvzf mongodb-sunos5-x86_64-1.8.1.tgz
$ rm mongodb-sunos5-x86_64-1.8.1.tgz
$ mv mongodb-sunos5-x86_64-1.8.1 mongo

$ cd mongo

$ # get extra libraries we need (else you will get a libstdc++.so.6 dependency issue)
$ curl -O http://downloads.mongodb.org.s3.amazonaws.com/sunos5/mongo-extra-64.tgz
$ tar -xvzf mongo-extra-64.tgz
$ rm mongo-extra-64.tgz

$ # just as an example - you will really probably want to put these somewhere better:
$ export LD_LIBRARY_PATH=/home/node/mongo/mongo-extra-64
$ bin/mongod --help

# run mongo in a writable directory, replying only to localhost
$ mkdir db
$ bin/mongod --bind_ip=127.0.0.1 --journal --dbpath /home/node/mongo/db
```



Note that running MongoDB this way will not restart if your Node.js SmartMachine is rebooted. You may want to create an SMF manifest for it and use SMF to make sure it runs when your machine restarts. You can use the SMF manifest from the installation script .



----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
