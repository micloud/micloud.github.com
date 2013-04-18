If you're using Capistrano or some other deployment utility, you should create a user account that has the proper rights and roles to deploy your application.

This user is called the "deploy user".
In this page:

Before You Begin
===

This topic assumes that you are deploying multiple applications on a SmartMachine and that your applications live on your SmartMachine like this:



```
/home/www.example.com/
/home/www.example2.com/
```



You should have copies of the public SSH keys for each developer in your project who can deploy the application.

Creating the Deploy User
===

```
You can use the default user, jill, as the deploy user if you're deploying only a single application on your SmartMachine.
```

*  In Virtualmin, create a new user named deploy.
*  Log in to your SmartMachine and run the following command to grant deploy role-based rights to use svcadm, svccfg, and other SMF commands:

```
usermod -P "Service Management" deploy
```

*  Add each developer's SSH public key to /home/deploy/.ssh/authorized_keys
Examples
===

This section contains examples for different deployment systems.

Capistrano
===
To deploy new code have your developers SSH in and run these commands:

```
set :user, "deploy"
set :runner, "deploy"

task :restart_web_server, :roles => :web do
run "svcadm restart http"
end
```




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
