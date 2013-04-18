The best way to reboot your SmartMachine is in a way that gracefully shuts down all of your major servers (especially databases).

It is highly reccomend that on production servers you use this shutdown / reboot method from the command line:

*  SSH into your SmartMachine as admin.
*  Use this commnd to gracefully reboot your SmartMachine:


```
sudo shutdown -y -i6 -g0
```




```
You will have to give the admin user's password.
```



For development and testing systems you can also shut down or reboot your machine by using the Reboot or Shutdown buttons in my.joyentcloud.com:
<img src='images/Rebooting+or+Shutting+Down+a+SmartMachine-myjoyent+-1.png' width='650' align='left'/>




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
