A topic for dealing with older (Blastwave era) SmartMachines

*  How can you tell which release your SmartMachine is populated with?
*  *On templates made with 2007Q4 and 2008Q2, the PKG_PATH variable is set under /root/.profile
*  *On templates made with 2007Q3 (Facebook SmartMachines) the PKG_PATH variable is set under /root/.bash_profile. This means when logged in as root, you can just run echo $PKG_PATH.
*  *On templates made with 2009Q1 and beyond, the PKG_PATH variable is defined in /opt/local/etc/pkg_install.conf instead.
Historically, we used 2007q3 for Facebook SmartMachines, 2007q4 for SmartMachines deployed on and after March 22, 2008, followed with 2008q2 in November 2008, and 2009q1 in summer 2009.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
