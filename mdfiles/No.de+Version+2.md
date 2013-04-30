A bunch of new features have come in this release, just in time for the second annual Node Knockout competition. We've designed this version of the no.de product in response to the feedback we've gotten from users of the existing system.

No Coupon Codes
===
That's right! You can sign up for the service, and provision right away without anyone's permission, or jumping through any extra hoops.

The codes served their purpose, and gave us a way to limit the influx of new users in the first few versions, but I think everyone is pretty happy to see them go.

If you were waiting in the queue to get a code, then the good news is that you don't need to wait any more. Just go provision a new no.de SmartMachine, and start pushing code onto it.

Proxied HTTP
===
In version 2, we're using Nodejitsu's http-proxy program, and have been very happy with it so far. For SSH access, we're assigning a specific port to every no.de machine.

The net result is that we can get a lot more mileage out of each physical machine.

For your purposes, it means that all HTTP requests will appear to come from the same req.socket.remoteAddress, so you'll have to look at the req.headers['x-forwarded-for'] and req.headers['x-forwarded-port'] headers instead.](For your purposes, it means that all HTTP requests will appear to come from the same req.socket.remoteAddress, so you'll have to look at the req.headers['x-forwarded-for' and req.headers['x-forwarded-port'] headers instead.)

And of course, this comes along with a new version of Cloud Analytics which can interpret these headers for you to show the origin of all your incoming HTTP requests on a heatmap in real time.

If you really need a public IP address for some reason, you can upgrade at any time to a full-on SmartMachine. There are lots of options to choose from.

No Space Commits: node-service-deploy
===
One of the biggest complaints we heard about a git-push deployment model is that sometimes you want to re-run the deployment process when something goes wrong. However, because of how git works, just running git push again won't actually do anything if there aren't new commits to push. So, what do you do? You add a space or a semicolon to a file, commit it with a message like, Something dumb just to restart the server, and then git push. It makes the commit history look pretty silly.

With the new version of the no.de service, you can manually run the node-service-deploy <commit-ish> script to run the deployment process at any time. The commit-ish argument defaults to master, so just running node-service-deploy is exactly like doing a git push, but without requiring an additional "space commit".

npm Integration
===
If you provide a package.json file with a set of dependencies and a start script, then the no.de system will see that and make sure that your dependencies are installed, and run your start script. The default npm start script is node server.js if there's a server.js file present, so if you were doing things without a package.json file before, then it'll keep working as it did before.

Since your package gets started using npm, this also means that all the npm config information is available in process.env. To set a custom environment variable, you can put it in your package.json file in the config hash, or log in and run npm config set foo=bar in your machine.

A bunch more detail can be found on the wiki

Updated Platform
===
This release comes along with an update to the underlying operating system that powers Joyent's cloud, SmartOS. This means:

*  Updates to the administration portal.
*  New instrumentations in the Cloud Analytics system.
*  Updated packages and operating system features on the machines.
Some of these changes should be mostly unnoticeable, but the added stability and introspection means that bugs and issues will be fewer and easier to fix.

The Past
===
If you had a no.de machine already, don't worry. There are no plans to take it away or make any changes to it.

However, if you want access to these newer features, you'll have to provision a machine on the new v2 system.

The Future
===
Stay tuned for more features and functionality coming to the no.de service in the future. SmartOS and SDC are under active development, and will keep getting better, and of course Node is moving at breakneck speed.
