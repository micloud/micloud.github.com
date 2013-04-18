The title of the page serves as the heading to this section. It describes the problem that this page is solving.

In this page:

About pkgsrc
===

Joyent maintains a pkgsrc repository of prebuilt binary packages for SmartMachines. Some of these packages are already installed by default. You can use pkgsrc to add a package that's in the repository but not in the default installation or to add a package from another source.

Joyent runs building and testing systems, builds binary packages using pkgsrc for all software that are available at a binary package repository, and uses these binary packages to create SmartMachine templates, to clone for deployment to customer. This means that when you need something that's not installled by default on an SmartMachine, you do not have to resort to building from source (although you can, of course), but can simply use our binary package repository and/or employ pkgsrc to build your own.

;SmartMachines deployed before March 22, 2008 used Blastwave instead of pkgsrc.See Working with Older SmartMachines

Where pkgsrc Installs Files
===

Pkgsrc installs files in several directories within /opt/local. If you're used to other Unix-like systems, you might expect to find these files in /usr/local. (In fact, there is a symlink from /usr/local to /opt/local in case your fingers have gotten used to typing that instead.)

||Directory	 ||Description
|/opt/local	 |This is where pkgsrc installs software including binaries, libraries, configuration files, supporting files, examples, documentation etc.
|/opt/local/etc	 |Contains configuration files.
|/opt/local/share/examples	 |Example configuration files.

When you add a new package, pkgsrc installs sample configuration files here, and then copies them to /opt/local/etc if they don't already exist there.
|/var/db/pkg	 |This directory contains two directories that contain the database of installed and available packages. If you delete or damage these directories, you will not be able to use the pkgsrc management tools.
As noted in the table above, pkgsrc copies configuration files into /opt/local/etc only if they don't already exist there. That means that you will not lose any custom configuration when you update, remove, or reinstall a pacakage. If you break your configuration file, you can always get a clean one from /opt/local/share/examples.

However, for some preinstalled software such as Apache and MySQL, your SmartMachine comes with preconfigured files in /opt/local/etc which are not mirrored in /opt/local/share/examples.

Releases
===

Joyent follows pkgsrc's quarterly release scheme ('2009Q1', '2009Q1' etc.), and generally rebuilds the repository for each new release published. The way the pkgsrc community updates packages works as follows:

*  All changes are applied to the current (trunk) CVS branch of the pkgsrc meta tree. In general, Joyent does not use the HEAD branch.
*  Security patches are backported to the last quarterly release. Joyent generally attempts to keep its current binary package build in sync with the current pkgsrc branch, but updates are being made in the order of weeks rather than days.
*  When the quarterly interval comes up, the current branch is frozen and becomes the new quarterly release. For instance, 2009Q2 was released in early July, and 2009Q3 in October. When a new release is made, Joyent starts rebuilding its package repository, and may cut a new SmartMachine template based on the updated package set.
The important part is that only the current release is getting any security patches. Older releases are never updated, which is why it's crucial to update to the latest release. In certain cases, Joyent may backport updates to earlier binary package sets.

While you do not have to strictly adhere to the release cycle when updating packages, very much often deep system libraries (e.g. openssl, db4 or libxml2) are bumped when launching a new release, so you may be forced to update half of your software world by pulling in more recent versions of other packages, to match what they were build against. Hence depending on the exact situation and your needs, you should choose between updating particular packages, and updating your entire SmartMachine to a new release.

To find out which package release your SmartMachine has, use this command:


```
cat /opt/local/etc/pkg_install.conf
```


Package Management
===

The Joyent binary repository for SmartMachines lives at:



```
http://pkgsrc.joyent.com/RELEASE/
```



Where RELEASE is to be replaced with the pkgsrc release that your SmartMachine is currently populated with (see above).

If your SmartMachine runs 2009Q1 at least, we strongly recommend using __pkgin__ to add/remove/update installed packages. Pkgin is an apt/yum like tool that was recently coded by a 3rd party programmer for use with pkgsrc.

The default pkgsrc tools to manage packages are pkg_add, pkg_delete, pkg_info (and a few others), lumped into the __pkg_install package__. They work fine for package addition/removal, but are not generally suited well for package updates, especially when dependencies are involved.

Updating to a newer release
===

By updating to a newer release, we mean that you update every installed package on your SmartMachine to a more recent version that's available under the new release. This is a complex operation and there are various tools that can help you. Our favorite tested tool at this point is __pkg_chk__.


;It makes sense to have a plan before you start updating your entire SmartMachine though. The update typically takes a few minutes, and software may become unavailable during the process, so it's a good measure to think of it as 'server maintenance' or 'downtime' even, and plan accordingly. Can you claim a maintenance and shut off all services? Good. If not, letting your users/visitors know at least will work - just in case.

These are the upgrade paths that we tested and documented:

||You have...	 ||You want...	 ||Follow these instructions
|2007Q3	 |2009Q1	|instructions
|2007Q4	 |2008Q2	|instructions
|2007Q4	 |2009Q1	|instructions
|2008Q2	 |2009Q1	|instructions
|2009Q1	 |2009Q4	|instructions
|2009Q1	 |2010Q1	|instructions
|2009Q4	 |2010Q1	|instructions

;If you should happen to "break" pkgsrc and no longer be able to log in as 'jill', try logging in as the 'admin' user instead. We leave this one with Sun's copy of 'bash' as a shell, rather than the one from pkgsrc - just in case.

Building from pkgsrc yourself
===

Any pkgsrc-based SmartMachine already has pkgsrc bootstrapped, and the building tools installed. In order to build your own packages (e.g. those that exist in pkgsrc, but are not built by Joyent for whatever reason), you only need to download a pkgsrc meta tree, and start building - pkgsrc will pick up existing packages and will not try to build them again.

You may decide to bootstrap your very own pkgsrc setup (i.e. ignore what's already installed), maybe to create a separate installation under a new prefix, or to get pkgsrc going on a pre-pkgsrc (Blastwave) Accelerator. Note that there is normally no need for this, as our SmartMachines already come bootstrapped and ready to use as far as pkgsrc is concerned.

In both cases, see this comprehensive page on __using your own pkgsrc__.

Reference
===

[pkgsrc documentation](http://www.netbsd.org/docs/pkgsrc/)




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
