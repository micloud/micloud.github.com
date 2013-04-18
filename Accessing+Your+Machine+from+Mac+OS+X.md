This page shows you how to use the Terminal application to generate an SSH key and to log in to your JoyentCloud machine.

In this page:



About the Terminal Application
===

To access your JoyentCloud machine and to generate SSH keys, you will use the Terminal application. The terminal gives you a command line interface to the Unix underpinnings of Mac OS X.

To open the Terminal application follow these steps.

*  In the Finder, choose __Utilities__ from the Go menu. The Utilities folder will open.
*  Find the Terminal application in the Utilities window.
*  Double-click the Terminal application to open it.
When the Terminal window opens, you'll se some text that looks like this. Yours will have the name of your machine and your username instead of mymac and myname.



```
mymac:~ myname$
```



This is the Terminal prompt where you will be entering commands. Be sure to press the Return key after entering a command.

Generating an SSH Key
===

An SSH key consists of a pair of files. One is the private key, which you should never give to anyone. The other is the public key. You will need a public key to log into most machines you provision.

To generate an SSH key on a Macintosh, follow these steps.

*  Type the following command in the Terminal window.


```
mymac:~ myname$ ssh-keygen -t rsa
```



*  After you press the Return key, the ssh-keygen tool asks you where to store the key.


```
Generating public/private rsa key pair.
Enter file in which to save the key (/Users/myname/.ssh/id_rsa):
```


Press the Return key to accept the default.
*  The command asks you for a passphrase. Enter a phrase you can remember. You can use a key without a passphrase, but this is not recommended.


```
Enter passphrase (empty for no passphrase):
```



*  The command asks you to enter the passphrase again to confirm it.


```
Enter same passphrase again:
```



After you confirm the passphrase, the command generates the key pair


```
Your identification has been saved in /Users/myname/.ssh/id_rsa.
Your public key has been saved in /Users/myname/.ssh/id_rsa.pub.
The key fingerprint is:
ae:89:72:0b:85:da:5a:f4:7c:1f:c2:43:fd:c6:44:38 myname@mymac.local
The key's randomart image is:
+--[ RSA 2048]----+](+--[ RSA 2048----+)
|                 |
|         .       |
|        E .      |
|   .   . o       |
|  o . . S .      |
| + + o . +       |
|. + o = o +      |
| o...o * o       |
|.  oo.o .        |
+-----------------+
```



Your private key is saved in the file named id_rsa in the .ssh directory. Never provide this file to anyone.

Your public key is saved in the file named id_rsa.pub. This file contains the information you'll add to your JoyentCloud account. The easiest way to do this is to put the key data on the Macintosh clipboard.

Use this command in the Terminal window to load your public key on the clipboard:



```
mymac:~ myname$ pbcopy < ~/.ssh/id_rsa.pub
```



Adding the Public Key to Your JoyentCloud Account
===

To add your public key to your JoyentCloud account, follow these steps.

*  Make sure that your public key is copied to the clipboard.
*  Log in to your JoyentCloud account.
*  In the top right corner of the browser, click the Account Settings link.
*  Click the SSH Keys tab.
*  Type a name for the key in the Name field. This name is only for your convenience. You can use the name of your machine, your user name, or anything that will help you remember which key belongs to whom.
*  Paste your public key in the SSH Key field.
*  Click Add This Key to finish.
<img src='images/Accessing+Your+Machine+from+Mac+OS+X-SSHKeysPortal.png' width='650' align='left'/>

Connecting to Your Machine
===

You use the Terminal application and the ssh command to log in to your machine in the JoyentCloud. When you provision a machine, you will notice two IP addresses listed in the Overview section of the Machine Details page. One of the IP addresses is the public address. The second is the internal address for communication between SmartMachines / Virtual Machines in the same datacenter. After you provision a new machine, be sure to note the IP addresses. You will use the public address to connect to your machine.

*  In a Terminal window, type this command to log in to your provisioned machine.


```
mymac:~ myname$ ssh root@198.51.100.27
```



*  If your SSH key has a passphrase, a window opens. Type in your passphrase and click OK.



<img src='images/Accessing+Your+Machine+from+Mac+OS+X-SSHAgent.png' width='650' align='left'/>



*  If you entered your passphrase correctly, you will be logged in to your machine.


```
root@myprovisioned:~#
```



Troubleshooting
===

There are a few reasons that you may see a password prompt like this:



```
mymac:~ myname$ ssh root@198.51.100.27
root@198.51.100.27's password:
```



*  You did not enter the correct passphrase.
*  The private key on you Macintosh (id_rsa) does not match the public key stored with your JoyentCloud account.
*  The public key was not entered correctly in your JoyentCloud account.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
