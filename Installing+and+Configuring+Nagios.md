This page shows you how to install and configure the Nagios monitoring tool on your SmartMachine.

In this page:

Installation
===

Nagios is available as a prebuilt package in the Joyent pkgsrc repository. To install it, follow these steps.

*  Make sure that your pkgin database is up to date. The pkgin tool makes it easier to manage packges.


```
$ pkgin update
database for http://pkgsrc.joyent.com/2010Q2/All is up-to-date
```



*  Determine which packages are available for your SmartMachine.


```
$ pkgin search nagios
nagios-base-3.2.0nb2  Network monitor
nagios-imagepak-base-20030219  Additioannal icons for nagios
nagios-nrpe-2.12nb1  Nagios remote program execution daemon
nagios-nsca-2.6nb1   Remote/passive network service for nagios
nagios-plugin-ldap-1.4.14nb1  Nagios ldap plugin
nagios-plugin-mysql-1.4.14nb1  Nagios mysql plugin
nagios-plugin-pgsql-1.4.14nb2  Nagios pgsql plugin
nagios-plugin-snmp-1.4.14nb1  Nagios snmp plugins
nagios-plugins-1.4.14nb1  Nagios plugins
```



*  Install the Nagios packages. Note that the package names may change.


```
$ sudo pkgin install nagios-base-3.2.0nb2 nagios-imagepak-base-20030219 nagios-nrpe-2.12nb1 nagios-plugins-1.4.14nb1
```



Configuration
===

Use your favorite text editor to edit the following configuration files. You need to be logged in as root or use sudo to edit these files.

*  Edit /opt/local/etc/httpd/httpd.conf and append the following:


```
Append to /opt/local/etc/httpd/httpd.conf
Include /opt/local/etc/nagios/nagios.conf
```



*  Comment out SuexecUserGroup from your virtual host file. If you're using the default user, this will be /opt/local/etc/httpd/virtualhosts/jill.conf.


```
Comment out the following line
# SuexecUserGroup "#1000" "#1000"
```



*  Create the Nagios password file.


```
$ htpasswd -c ~jill/nagiosauth nagiosadmin
```



*  Create the /opt/local/share/nagios/.htaccess file in with your favorite text editor. You will need to be logged in as root or use sudo to save this file.


```
Create /opt/local/share/nagios/.htaccess with the following contents:
AuthType Basic
AuthName "Password Required"
AuthUserFile /home/jill/nagiosauth
Require valid-user
```



*  Copy the .htaccess to Nagios cgi-bin directory.


```
$ sudo cp /opt/local/share/nagios/.htaccess /opt/local/libexec/nagios/cgi-bin
```



*  Create Nagios /var/spool/nagios/spool/checkresults directory.


```
$ sudo mkdir -p /var/spool/nagios/spool/checkresults
$ sudo chown -R nagios /var/spool/nagios
```



Verify Installation
===

Once everything is in place, verify the installation and restart Apache.

*  Verify Nagios agent configuration


```
$ sudo /opt/local/bin/nagios -v /opt/local/etc/nagios/nagios.cfg
```



You should see Things look okay - No serious problems were detected during the pre-flight check.
*  Start Nagios


```
$ sudo /opt/local/bin/nagios -d /opt/local/etc/nagios/nagios.cfg
```



*  Restart Apache.


```
$ sudo svcadm restart svc:/network/http:apache
```



You should be able to access your Nagios web page at http://_yourservername_/nagios/.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
