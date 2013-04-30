If you have an older Node.js™ SmartMachine, you may not be running the latest pkgsrc repository. This page shows you how to update your Node.js SmartMachine to the 2010Q4 repository.

In this page:



Update to Pkgsrc 2010Q4
===

1.Log in to your Node.js Smart Machine using the admin username:


```
$ ssh admin@mymachine.no.de
```



```
If you cannot log in as admin, stop now and contact support .
```


2.Verify the version of pkgsrc you are currently using:


```
$ pkgin up
database for http://pkgsrc.joyent.com/2010Q2/All/ is up-to-date
```



If you are using version http://pkgsrc.joyent.com/sdc/2010Q4/gcc45, you are up to date and don't need to upgrade.
3.Run the no.de.2010Q4.sh shell script attached to this page. The easiest way is like this:


```
$ curl -L http://wiki.joyent.com/download/attachments/1639244/no.de.2010Q4.sh | sudo bash
```




The output will look like this:


```
Recording packages installed before the update
Backing up existing software base
Moving existing software base away
Downloading new software bootstrap image
Configuring package tools
Re-installing base packages
Updating OpenSSL certificate database
Removing deprecated system files
Updating tool configuration
Re-installing missing packages
(gcc34 gmake gmp libffi mpfr mysql-client mysql-server python26 redis scmgit scmgit-docs tcp_wrappers zip)

*   * *
Your software was upgraded using packages from:

http://pkgsrc.joyent.com/sdc/2010Q4/gcc45

A backup of '/opt/local' was archived as:

/var/tmp/pkgsrc-backup-20110505-041037.tgz

Feel free to remove that file if you don't need it anymore.
Latest versions of all your previously installed packages
have been installed. You can run 'pkgin ls' for a full
listing of installed packages.

*   * *
You had the gcc44 package installed. This is no longer provided
in this package set. Please install the 'gcc-compiler' package
instead which provides an optimized GCC 4.5.2 compiler suite.
```




4.Be sure to log out of the admin account and back into the node account before you install new packages.
Verify the Update
===

1.Log out of the admin account.
2.Log in to the node account:


```
$ ssh node@mymachine.no.de
```



3.Run the pkgin up command. The output should look like this:


```
$ pkgin up
database for http://pkgsrc.joyent.com/sdc/2010Q4/gcc45/All is up-to-date
```





----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
