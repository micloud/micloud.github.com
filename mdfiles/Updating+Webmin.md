In this page:

Webmin / Virtualmin
===

Webmin is the web-based configuration tool provided by default with SmartMachines. It runs as its own process, and includes its own web server.

After customizing your SmartMachines, you may find that you eventually need to upgrade the Webmin / Virtualmin software. Alternatively, you may also decide that you prefer to monitor and configure your system exclusively with an SSH session.

Upgrading
===
Preflight
===
Get to the Upgrade Webmin area

*  Log into your smartmachine https://1.2.3.4:10000/ as %%admin%%
*  From the left-hand navigation bar select %%Webmin%%
*  From the left-hand navigation bar select %%Webmin%% below %%Login: admin%%
*  Select %%Webmin Configuration%%
*  From the right-hand tab select %%Upgrade Webmin%%. You'll now see the "Upgrade Webmin" page.
Find out what is out of date
===
You will be presented with a list of items which require updating and what has changed.

*  Select the %%Update modules%% tab
*  Select %%Only show which modules would be updated%% checkbox
*  Select %%Update Modules%%
You then can uncheck the show and actually perform the updates.

```
Virtualmin is considered a non-core module. Ensure you check the Update non-core modules as well option to include Virtualmin in any updates.
```

Setting automatic update schedule
===
*  Select the %%Scheduled update%% tab
*  Check the %%Scheduled updating currently enabled%% box
*  Set your desired schedule
Upgrading Webmin
===
*  From the %%Upgrade Webmin%% tab
*  Chose from where you wish to upgrade from, typically that would be %%Latest version from www.webmin.com%%
*  Unless you know what you are doing, check the %%Don't re-install deleted or new modules?%% option
*  Select the %%Upgrade Webmin%% buttton

```
Before Webmin 1.490 was released, Sourceforge.net (which the Webmin developers use to host their project files) changed the URL scheme, effectively breaking Webmin upgrades from versions earlier than 1.490. To work around, in step *2 above, instead of pulling from the www.webmin.com website, choose the %%From ftp or http URL%% option and enter this long URL (the latest Webmin 1.500):
%%http://prdownloads.sourceforge.net/webadmin/webmin-1.500.tar.gz%%
Further upgrades will work as outlined above.
```

Removing
===
You may decide that you do not want to use Webmin at all and wish to manage your SmartMachine solely using SSH.

If you want to remove Webmin completely, open a new SSH session.

*  Change to root: sudo su -
*  Disable the Webmin service:


```
svcadm disable svc:/application/webmin:default
```



or


```
svcadm disable svc:/network/webmin:webmin
```



*  Then execute the Webmin uninstall script:


```
sudo /etc/webmin/uninstall.sh
```



*  Finally, remove the Webmin manifest:


```
svccfg delete svc:/application/webmin:default
```



or


```
svccfg delete svc:/network/webmin:webmin
```



Changing webmin passwords
===
If you forget your webmin password, run the command below. You may have to change the path based on your webmin version. "admin" is the webmin "root" user.



```
sudo /opt/webmin-1.340/changepass.pl /etc/webmin admin new_password
```



Restarting
===
If Webmin becomes unresponsive or unreachable, you can restart it from an ssh session.

*  **Login as an administrative user. ssh admin@1.2.3.4
*  **Check Webmin's current state: sudo svcs -p webmin
*  *If shown as "running" then:
*  Restart Webmin: sudo svcadm restart webmin
*  *If shown as "disabled" then:
*  Start Webmin: sudo svcadm enable webmin
*  *If shown as "maintenance":
*  Clear Webmin: sudo svcadm clear webmin
*  **Make sure Webmin is not in maintenance: svcs -x
*  **If Webmin is listed as being in maintenance, run:


```
sudo svcadm clear webmin
```



Webmin (approximate) system requirements
===
*  80 RSS
*  100 Swap
Check on what's available by ssh'ing in and


```
prstat -Z -n 10 -s rss
```


Kill processes as necessary to free up the required minimum resources. Occassionally Apache (called httpd in the 'Process' column of the prstat listing) will consume very large amounts of memory.

Webmin really won't startup
===
If your system has the available resources (you can confirm this by running the command described in the section 'Webmin (approximate) system requirements') and Webmin still refuses to startup, then you may need to restart your server. Follow the steps described in the section 'Restarting'.


```
sudo reboot
```



Where are webmin's log files
===
You'll find them here:



```
sudo ls /var/webmin/
sudo cat /var/webmin/miniserv.error
```







----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
