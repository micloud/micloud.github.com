Your Node.js™ SmartMachine uses two ways to determine the version of Node.js you use.

One mechanism controls the version of Node.js used in your login environment as when you SSH into your Node.js SmartMachine and use npm to install packages.

The other controls the version that's used when you push a new version of your application and your application runs.

In most cases you will want both mechanisms to point to the same version of Node.js. But in some situations, you may want to ensure that your application runs with a specific version of Node.js.

By default, your Node.js SmartMachine uses the latest stable version of Node.js.

In this page:



Changing the nodejs Symlink
===

The /home/node/local/nodejs symlink points to the directory that contains the version of Node.js used when you log in to your Node.js SmartMachine. This is the version the npm looks at when you install packages

To make sure that you're always using the latest version of node, see that /home/node/local/nodejs points to the latest version:



```
cd ~/local
rm nodejs
ln -s /opt/nodejs/latest nodejs
```


You can use any of the version designators described in Which Versions Are Available?.


```
Be careful when using tab expansion to set up the symlink. What you're linking to is actually a directory, and if you include the trailing slash, you will get an error when you push your changes.
```



```
ln -s /opt/nodejs/v0.4.1/ nodejs # DO NOT DO THIS
```



Using config.json to Select the Version Your Application Uses
===

If your application must use a specific version of Node.js, add a file named config.json that contains the following:



```
config.json
{ "version": "v0.2.6" }
```



When you push the change to your Node.js SmartMachine, your application runs with the version you selected:



```
$ git push joyent
Counting objects: 5, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (2/2), done.
Writing objects: 100% (3/3), 310 bytes, done.
Total 3 (delta 0), reused 0 (delta 0)
remote: Starting node v0.2.6...
remote: Successful
To ssh://node@example.no.de/home/node/repo
e22d59d..305730f  master -> master
```



If your repository does not contain a config.json, it uses the /home/node/local/nodejs symlink.

Which Versions Are Available?
===

To find out which Node.js versions are available, log in to your Node.js SmartMachine and look at the file /opt/nodejs/NODE-BUILDS.



```
/opt/nodejs/NODE-BUILDS
$ cat /opt/nodejs/NODE-BUILDS
v0.5.3 v0.5 unstable
v0.5.2
v0.5.1
v0.5.0
v0.4.11 v0.4 edge latest stable
v0.4.10
v0.4.8
v0.4.9
v0.4.7
v0.4.6
```



You can use these special version values to make sure that you're always using the most recent version of Node.js for your requirements:

||Version Values	 ||Description
|vX.Y.Z	 |Always use this particular version of Node.js
|vX.Y	 |The latest version for that series. For example, v0.4 refers to v0.4.1. If there are bug fixes and the version bumps to v0.4.2, your application will take advantage of those bug fixes.
|latest stable	 |Your application will always use the latest stable version of Node.js suitable for production work.
|edge	 |The cutting edge version of Node.js. Includes all the latest features, but may be buggy.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
