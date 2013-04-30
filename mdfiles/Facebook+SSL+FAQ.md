As of October 1st, 2011 Facebook requires all applications to use Secure Socket Layer ( SSL ) certificates. This page is for Facebook developers to be able to serve their applications via HTTPS with a SSL Certificate.

In this page:



Why is Facebook requiring SSL certificates?
===

Facebook has updated their Terms of Service that require all applications served from them to have a SSL certificate and use the HTTPS protocol.

More information of the change by Facebook can be found here and Joyent blogged about this.

Can I use my free Joyent Facebook developer account with SSL?
===

No, You will need to buy a Joyent SmartMachine to get a static IP to bind your domain to. The free Joyent Facebook accounts do not support SSL. You can get a Joyent SmartMachine form https://my.joyentcloud.com/, then purchase a SSL certificate.

How do I get a SSL certificate?
===

You will have to purchase a SSL certificate from a third party vendor. Joyent uses RapidSSL for its SSL certificates, but you can use your vendor of choice.

How do I install an SSL certificate on my Joyent SmartMachine?
===

You can install your SSL certificate via your VirtualMin administration portal for your SmartMachine.


```
You will not be able to use the provided *.joyent.us subdomain. You will need to purchase your own domain name to be use with the SSL certificate if you have not already done so.
```


To enable this SSL setup for your site:

*  Sign in to Virtualmin.
*  Select a domain from the drop-down in the left-hand navigation. This is the domain that *you'll enable SSL for.
*  Click Edit Virtual Server.
*  Click Enabled features and then select 'SSL website enabled'.
*  Click Save Virtual Server.
*  A page will appears warning you that SSL cannot be enabled for more than one domain on the IP address. Click Yes, Modify Virtual Server to override and conclude with the SSL setup.
With this feature enabled, Virtualmin will give you access to the Manage SSL Certificate page that lets you generate a new key, certificate or a signing request (i.e. generally manage your SSL protection details).


```
A dedicated IP is still necessary for having a real SSL certificate in place.
```


These issues are believed to be resolved now (provided your SSL is implemented using the new form, with the SSL checkbox showing up enabled), though we'd welcome feedback from you.


__More instructions on installing your SSL Certificate can be found at:
[http://oldwiki.joyent.com/smartmachine:ssl#installing-your-ssl-certificate](http://oldwiki.joyent.com/smartmachine:ssl#installing-your-ssl-certificate)
__


Performance with SSL and HTTPS on a SmartMachine
===

There is minimal performance reduction with the added encryption on a Joyent SmartMachine.

However, all Joyent SmartMachines offer the following features that you can use to increase the general performance and monitoring of your Facebook application:

*  Free subscription to New Relic included with all SmartMachines
*  Free Joyent Cloud Analytic accessible form my.joyentcloud.com
*  Ability to use a Zeus load balencer to increase performance and get more information about your customer traffic




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
