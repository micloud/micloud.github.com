The latest version of npm only works with fairly recent versions of node. If you signed up with the no.de service in one of the very first pre-release betas, you might be using a very old version of Node.js™, and npm update won't quite work properly. You'll see stuff like this:



```
[node@izs ~]$ npm update]([node@izs ~$ npm update)
npm info it worked if it ends with ok
npm info version 0.2.2
npm info updates npm@0.3.11
npm info fetch http://registry.npmjs.org/npm/-/npm-0.3.11.tgz
npm info install npm@0.3.11
npm ERR! install failed Error: Required package: semver(1) not found.
npm ERR! install failed     at /home/node/.node_libraries/.npm/npm/0.2.2/package/lib/build.js:139:25
npm ERR! install failed     at cb (/home/node/.node_libraries/.npm/npm/0.2.2/package/lib/utils/graceful-fs.js:28:9)
npm ERR! install failed     at node.js:764:9
npm info install failed rollback
npm info not installed npm,0.3.11
npm info install failed rolled back
npm ERR! install failed npm@0.3.11,semver@1
npm info failed to update npm@0.3.11
npm ERR! Error: Required package: semver(1) not found.
npm ERR!     at /home/node/.node_libraries/.npm/npm/0.2.2/package/lib/build.js:139:25
npm ERR!     at cb (/home/node/.node_libraries/.npm/npm/0.2.2/package/lib/utils/graceful-fs.js:28:9)
npm ERR!     at node.js:764:9
npm ERR! try running: 'npm help update'
npm ERR! Report this *entire* log at <http://github.com/isaacs/npm/issues>
npm ERR! or email it to <npm-@googlegroups.com>
npm not ok
```



Updating to the Latest npm
===

Chances are that there's a very old version of npm installed in your home directory, and you need to move that away so that you can use the global npm installed in /opt/nodejs/bin. Try doing this:



```
npm rm npm
hash -r
which npm  # => /opt/nodejs/bin/npm
```



Of course, this command should always work:



```
curl http://npmjs.org/install.sh | sh
```



If it doesn't, then please post an issue at https://github.com/isaacs/npm/issues

Use a More Recent Version of Node.js
===

The Node.js version in the no.de machines is determined by the ~/local/nodejs symbolic link. When your Node.js SmartMachine is created, this link points to the then-most-recent version of Node.js, so that you can deploy code without it changing out from under you, which is generally good.

See Setting the Node.js Version to learn how to set the version of Node.js that your application uses.
