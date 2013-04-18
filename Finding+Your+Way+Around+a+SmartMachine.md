If you're coming to a SmartMachine from Linux, you may find that some things are a little different than what you are familiar with. The SmartOS has most of the GNU tools that you are accustomed to, just that they are not default tools. Your fingers' muscle memory may find the differences a little unsettling at first, but rest assured that everything you're used to is still here. It's just in a different place, or it may have a different name.

Where things are
===
Most things are where you expect them to be. The following table lists the directories you'll find in your PATH variable.

||Directory	 ||Description
|/opt/local/bin

/opt/local/sbin   |These directories contain the GNU tools as well as other tools installed on top of the standard system tools. When you install software with pkgsrc,

this is where it is installed by default. On other systems, this would be /usr/local/bin.
|/usr/xpg4/bin	 |This directory contains the basic Unix tools such as rm, ln, etc
|/usr/bin

/usr/sbin	 |These directories contain standard Unix tools.
|/opt/SUNWspro/bin |This directory, if it exists, is for the Sun C compiler. It's not normally installed.
Other directories you may be interested in are:

||Directory	 ||Description
|/home	 |User home directories.
|/home/admin	 |Home directory for the admin user.
|/home/jill	 |Home of the jill user (the website owner user).
|/home/jill/web/public	 |This is where website files reside (the 'document root').
|/shared	 |If you have purchased extra NFS storage, it will be mounted here.
|/var/adm	 |System logs. Other logs, such as httpd logs, are in /var/log.
|/usr/local	 |This is a symlink to /opt/local.
Commands that work differently
===
The things that make a SmartMachine different from other Unix-like systems generally fall in two categories:

*  commands that have different names on SmartMachines
*  things that are done differently on SmartMachines
For example, here are some common Linux commands that work differently.

||Command	 ||What's different on a Smart Machine
|df	 |The default is to us the SmartOS version.  gdf may provide an output more familiar to Linux users.
|locate	 |This is a GNU tool, so it has been renamed to glocate. Likewise, you would use gupdatedb to set up its database.
|lsof	 |SmartMachines use a different collection of tools to examine processes. See Examining processes and memory later in this topic.
|ping	 |Returns whether a host responds or not. Use ping -s to get the continuous response you're used to
|top	|top is available in /opt/local/bin, but prstat -Z provides more zone aware (and more accurate) information than top.
The [Rosetta Stone for Unix](http://bhami.com/rosetta.html)
You can find the GNU tools in /opt/local/bin and /opt/local/sbin.

The vmstat, mpstat, and psrinfo commands display processor and memory statistics for the physical machine. Their output is not generally useful to you as a SmartMachine operator.

Do we have a tip section? One thing that is really neat with SMF is that you can set it to email you when a service is halted or crashes.

Peter Yorke - we need a section on creating your own start-up scripts like svccfg import /opt/local/share/smf/manifest/startupscript.xml

Installing Sofware
===
There are two ways to install additional software on your SmartMachine:

*  install it from a package
*  compile it from source
__Installing Software From a Package__


SmartMachines have a package manager like Debian (apt) or Redhat (rpm,yum) called pkgsrc to manage the installation of additional software. Joyent maintains a package repository of packages that are compatible with SmartMachines. The pkgin tool is the easiest way to work with packages.

This table lists the common pkgin commands. You need to run the commands that install software or update the package database as root or with sudo.

||Command	 ||Description
|pkgin up	 |Brings pkgin's database up to date. It's a good idea to run this command |before installing new packages.
|pkgin ls	 |Lists all the installed packages
|pkgin av	 |Lists all of the available packages
|pkgin in	 |Installs a package
|pkgin rm	 |Removes a package
|pkgin se	 |Searches for a package
|pkgin	         |With no additional arugments, lists all of the available pkgin commands.
For example, to install tidy, a utility that cleans up HTML code, you would do this:



```
sudo pkgin update
sudo pkgin in tidy
```



__Compiling Software From Source__
If the software you want to use isn't available as a prebuilt package, you can compile it from source. Typically, you'll get a tarball that contains the software you want to install. After you unpack the tarball, the readme file will contain instructions for compiling the software.

For example, to install the lastest version of Ruby on your SmartMachine, you would use the following commands. Note that we're using the GNU versions of tar and make.



```
1. wget ftp://ftp.ruby-lang.org//pub/ruby/1.9/ruby-1.9.2-p0.tar.gz
2. gtar xvzf ruby-1.9.2-p0.tar.gz
3. cd ruby-1.9.2-p0
4. ./configure
5. gmake
6. ls
7. sudo gmake install
8. ruby -v
```





External Links
Some really good links that we have found that make the SmartOS more familiar.

[Solaris Eye for the Linux guy... or how I learned to stop worrying about Linux and Love Solaris (Part 1)](http://glennfawcett.wordpress.com/2011/01/03/solaris-eye-for-the-linux-guy-or-how-i-learned-to-stop-worrying-about-linux-and-love-solaris-part-1/)




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
