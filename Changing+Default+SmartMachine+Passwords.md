


There are a few default passwords that should be changed when you first get your SmartMachine. This is how to change them via the command line.

If you intend to use Virtualmin to manage hosting for your SmartMachine, it's advisable to use the Virtualmin controls for password changing, so that Virtualmin knows the passwords for your users and can use them as it goes. Otherwise you may get into a situation where a single user has a different password for system login, and for MySQL or SVN. This applies to users created through Virtualmin (i.e. not 'root' and 'admin').

Please note, once you change any passwords, those will not update your machine credentials in your my.joyentcloud.com portal.

```
You should change passwords on older cloud SmartMachines.
If you use my.joyentcloud.com for your SmartMachines the admin and root system accounts are secured with their system passwords locked.
You can use this process to set the system passwords if you need to on a new Joyent cloud SmartMachine.
```

Admin User
===
Log in to your SmartMachine over ssh.
Run this command:

```passwd```

You will need to enter your current password (supplied by Joyent) and your new password.
Root User
First log in as the admin user
Run this command:
sudo passwd root
You will not be prompted for the current password, but asked to enter in your new one.
MySQL Root User
===
1.Log in to MySQL:

```mysql
-u root
-p```

2.You'll be prompted for your MySQL password, supplied by Joyent. Once at the MySQL prompt, run this command:

```SET PASSWORD FOR root@localhost=PASSWORD('yournewpassword');```

MySQL should return something like this

```Query OK, 0 rows affected (0.05 sec)```

You can then type quit to exit the command line MySQL interface.

```After exiting the MySQL command line interface, you should edit your .mysql_history file to remove the entry that shows your password.```

<note error>
If you use webmin you also need to update the password there as well either via the webmin interface or editing /etc/webmin/mysql/config</note>

Webmin User
===
Run this command:


```sudo /opt/webmin-1.380/changepass.pl /etc/webmin admin yournewpassword```

And that should allow you to change the password from the command line.

```
The path to changepass.pl may change as the version of webmin increases. In the example above its version 1.380.
After logging out and back in, you should edit your .bash_history file to remove the entry that shows your password.
```

There is also probably a way to change the password from within webmin.

From within Webmin
===
*  After logging in, click on the "Webmin" link at the top, next to Virtualmin,
*  Then click on the +Webmin link to open the Webmin options.
*  From there click on Webmin Users to view your list of users
*  Click on Admin and you can change the password.
Updating Webmin modules configuration
===
If you changed the password of MySQL or PostgreSQL, and you care of any Webmin or Virtualmin functionality, you'll need to update both modules configuration in Webmin so that it has access. Just login to Webmin, switch your view to the Webmin pane, click MySQL or PostgreSQL and follow the 'Module Config' option on the top for a form that will let you enter the new root password for the service.



----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
