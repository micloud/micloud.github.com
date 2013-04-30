High-level Technical FAQ for Joyent Cloud Existing Customers
===

I want to move my apps to the new Joyent Cloud. How can I do that?
===
Here’s some basic advice. Contact support@joyent.com for more complex installation questions.

Moving a website:
===
Make a tar of the website: gtar cvfz website.tar.gz website_directory
Add your ssh keys from the old source server to the new destination server
Move the website.tar.gz file using rsync: rsync -e ssh -ruav website.tar.gz admin@destination_ip:/website/directory/location
Uncompress/Unpackage tar file in the destination directory: gtar xvfz website.tar.gz

Moving a MySQL database:
===
Stop your database server: svcadm disable mysql
Backup database: mysqldump --all-databases -p > dump.sql
Move dump.sql file via rsync: rsync -e ssh -ruav dump.sql admin@destination_ip:/database/directory/location
Import data: mysqlimport -p < dump.sql

Will I need to test my applications in the new Joyent Cloud?
===
Yes, you will need to test your applications to ensure there are no missing dependencies or issues with updated versions of the application or the Joyent Cloud SmartOS. The new platform includes both an updated OS with security and performance patches, as well as a new template. You may need to have all the appropriate packages and modules installed and running on in order to ensure that your application works correctly on both the OS and software versions. This may require configuration or installation of necessary modules.

See Installing Software for help with installing software.

Can I link my SmartMachines running in the old Joyent Cloud to SmartMachines I launch in the new Joyent Cloud?
===
You will not be able to link machines in the legacy (my.joyent) and new clouds via the private network. You will be able to link via public IP’s to your old Joyent Cloud machines. Further, you will need to delete servers from your legacy (my.joyent) account when you’re finished with them to end billing on the legacy (my.joyent) my.joyent cloud platform.

Will I be billed for running in both the new and old clouds at the same time?
===
Yes, but….The legacy (my.joyent) cloud accounting system bills at the beginning of the month. The new joyent cloud bills at the end of the month. This is the equivalent of your landlord changing your billing from beginning of month to end of the month, mid lease. So you will have 30 days of no overlapping billing to ease your transition. After that period, you will be billed for both clouds as long as you have servers running in those clouds.

Can Joyent migrate or clone my servers for me?
===
No. Because the new Joyent Cloud runs on an entirely new underlying software platform, you will need to move and test the software yourself against the new cloud servers. The two clouds are operated separately and not integrated for cloning or migrations. However, with the Joyent Cloud Public API you will be able to autoscript deployment and server set-up for quick horizontal scaling.

What about my existing NFS storage?
===
Contact support@joyentcloud.com. We should be able to mount your existing NFS storage to your new architecture.

Can I keep the same IP addresses?
===
No, you will be issued new IP addresses, both public and private.

Do I have to use SSH keys to use Joyent?
===
Yes. In order to access a newly purchased machine from the new Joyent Cloud portal, an SSH key is required. However, you can modify this after you order to revert to the former method (user ID / pw) if you prefer. You may also build this credentialing information into custom scripts to be accessed through the Joyent Cloud Public API to make those changes on scripted provisioning. Information will be made available in the Joyent Cloud Wiki.

I’m getting errors on quota. How do I raise my limits?
===
Please contact support@joyentcloud.com or sales@joyentcloud.com to have your quotas raised.

Is this everything? Will Joyent have more features or server types available?
===
Most definitely. This is *only* the initial deployment of the new and improved Joyent cloud. Joyent has a long list of new virtual servers, OS’s, optimized appliances, products and PaaS solutions that will be added weekly going forward. We will also be integrating New Relic’s advanced application monitoring into the Joyent Cloud UI, as well as more cloud analytics visualizations and instructions. Keep checking our announcements, blog and newsletters for further details.

Whats the catch? Why is pricing so much cheaper than the old pricing? Can I get this pricing on my existing account?
===
In building the newly released cloud platform, we have gained tremendous efficiencies and cost improvements on both the underlying hardware and the software management. Additionally, we’ve empowered our customers to achieve a frictionless cloud that gives them benefits like dynamic server resizing, a public API, and comprehensive monitoring and analytics tools. The combination of lower hardware costs, lower software maintenance costs, and a more frictionless commerce and management capability on the user side allows us to pass big savings on to our customers.

The new pricing is great. Can I get it on the legacy (my.joyent) Joyent Cloud platform, too?
===
Unfortunately, no. In order to take advantage of the new pricing, you must be running on the new Joyent Cloud platform. Joyent will not be offering any discounts to existing my.joyent platform customers due to the pricing change on the new platform.

I’m having issues resizing my Smartmachine. Whats wrong?
===
First, if you are downgrading your machine, you must first check to make sure that the storage on your server is small enough to fit in the new server size. You must then confirm that the memory consumption of your processes (both swap and rss), is less than the amount of the new server you wish to size into. In some cases in sizing up, you will be required to contact support, so we can migrate your server to a new physical machine with room to accomodate your memory needs. This will require a short reboot. You may contact support@joyent.com if you are having any issues or have questions about resizing your server.

Can I resize my Linux or Windows virtual Server?
===
Not at this time. Upgrading or downgrading windows or linux will require a migration into a larger or smaller server. You may need to order a new machine, and migrate your files over to the new server. You will not be able to keep your same IP address at this time.

Help What do these SmartOS Packages Mean?
===
We are in the process of renaming our packages in the portal. The specific packages will have these names with versions which will be required for our API users to call on the correct packages for auto-provisioning. To understand more specifics about what is included on the SmartOS packages, you may find that information here.

What is the difference in all the Zeus packages?
===
See the chart in Joyent Zeus SmartMachine to learn more about the different configurations.

How do I access virtualmin/webmin on my SmartOS SmartMachines?
===
Virtualmin comes on non-appliance SmartOS SmartMachines. You can access it at https://your-public-ip:10000. The username and password are available in your my.joyentcloud.com portal. Click on the server, then click “show credentials.”
