You have root access so you are free to do anything within the Cloud Hosting AUP.

This guide attempts to describe setting up the following core functionality on an SmartMachine as well as providing more general information for new users.

In this page:


Setting Up Your Domain Name (DNS)
===

Each SmartMachine comes with a dedicated public and private IP address, found in your machine details in your portal.

Many domain registrars such as Gandi (http://www.gandi.net) offer the ability to use their nameservers and offer an interface to edit your DNS zone file to set up your domain. The following examples are based on the options provided by Gandi.

To establish the link between your domain name and public IP, you must specify what is known as an "A record", this is done with the following two lines in BIND 9 format (for Gandi, these can be entered in their "Expert" interface):



```
domain.name. 3600 IN A 1.2.3.4
*  .domain.name. 3600 IN A 1.2.3.4
```




__Note the full-stop (or period) after your domain name.__Make sure to replace domain.name with your own domain and 1.2.3.4 with your public IP. The 3600 is known as the Time To Live (TTL) and sets your A record to expire after 1 hour (3600 seconds) so that you can make changes and hopefully see it reflected online without too much delay.

The second line is known as a wildcard entry which ensures that anyone attempting to go to anything.domain.name will also be correctly resolved.

Note that those two lines may be abbreviated to the following:



```
@ 3600 IN A 1.2.3.4
*   3600 IN A 1.2.3.4
```




Do not worry as they are equivalent.

(See "Setting Up E-mail" below for information on MX records.)

Once enough time has passed for your changes to have been propagated to your ISP's DNS servers, you should be able to access your SmartMachine via your domain rather than its IP.

Hostname vs SmartMachine name and reverse record
===

1.Run these commands at the shell prompt to find out:
a.What is my hostname?

```hostname```

b.What is my SmartMachine name?

```zonename```

c.What is my IP?

```cat /etc/hosts```

Out of the box your SmartMachine will have its hostname set to an internal ID of the format zonename.joyent.us.
You are able to access your SmartMachine by IP or http://zonename.joyent.us. It is recommended that you change your hostname to one of your own choosing (example.com). This is necessary if you want to send email from your SmartMachine (forum post).


```
You do need to submit a support ticket to get your reverse PTR record set to your domain name. This is only really needed if you are going to be using your SmartMachine to send emails.
```



```
When submitting the ticket for any DNS related action please include the whois information which proves that you are the owner or technical contact for the name.
```



Changing your hostname
===

In the following files replace the zonename.joyent.us with your new domain name (example.com). Be very careful when editing these files. If your name has not be changed after the reboot, make sure that there are no extra spaces or lines (for example do not comment out things in /etc/nodename).



```
sudo nano /etc/nodename
sudo nano /etc/hosts
sudo nano /etc/inet/ipnodes
```




1.(the last file might already be changed with the edit to hosts file). If you haven’t added your user to the sudoers list, you can su root then /opt/local/bin/nano /etc/nodename etc. If /etc/nodename is blank just add your new domain name (& nothing else).
2.reboot
3.run at the command line:


```
hostname
```


your new name should display
4.from another machine (local machine is fine) run


```
host domain.tld
```



where domain.tld is the answer from hostname in the previous step. That should return the IP of your server.



```
If you are using PHP you may have to change the hostname in your php.ini file to reflect your new hostname
```


Running Webmin
===
Log into Webmin as admin with the details supplied in your systems credentials virtualmin password. (this should be a URL similar to https://1.2.3.4:10000)

The files are located in /home/jill/web/public.

Create a new Virtual Server
===

select __Create Virtual Server__ from the menu on the left.

1. Fill in the __New virtual server details fields__ with:
a. your domain name (example.joyeurs.com)
b. a simple description
c. administration password
d. Administration custom username (example)
2. Fill in the __Advanced options__
a. Group for mailbox users Custom group name (example)
3. Quotas and limits
a. Adjust the quotas if needed
4. Enabled features
a. Accept mail for domain (if you want email)
b. Setup log file rotation (select)
5. leave the rest of the settings at their default settings
6. Select Create Server
You are now able to ssh in as example@X.X.X.X with the password entered in step 1.III.



```
ssh example@X.X.X.X
```




You now have a /home/example directory which is looks very close to a Shared SmartMachine.



```
ls /home/example
Maildir
cgi-bin
etc
fcgi-bin
homes
logs
svn
web
```




__Test out the site__


Point your browser to your newly created domain and see that the test page renders properly. You should see that the file is located at /home/example/web/public/index.php.

__Uploading your web content__


You are now ready to upload your customized content into the ~/web/public directory. Use your favorite SFTP application using your newly created domain name as the user. The IP of the SmartMachine for the host and the password you entered in step 1.III when creating the domain.

Common technologies such as PHP5 and Subversion are already installed and configured and ready to use with web hosting so you should be able to serve PHP files from the start.

Just what is running?
===

There are a couple of ways to check on what is running. See this guide for details about being reboot ready and what the various states mean.

__From Webmin__


Start Virtualmin from https:/X.X.X.X:10000/

*  Select Webmin on the upper left
*  Under System select Service Management Facility Configuration
*  *Any items which are in maintenance will appear at the top of the list
*  *Any items which are offline appear in yellow below the maintenance items and above the online items
__From the Command line__


*  To see a list of services


```
#svcs -a
```



*  To stop a service


```
svcadm disable NAME
```



*  To restart a service


```
svcadm enable NAME
```



*  To to clear a service from maintenance


```
svcadm clear NAME
```



The service should then go offline and if all is well return to online.
*  To see what services are in maintenance and why


```
svcs -x
```



*  To see all processes for a service


```
svcs -p NAME
```



Sending root's email to a real user
===

root will get the output from the cron jobs and other system messages. It is recommended to change root's email to be sent to a real user which is read on a regular basis.

__Postfix changes__


*  Run Virtualmin/Webmin.
*  Select webmin link on the upper left
*  Select Servers->Postfix on the left side
*  *Select General Options
*  **Internet Hostname of this Mail system set to Default (provided by system)
*  **Select Save and Apply
*  *Select Mail Aliases
*  **Select Create a new Alias at the bottom


```
Address: root
Alias to: Email Address  REAL_USERNAME
```


*  **Select save at the bottom
*  **Select Save and Apply above the list of aliases
You could also edit /opt/local/etc/postfix/aliases and run the newaliases command

__Trouble shooting__


Check that


```
tail -f /var/log/syslog
```


is not showing any error messages
Setting Up E-mail
===



```
Managing a mail server is a significantly bigger undertaking than hosting a web site particularly when it comes to dealing with spam and the problems it causes. It is therefore not recommended that you run a mail server on your SmartMachine. You are instead advised to use external services such as Joyent's own Connector or Shared Hosting. Do this by altering your A and MX DNS records (external to Joyent).
```


If, however, you do decide to run your own mail server, here are basic instructions to get started. This also AssUMes you have followed the instruction above. If you are jumping straight to this section, please review the earlier steps to make sure you are ready to enable email. Specifically renaming the hostname.

__MX Record__


In order for mail to be sent to your e-mail address(es) on your SmartMachine, you will need to set up an MX record in your DNS zone file. You need to add the following lines (where domain.name is your domain and 1.2.3.4 is your SmartMachine's public IP):



```
domain.name. 1200 IN MX 10 mail.domain.name.
mail.domain.name. 1200 IN A 1.2.3.4
```



<note information> the full-stop (or period) after the domain name.</note> As MX records should not point directly at an IP address, we instead use a sub-domain which, in turn, points to your SmartMachine's public IP. Once these changes to your DNS have propagated to servers, you should begin receiving mail on your SmartMachine.

__Testing it out__


From your local machine make sure that the mail host is reported properly like so:


```
$host example.joyeurs.com
example.joyeurs.com has address 1.2.3.4
example.joyeurs.com mail is handled by 10 mail.example.joyeurs.com.
```


__Adding email users__


To add accounts and aliases, use the Virtualmin interface to do so. The only extra bit of work you need to do is to enable Courier so that you can use your mail client of choice to connect to your SmartMachine's mail server.

__Testing it out__


In both cases you are looking for the OK. If you don't get that then review the steps listed above. If you are still stuck, then google on the response to see what others have to say.

__POP3__


From your local machine see that port 110 is responding correctly:



```
$ telnet example.joyeurs.com 110
Trying 1.2.3.4...
Connected to example.joyeurs.com.
Escape character is '^]'.
+OK Hello there.
^]
telnet> Connection closed.
```



__POP3-SSL__


From your local machine see that port 995 is responding correctly (A cert is returned):


```
openssl s_client  -ssl3  -connect example.joyeurs.com:995
```



__IMAP__



```
You may have to first start your IMAP server. To do this you log into your SmartMachine as the user admin and run this command:
sudo svcadm enable /network/courier:imap
```

From your local machine see that port 143 is responding correctly:

```
$ telnet example.joyeurs.com 143
Trying 1.2.3.4...
Connected to example.joyeurs.com.
Escape character is '^]'.
*   OK [CAPABILITY IMAP4rev1 UIDPLUS CHILDREN NAMESPACE THREAD=ORDEREDSUBJECT THREAD=REFERENCES SORT QUOTA IDLE ACL ACL2=UNION STARTTLS] Courier-IMAP ready. Copyright 1998-2005 Double Precision, Inc.  See COPYING for distribution information.](*   OK [CAPABILITY IMAP4rev1 UIDPLUS CHILDREN NAMESPACE THREAD=ORDEREDSUBJECT THREAD=REFERENCES SORT QUOTA IDLE ACL ACL2=UNION STARTTLS Courier-IMAP ready. Copyright 1998-2005 Double Precision, Inc.  See COPYING for distribution information.)
IMAP-SSL
From your local machine see that port 993 is responding correctly (A cert is returned):

openssl s_client -ssl3 -connect example.joyeurs.com:993
Troubleshooting
===
1. Seeing errors like this in /var/log/syslog

```
Oct 20 21:22:57 example.joyeurs.com postfix/smtp[2076]: [ID 197553 mail.info] 2E35E2F68: to=<linda@example.com>, relay=mail.example.com[8.12.37.104], delay=0, status=deferred (host mail.example.com[8.12.37.104] said: 450 4.7.1 Client host rejected: cannot find your reverse hostname, [8.12.36.201] (in reply to RCPT TO command))](Oct 20 21:22:57 example.joyeurs.com postfix/smtp[2076: [ID 197553 mail.info] 2E35E2F68: to=<linda@example.com>, relay=mail.example.com[8.12.37.104], delay=0, status=deferred  - host mail.example.com[8.12.37.104] said: 450 4.7.1 Client host rejected: cannot find your reverse hostname, [8.12.36.201]  - in reply to RCPT TO command)
```

You need to submit a ticket requesting the PTR reverse record added. When it is correct then doing host domain.tld and the host X.X.X.X will correctly resolve as shown below


```
$ host example.joyeurs.com
example.joyeurs.com has address 8.12.36.201
example.joyeurs.com mail is handled by 10 mail.example.joyeurs.com.
$ host 8.12.36.201
201.36.12.8.in-addr.arpa domain name pointer example.joyeurs.com.
```


Subversion
===

Set up your Subversion repositories using "SVN Repositories" under the "Services" menu of Virtualmin and grant repository access to users much as you would on Joyent Shared Hosting with "Edit Mail and FTP Users".

Securing Your SmartMachine
===

Joyent recommend that you change your various passwords on your SmartMachine; for instructions on how to do this, see Changing Passwords


```
keep in mind the usual advice regarding the selection of strong passwords. This is the recommended method
apg -t -m 12 -M NCL
```



As you will be using SSH to access your SmartMachine, it is also a good idea to take advantage of SSH's public key authentication instead of relying on using passwords. If you decide to rely on keys entirely and wish to disable password authentication.

Edit this file:


```
sudo nano /etc/ssh/sshd_config
```



Setting both of these values to no (More detail on [Disable SSH Password Authentication].)](Setting both of these values to no  - More detail on [Disable SSH Password Authentication.)
#PasswordAuthentication
#PAMAuthenticationViaKBDInt
MySQL remote access
===

You are able to create a tunnel from your local machine to the remote machine. For example say you are on an OSX machine ([see this guide for all platforms]) then:](You are able to create a tunnel from your local machine to the remote machine. For example say you are on an OSX machine  - [see this guide for all platforms then:)


```
ssh -L3307:127.0.0.1:3306 -p 22 -N -t -x user@example.joyeurs.us
```


will create a tunnel from local port 3307 to remote port 3306 on example.joyeurs.us. The only thing you need to change in the user@example.joyeurs.us on the line above.
In another terminal you are able to connect to the remote mysql database.


```
mysql -u username -ppassword -h 127.0.0.1 -P 3307
```





----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
