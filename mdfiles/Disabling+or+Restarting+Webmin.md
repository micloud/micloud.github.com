關閉或重啓Webmin
===
At times it may be necessary to disable the administration web server of your SmartMachine (aka. Virtualmin or Webmin).  The following is how you disable and restart this service using SMF.

In this page:


##Disable Webmin


SSH into your SmartMachine, then switch to the root user and run:


```
svcadm disable webmin
```




##Restart Webmin


If a service crashes that is maintained by SMF it will be placed into a 'maintenance mode'.  The following process is how to restart a service that has been disabled or that is in maintenance mode:

##Check to see if service is in Maintenance Mode

If a service is in maintenance mode it has cashed and is usually inductive of an error with the service or your SmartMachine is running out of RAM or Disk.

To check that a service is in maintenance mode:


```
svcs -a
```


If the service is in maintenance mode you will see something similar to this:

maintenence 18:50:25 svc:/network/webmin:webmin

You should review the log and check for a core file to derive root cause of why the service was in maintenance mode.

To bring a service out of maintenance mode run the following as root:


```
svcadm clear service_name
```


##Verify service is disabled

To verify a service is disabled run this command:

```
svcs -a
```

If the service is disabled you will see something similar to this:

disabled 18:51:10 svc:/network/webmin:webmin

##Enable service

To start a service run this command as root:

```
svcadm enable service_name
```

Then verify the service is running with:

```
svcs -a | grep service_name
```

You should see something similar to this:

online 18:50:25 svc:/network/webmin:webmin

"online" state indicates that the service is back and running.



----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
