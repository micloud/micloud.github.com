Linux NTP Server Configuration
===

Linux KVM can have time drift(losing or gaining seconds to minutes of time)

To fix this you need to do the following:

1. Install ntp and ntpdate via your package manager

Debian/Ubuntu -

```apt-get install ntp```


or

CentOS/Fedora -

```yum install ntp```


2. Edit your cron file with crontab -e, add the following line


```30 * * * * ntpdate pool.ntp.org > /dev/null 2>&1```


3. Run ntpdate pool.ntp.org from command line to update any current drift

4. Edit /boot/grub/menu.lst, add the following to the first line that starts with kernel, divider=10

eg.

```
kernel /boot/vmlinuz-2.6.32-220.2.1.el6.x86_64 ro root=/dev/vda1 rd_NO_LUKS rd_NO_LVM rd_NO_MD rd_NO_DM LANG=en_US.UTF-8 SYSFONT=latarcyrheb-sun16 KEYBOARDTYPE=pc KEYTABLE=us crashkernel=auto rhgb quiet nohpet divider=10
```


5. Reboot your system
