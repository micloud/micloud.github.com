The Joyent MySQL SmartMachine is a dynamically scalable virtual machine that is optimized for 64-bit MySQL. It's based on a standard SmartMachine, with general software stripped down to bare minimum, and with MySQL pre-installed and pre-configured for ultimate performance and scalability.




Connecting to MySQL
===
The MySQL server is configured to listen on the private IP (found in your machine details as the secondary IP address). It is strongly recommended that you connect to your MySQL appliance from a different SmartMachine (e.g a standard generic SmartMachine]]) using the private IP, regardless of whether from your website code directly (for regular use), or whether you set up e.g. phpMyAdmin on another SmartMachine for management or troubleshooting. You may find your MySQL passwords under the system credentials in your machine details.

It is expected (recommended as a best practice) to refrain from using the MySQL 'root' login for production, and set up a restricted user first with the minimum privileges actually needed.

You __can__ just connect to your appliance and log into MySQL using 'mysql' of course (enter the MySQL root password when prompted):



```
mysql -uroot -p
```



Such connection will take place over a localhost UNIX socket.

Resetting MySQL root password
===
If you try to log into your MySQL server and get this error:



```
foo$ mysql -u root -p
Enter password:
ERROR 1045 (28000): Access denied for user 'root'@'localhost' (using password: YES)
```



It means that the password you are typing and the one in MySQL's user table do not match. Keep in mind that MySQL users' authentication credentials are based on '''username'@'host'{{.

Verify that you are using the }}localhost{{ password for }}root{{. If you still get the above error, then you will need to change the }}root{{ password.

To reset the }}root{{ password on a SmartMachine you need to use the }}--init-file{{ option. This will read a SQL file when the MySQL server is restarted and reset the root password.

[http://dev.mysql.com/doc/refman/5.0/en/resetting-permissions.html](http://dev.mysql.com/doc/refman/5.0/en/resetting-permissions.html)

You should __NEVER__ have any scripts or applications that directly use }}root'' as a user, but if you do, note that changing this password will most likely break the above. Which is a great time to eliminate this security risk by creating a user with appropriate permissions and table access.

Connecting using SSH tunnels
===
While you can re-configure your MySQL instance to listen on the public IP instead (or all available IPs), it is not recommended to do that for security reasons. Instead, you can use SSH tunnels for secure remote connections. Some MySQL administrator tools (e.g. Navicat) already provide for SSH tunneling functionality. You'd use these values when configuring such tool:

*  SSH hostname: <smartmachine-hostname-or-ip>
*  SSH port: 22 (should be default)
*  SSH username (login): admin
*  SSH password: <smartmachine-admin-password>
*  MySQL hostname: <smartmachine-private-ip>
*  MySQL port: 3306 (should be default)
*  MySQL username: root (or a custom user your created)
*  MySQL password: <smartmachine-mysql-password>
To use 'ssh' in a terminal to open the tunneled connection instead:



```
ssh -L3336:<smartmachine-private-ip>:3306 -N admin@<smartmachine-hostname>
```



You'd change 3336 to anything you like, that's the local port on your computer that you'll connect the MySQL client to afterwards.

Installing mytop/innotop
===
As root (or via sudo):



```
pkgin install mytop
pkgin install innotop
```


Current Bugs
===
SMA Broken
===
The SMF service svc:/application/management/sma:default is running out of the box but broken. It needs this fix to work:

Install net-snmp:
===



```
# pkgin install net-snmp
```



Install sma.xml:



```
<?xml version='1.0'?>
<!DOCTYPE service_bundle SYSTEM '/usr/share/lib/xml/dtd/service_bundle.dtd.1'>
<service_bundle type='manifest' name='export'>
<service name='application/management/sma' type='service' version='0'>
<create_default_instance enabled='true'/>
<single_instance/>
<dependency name='milestone' grouping='require_all' restart_on='none' type='service'>
<service_fmri value='svc:/milestone/sysconfig'/>
</dependency>
<dependency name='fs-local' grouping='require_all' restart_on='none' type='service'>
<service_fmri value='svc:/system/filesystem/local'/>
</dependency>
<dependency name='name-services' grouping='optional_all' restart_on='none' type='service'>
<service_fmri value='svc:/milestone/name-services'/>
</dependency>
<dependency name='system-log' grouping='optional_all' restart_on='none' type='service'>
<service_fmri value='svc:/system/system-log'/>
</dependency>
<dependency name='rstat' grouping='optional_all' restart_on='none' type='service'>
<service_fmri value='svc:/network/rpc/rstat'/>
</dependency>
<dependency name='cryptosvc' grouping='require_all' restart_on='restart' type='service'>
<service_fmri value='svc:/system/cryptosvc'/>
</dependency>
<dependency name='network' grouping='require_all' restart_on='restart' type='service'>
<service_fmri value='svc:/milestone/network'/>
</dependency>
<dependency name='config-file' grouping='require_all' restart_on='refresh' type='path'>
<service_fmri value='file://localhost/etc/sma/snmp/snmpd.conf'/>
</dependency>
<exec_method name='start' type='method' exec='/opt/local/bin/svc-sma' timeout_seconds='60'/>
<exec_method name='stop' type='method' exec=':kill' timeout_seconds='60'/>
<property_group name='general' type='framework'>
<property name='action_authorization' type='astring'/>
</property_group>
<property_group name='manifestfiles' type='framework'>
<propval name='var_svc_manifest_application_management_sma_xml' type='astring' value='/var/svc/manifest/application/management/sma.xml '/>
</property_group>
<template>
<common_name>
<loctext xml:lang='C'>net-snmp SNMP daemon</loctext>
</common_name>
<documentation>
<manpage title='snmpd' section='1M' manpath='/usr/share/man/'/>
</documentation>
</template>
</service>
</service_bundle>
```



Install /opt/local/bin/svc-sma:



```
#!/sbin/sh
#
#
# CDDL HEADER START
#
# The contents of this file are subject to the terms of the
# Common Development and Distribution License (the "License").
# You may not use this file except in compliance with the License.
#
# You can obtain a copy of the license at usr/src/OPENSOLARIS.LICENSE
# or http://www.opensolaris.org/os/licensing.
# See the License for the specific language governing permissions
# and limitations under the License.
#
# When distributing Covered Code, include this CDDL HEADER in each
# file and include the License file at usr/src/OPENSOLARIS.LICENSE.
# If applicable, add the following below this CDDL HEADER, with the
# fields enclosed by brackets "[]" replaced with your own identifying](# fields enclosed by brackets "[" replaced with your own identifying)
# information: Portions Copyright [yyyy] [name of copyright owner]](# information: Portions Copyright [yyyy [name of copyright owner])
#
# CDDL HEADER END
#
# Copyright 2006 Sun Microsystems, Inc.  All rights reserved.
# Use is subject to license terms.
#
# ident "@(#)svc-sma    1.1     06/06/01 SMI"
#
# Start method script for the net-snmp SNMP daemon
#

. /lib/svc/share/smf_include.sh

SNMPD_FILE=/etc/sma/snmp/snmpd.conf
SNMPCONFPATH=/etc/sma/snmp:/var/sma_snmp
MIBDIRS=/etc/sma/snmp/mibs

export SNMPCONFPATH
export MIBDIRS

if /usr/bin/egrep  '#DISABLE=YES' ${SNMPD_FILE} > /dev/null 2>&1; then
echo "snmpd disabled by config file ${SNMPD_FILE}"
svcadm disable svc:/application/management/sma
exit $SMF_EXIT_MON_OFFLINE;
else
#/usr/sfw/sbin/snmpd
/opt/local/sbin/snmpd -c ${SNMPD_FILE}
fi
```



Set it executable:



```
# chmod +x /opt/local/bin/svc-sma
```



then wire everything:



```
# svcadm disable sma
# svccfg delete sma
# svccfg import sma.xml
```






----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
