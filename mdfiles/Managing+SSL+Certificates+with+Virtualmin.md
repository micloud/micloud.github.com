使用Virtuakmin管理SSL認證
===
This page guides you through enabling SSL encryption for a domain and installing an SSL certificate through Virtualmin.

In this page:

##Enable SSL for your Domain


*  Log in to Virtualmin
*  Select a domain from the drop-down menu in the left-hand navigation pane. Your main domain is selected by default when you first login to Virtualmin. This is the domain for which you will enable SSL encryption.
*  Click Edit Virtual Server.
*  Click Enabled features and then select SSL website enabled? This assumes you already have Apache website enabled? turned on.
*  Click Save Virtual Server. A page will display a warning that SSL cannot be enabled for more than one domain on the IP address.
*  Click Yes, Modify Virtual Server to override and conclude with the SSL setup.
##Install the SSL Certificate via Virtualmin



*  Sign in to Virtualmin
*  Click Server Configuration in the left-hand navigation, then click Manage SSL Certificate.
*  Click the New Certificate tab in the right frame.
*  Paste in the certificate and private key files into the respective input boxes, and click Install Now.




----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
