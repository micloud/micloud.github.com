As of the August 2011 v2 release of no.de, npm is much more tightly integrated into the service.

__server.js → package.json__
Previously, you had to add a server.js file to your git repository and push it to no.de. Any dependencies had to be bundled and checked into git. This sometimes raised problems if the dependency had a .gitignore, or needed to be built on the target architecture.

Also, some people didn't really want to have a single server.js file as the way to start their app. If you wanted to start it with cluster, or write your app in coffee-script, you'd have to bootstrap it with a server.js which was sometimes a bit clumsy.

In v2, if you have a package.json file, then you can specify dependencies, add custom configurations, and define a custom start command. Since the scripts.start member defaults to node server.js, the old style still works.

Also, if you define a server.js file, but no package.json, then the deploy system will create a package.json for you, and all will still be well.

See npm help json for everything you can put in your package.json file. For the purposes of this doc, what's most important are the dependencies, scripts.start, and config fields.

dependencies
===
Let's say you have something like this in your package.json file:



```
{ "name": "my-program"
, "version": "1.2.3"
, "dependencies": { "express": "2.0" } }
```



When you push the code to your no.de machine, it'll set things up so that some version of express >=2.0.0 and <2.1.0 is installed and ready to be require()'d.

Binary dependencies can be specified as well, though since they can sometimes take a while to build, you may want to log in and pre-install them. More on that below.

scripts.start
===
Let's say that you like Coffee Script, and want to have the service run coffee server.coffee rather than a node server.js. No problem! Just add coffee-script as a dependency, and then the appropriate start script.


```

{ "name": "my-program"
, "version": "1.2.3"
, "dependencies": { "express": "2.0", "coffee-script": "1.1" }
, "scripts": { "start": "coffee server.coffee" } }
```



Just make sure that there actually is a server.coffee file in your repo, or else that'll of course fail.

config
===
There are a lot of times where you want to push some random config params to your service. When npm runs scripts, all of the config options and package.json fields are available in the environment. Since your server is started using the npm start command, this means that those settings are available to your no.de program.

Additionally, the config field in the package.json file can be used to supply per-package config fields that won't be overwritten in new versions. This makes it easy to configure your program to run differently on your laptop than it does on no.de. See the section entitled Per-Package Config Settings in npm help config.

For example, let's say that you had the following package.json:



```
{ "name": "my-program"
, "version": "1.2.3"
, "dependencies": { "express": "2.0" } }
, "config":
{ "_some-private-api-key": "TESTING"
, "server-environment": "development" } }
```



Then your script would see the following items in process.env:



```
{
// ... lots of npm_config_var: 'value' ...
npm_package_name: 'my-program',
npm_package_version: '1.2.3',
npm_package_dependencies_express: '2.0',
npm_package_scripts_start: 'node server.js',
npm_package_config__some_private_api_key: 'TESTING',
npm_package_config_server_environment: 'development'
}
```



Note the double underscore in npm_package_config__some_private_api_key. That leading underscore means that it's a private configuration param that will not be shared with any other packages that may be installed on the zone. (Of course, since it's in the environment, it will be shared with any child processes, if you don't override the env.)

If you want to change some of those values, then ssh into your no.de machine, and do this:



```
npm config set my-program:server-environment="no.de"
npm config set my-program:_some-private-api-key="the.actual.api.key"
```



And then restart or redeploy your program.

Now, process.env will have these keys:



```
{
// ... lots of npm_config_var: 'value' ...
// ... other npm_package_* values ...
npm_package_config__some_private_api_key: 'the.actual.api.key',
npm_package_config_server_environment: 'no.de'
}
```



and additional deploys will not override those configs, since they're stored outside of your package in the ~/.npmrc file.

Speeding Up Dependency Installs
===
If you have a lot of dependencies, then you may find that it takes a little while to deploy, since it has to fetch those every time. You can speed it up considerably by logging into your no.de machine, and installing those packages globally.



```
npm install -g express@2.0 request dnode socket.io async underscore vows mongodb
```



Then, each deploy will use the same symlinked copy of those dependencies.
