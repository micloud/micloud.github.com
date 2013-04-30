Joyent's Node.js™ Smart Machine service uses SSH keys as the primary method of accessing the service.



Where to find your SSH key
===

You can find your SSH key on your local machine at ~/.ssh/id_rsa.pub or ~/.ssh/id_dsa.pub. If neither of those files exist, create them with this command:



```
ssh-keygen
```



To view your public key from the command line, use this command:



```
cat ~/.ssh/id_dsa.pub
```




```
If you are on Windows and using PuTTY and puttygen.exe to generate your keys, be sure that you use the key listed in the box labeled Public key for pasting into OpenSSH authorized_keys file.
If you continue to experience problems with PuTTY, try CygWin http://cygwin.org
```

Adding more SSH Keys on a Node.js Smart Machines
===

Once you have your initial key uploaded you can add more keys from other computers to your Node.js SmartMachine. To do this generate the key on the new computer and add it to the following location on your Node.js SmartMachine:



```
/home/node/.ssh/authorized_keys
```



Be careful not to overwrite the existing file. If you delete existing keys those remote computers will not be able to log into your Node.js SmartMachine.

Changing your SSH Key on a Node.js Smart Machines
===

If you change your SSH key on your local computer you will need to log into your Node.js SmartMachine with your old key first.

Then you need to add your new key and remove your old key from:



```
/home/node/.ssh/authorized_keys
```



Invalid SSH Key on a Node.js Smart Machines
===

If you try to log into your Node.js SmartMachine and you are prompted for a password your need to update your key by opening a support ticket.

To do this send an email to support@joyent.com letting us know that you can not log into your Node.js SmartMachine. Please make sure you provide us the following:

*  your account name


*  the name of your Node.js Smart Machine


*  update your no.de account with the proper SSH keys https://api.no.de/#PUT-/sshkeys/:id


If you are still unable to log in as the user node to your Node.js SmartMachine please send the following to support@joyent.com:

*  The output of this command:



```
Make sure you replace <YOUR_SMARTMACHINE> with the subdomain name of your Node.js SmartMachine
Also, you need to log into your Node.js SmartMachine as the user 'node'
```




```
ssh -vvv node@<YOUR_SMARTMACHINE>.no.de
```



*  Your public SSH key



----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
