The title of the page serves as the heading to this section. It describes the problem that this page is solving.

In this page:


What is the difference between an Accelerator and a SmartMachine?
===
SmartMachine and Accelerator are both names used to describe the same thing – a zone running on Joyent SmartOS. Accelerator was the name used prior to May 2010.

What is my SmartMachine name?
===
Your SmartMachine name is the default name associated with your SmartMachine when delivered. It looks like: z12345AA, z12345AB, or fjsliyaa, fjsliyab. To find the name of your SmartMachine use this command:



```
zonename
```



How can I find my SmartMachine public or private IP?
===
The public and private IP of your SmartMachine is in the welcome e-mail. Or you can find your public or private IP by using the command:



```
ifconfig -a
```



The private IP will be the 10.* equivalent of your public IP.
Where can I get a SmartMachine image to use on my local computer?
===
Currently we do not have a publicly available SmarthMachine image. However, the SmartMachine is a pretty simple setup. We run Solaris Express Community Release and Pkgsrc.

You can get the Solaris Express Community Release image at: http://opensolaris.org/os/downloads/sol_ex_dvd_1/
See this list for our pkgsrc repository: http://wiki.joyent.com/accelerators:kb:pkgsrc:updating
How do I reset my SmartMachine to a clean image?
===
If you signed up for your SmartMachine through the MyJoyent control panel, delete the SmartMachine from your account and order a new SmartMachine as its replacement.

If you signed up for a SmartMachine another way, submit a ticket that you would like to wipe your SmartMachine clean and start fresh. Be sure you have everything backed up because we will wipe everything.

I can't reach Webmin. https://x.x.x.x:10000/ is not working?
===
If Webmin is failing to load, you have one of two problems: The process is hung, or you are hitting your memory limit.

First, verify that you aren't hitting your memory limit. Log in to your SmartMachine, and use the prstat -Z command and look at the RSS column in the summary. If this value is near the size of your SmartMachine, shut down some services to free memory.

If this isn't the problem, restart the Webmin process:



```
sudo svcadm disable webmin
sudo svcadm enable webmin
```



My Path is not working ... shebang issues with /usr/bin/env
===
Truth be told, /usr/bin/env is just fine. The problem is really that env was not originally intended as an all-cure to resolving binary paths automagically, and it will fail if it can't find, for example, ruby in its path. And the default system PATH does not include paths for the pkgsrc layer installed by us (/opt/local), which is best dealt with in interactive login profiles (for example, the root .profile).

To find out the set path for your processes, do this:


```
Chances are you will see it run with a limited PATH.
```


For example, looking for munin-node's process:



```
[root@abcdefg ~]# pargs -e `pgrep -f munin-node`](grep PATH)
envp[34]: PATH=/usr/sbin:/usr/bin](envp[34: PATH=/usr/sbin:/usr/bin)
```



This is normally not a problem in your login shells, because those pull the full env from /root/.profile. However, this is a problem with, for example, SMF or Cron, because those run with a limited environment by default. So you want to do one of the following:

*  Always use full paths in scripts' shebangs.
*  Modify the system profile to include full PATH.
*  Change your SMF profile to set the right PATH.
The first option can get tedious especially with 3rd party scripts, and the second option is not recommended, so the third option is the best option. We do recommend that you always set PATH in SMF profiles.

Here is an example for mongrel setting the path:



```
<?xml version='1.0'?>
<!DOCTYPE service_bundle SYSTEM '/usr/share/lib/xml/dtd/service_bundle.dtd.1'>
<service_bundle type='manifest' name='mongrel/YOURAPP-production'>
<service name='network/mongrel/YOURAPP-production' type='service' version='0'>
<create_default_instance enabled='true'/>
<single_instance/>
<dependency name='fs' grouping='require_all' restart_on='none' type='service'>
<service_fmri value='svc:/system/filesystem/local'/>
</dependency>
<dependency name='net' grouping='require_all' restart_on='none' type='service'>
<service_fmri value='svc:/network/loopback'/>
</dependency>
<dependent name='mongrel_multi-user' restart_on='none' grouping='optional_all'>
<service_fmri value='svc:/milestone/multi-user'/>
</dependent>
<exec_method name='start' type='method' exec='/opt/csw/bin/mongrel_rails cluster::start' timeout_seconds='60'>
<method_context working_directory='/HOME/YOUR/PATH/TO/RAILS/APP'>
<method_credential user='USER' group='GROUP' />
<method_environment>
<envvar name="PATH" value="/usr/bin:/bin:/opt/csw/bin" />
</method_environment>
</method_context>
</exec_method>
<exec_method name='stop' type='method' exec=':kill' timeout_seconds='60'>
<method_context/>
</exec_method>
</service>
</service_bundle>
```



Cron not running script
===
What is most likely happening here is one of two things:

*  path issue - cron runs under a different environment and it is best to use full paths to all programs in the script that is getting called.
For example if you are backing up MySQL with mysqldump, you need to call that program with:



```
/opt/local/bin/mysqldump
```



*  permissions issue - make sure that the script is executable and the cron credentials you are using has the correct permissions. This includes:
*  *execute all programs in the script
*  *write to the directory (if backing up)
*  *access the database (if accessing a database)
Apache is in maintenance
===
Log rotation is set to happen at 0030 GMT. If you see that Apache has gone into maintenance at this time, then use the following instructions to change the method of log rotation.

Fix Virtualmin settings
===
*  Log into Virtualmin
*  Follow this path (starting in the left pane):
*  *If you never upgraded Virtualmin: System Settings > Module Config > Log File Rotation
*  *If you upgraded Virtualmin and are runnign a fairly new version: System Settings > Server Templates > Default Settings > Log File Rotation
*  Change the Directives field to just # postrotate and click Save.
*  In the left pane, click Webmin on top
*  Go to: System > Log File Rotation > Edit Global Options
*  Change the Truncate log file in place option to Yes and click Save.



```
Joyent provides Virtualmin as a third party opensource solution to help you manage your SmartMachine, but we are not responsible for the actual project. As such, we will make a best effort to solve your issue, however you may need to turn to the Virtualmin Support community for help with various Virtualmin features.
```



Fix existing domains
===
Check /opt/local/etc/logrotate.conf and if any config blocks resemble the following:



```
/path/to/log/file {
some commands here
}
```



Remove the contents of the curly brackets. For example:



```
/path/log/file {
}
```



Apache restarts at 0310
===
Verify your settings are correct.

*  Open /etc/logadm.conf
*  Look for this:


```
apache
-C 7
-a '/usr/sbin/svcadm restart apache'
-p 1d /var/log/httpd/*.log
```



*  Change it to this:


```
apache
-C 5
-c
-s 100m /var/log/httpd/*.log
```



Add more SmartMachines to an existing account
===
You can add more SmartMachines directly in my.joyent.com. These machines are created without respect to any existing infrastructure you may have. If you have special requirements to ensure that your SmartMachine are set up to work well with your existing architecture you can contact Joyent Support at support@joyent.com with your request.

inetd service is in maintenance
===
Looking at svcs -vx you see that inetd is in maintenance. Looking at the service log file you see these kinds of messages:



```
[ Jul 14 18:46:00 Executing start method ("/usr/lib/inet/inetd start"). ]]([ Jul 14 18:46:00 Executing start method  - "/usr/lib/inet/inetd start". )
[ Jul 14 18:46:00 Method "start" exited with status 0. ]]([ Jul 14 18:46:00 Method "start" exited with status 0. )
[ Jul 14 18:46:01 Stopping because process dumped core. ]]([ Jul 14 18:46:01 Stopping because process dumped core. )
[ Jul 14 18:46:01 Executing stop method ("/usr/lib/inet/inetd stop"). ]]([ Jul 14 18:46:01 Executing stop method  - "/usr/lib/inet/inetd stop". )
[ Jul 14 18:46:01 Method "stop" exited with status 0. ]]([ Jul 14 18:46:01 Method "stop" exited with status 0. )
[ Jul 14 18:46:01 Restarting too quickly, changing state to maintenance. ]]([ Jul 14 18:46:01 Restarting too quickly, changing state to maintenance. )
[ Jul 14 18:47:48 Leaving maintenance because disable requested. ]]([ Jul 14 18:47:48 Leaving maintenance because disable requested. )
```



*  Try to clear the service to see what happens:


```
svcadm clear inetd
```



You then check with svcs -p inetd that it went back into maintenance.
*  Then look at the output of dmesg. You see a message like this:


```
Jul 15 00:34:34 SOMETHING.joyent.us inetd[12202]: [ID 702911 daemon.error] Property 'connection_backlog' of instance svc:/network/ftp/tcp:default is missing, inconsistent or invalid](Jul 15 00:34:34 SOMETHING.joyent.us inetd[12202: [ID 702911 daemon.error] Property 'connection-backlog' of instance svc:/network/ftp/tcp:default is missing, inconsistent or invalid)
```



*  Then export that SMF file via


```
svccfg export ftp/tcp > ftp.xml
```



*  Add where the rest of the propval lines are for inetd the line


```
<propval name='connection_backlog' type='integer' value='10'/>
```



*  import the SMF file


```
svccfg import ftp.xml
```



*  clear the inetd service


```
svcadm clear inetd
```



*  check that it indeed came online:


```
svcs -p inetd
```



*  check that the dependent service is also online:


```
svcs -p ftp/tcp
```



Unable to ssh/sftp due to encryption issues
===
In Ruby you will see something like this:



```
Net::SSH::Exception: could not settle on encryption_client algorithm
```



Or when trying to access through ssh from another application you may also see a cipher error – it means you need to add the cbc encryption types.

To add the cbc types of encryption do the following:

*  First change to root by entering the following from the command line:


```
su -
```



*  The system will prompt you for a password. Enter the password that is indicated in your welcome email for Root User Access
*  Run the following command:


```
echo "Ciphers aes128-ctr,aes192-ctr,aes256-ctr,arcfour128,arcfour256,arcfour,blowfish-cbc" >> /etc/ssh/sshd_config
```



*  Restart ssh for the changes to take effect:


```
sudo svcadm restart ssh
```



And that's it, you should now be able to access through ssh or SFTP.

Updating RMagick-2.11.1 to RMagick-2.11.1nb1
===
If you are experiencing issues with RMagick, you may need to update it. You can easily update it through pkgsrc by doing the following:



```
pkgin update
pkgin -y install ruby18-RMagick
```



You should be seeing 'ruby18-RMagick-2.11.1nb1' instead of just 'ruby18-RMagick-2.11.1'

disk usage (du) numbers not adding up
===
At times when you run du and compare it with the output of df the numbers will not add up.

This is most like caused by a file handle open to a file that has been deleted.

The command du won't count the file as existing, even though the filesystem still has that data allocated to a file.

When the process that's holding the filehandle open exits (this could be a database, or apache, or really any other daemon) the space consumption should go away and your filesystem usage should report correctly again.

The most typical thing that I've seen cause this is a log rotation that happens and nukes a log without properly HUP'ing the daemon.

Finding large files filling up disk
===

```
There is a free monitoring service at NodeFly.com that you can use to monitor your disk usage and alert you before you run out of disk space.  The service is very easy to use... and free
```

You can find what files and directories are filling up your disk in one of two ways:

Run the du command as root:



```
cd /
du -sh *
```



and follow the trail

The other way you can do this is with the command:



```
find / -size +200000 -type f -ls | sort -k 7,7 -n
```



You can increase or decrease the size (+200000 in the above example) depending on the length of your list.


```
At times SmartOS will report discrepancies in the amount of disk space used from the output of du compared to the output of df. The du command counts file by file and thereby counts the total space on the filesystem. The df command differs from this in that it directly calls the filesystem and queries the current disk space used. Further details available at: http://sunsolarisadmin.blogspot.com/2007/03/du-and-df-show-different-values-for.html
```





----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
