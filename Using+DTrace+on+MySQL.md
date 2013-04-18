In this page:

Using DTrace on MySQL
===
Even though there aren't DTrace probes for MySQL released yet, we can still get useful information from MySQL. DTrace has a pid provider which allows us to get into any function the program is executing and see it's arguments. The only drawback is you have to go digging around in the source code to find out what you want to see. But thanks to guys like Brendan Gregg, they have already done some of the digging for us

Even if we want to go digging around ourselves, it's really not that hard; you just have to get your feet wet. And because SmartMachines have DTrace probes enabled, you can take advantage of using DTrace on MySQL. I will show some examples of this and how easy it is to hunt down your own functions.

First let's start with functions that have already been dug up for us:



```
mysql_parse(thd, thd->query, length, & found_semicolon);
```



This is the function MySQL uses to parse a query. So all we have to do is trace this function through the pid provider and we get to see all the queries coming through. This shows arg1 as being the query, and we must copy it in to kernel land where DTrace works for it to see the string:



```
root@ferrari:~# dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { printf("%Y     %s
n", walltimestamp, copyinstr(arg1)) }' -p `pgrep -x mysqld`
2007 Sep 27 10:04:35     select * from blah
2007 Sep 27 10:04:58     select * from tablenothere
```



Notice that this will show all queries, even if they aren't successful. Now that we can trace queries, this can give us good information. For example we can see what queries are executed the most:



```
root@ferrari:~# dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { @queries[copyinstr(arg1)] = count() }' -p `pgrep -x mysqld`](root@ferrari:~# dtrace -qn 'pid$target:mysqld:*mysql_parse*:entry { @queries[copyinstr - arg1 = count -  }' -p `pgrep -x mysqld`)
^C

select * from blah                                                5
select * from tablenothere                                       10
```



You can't get this kind of information from MySQL unless you write some kind of script to parse through the query log. If we know that there is a query being executed 1000 more times than the others, we could always try to get this one to cache. Now lets say we want to find out how long a query took to execute. The function mysql_execute_command does the actual execution of the queries so all we do here is subtract the entry and return timestamps of this function. The script shown below uses this:



```
root@ferrari:~# ./exactquerytimes.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

Query: SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like '%GOOGLE%' and upper(vs_browser) not like '%GOOGLE BOT%' and upper(vs_browser) not like '%BOT%' and upper(vs_browser) not like '%MSN%' and upper(vs_browser) not like '%MSNBOT%' and upper(,

Time: 2.32
```



On the MySQL side, it showed this query being executed at 2.32 seconds as well:

1 row in set (2.32 sec).

This is awesome information because as of now MySQL doesn't allow you to see a slow query that is less than 1 second (I believe this is a fix in MySQL 5.1). So with this, we can see not just slow queries, but all queries and how long they take to execute with their times.

Now let's try this same query but I bumped my query_cache_size up to 50M:

The first try (won't hit the cache):



```
root@ferrari:~# ./exactquerytimes.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

Query: SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like '%GOOGLE%' and upper(vs_browser) not like '%GOOGLE BOT%' and upper(vs_browser) not like '%BOT%' and upper(vs_browser) not like '%MSN%' and upper(vs_browser) not like '%MSNBOT%' and upper(,

Time: 2.28
```



And the second try hits the cache but doesn't show anything through DTrace. So this means a query that is served from the cache won't show up in mysql_parse. Right now this probably doesn't mean much, but as you learn more about how the internals of MySQL work, then troubleshooting becomes much easier down the road.

So far this has all been information that was provided. Now I will show how simple it is search through MySQL's source and look at functions.

First we need to decide what to look for. Let's say we want to find out every time that slow query is written to the slow query log. First we download the MySQL source code from http://www.mysql.com. Now we can search through the source code for 'slow query':



```
root@ferrari:/export/home/derek/mysql-5.0.45# ggrep -ri 'slow query' *
```



This turns up only a few source code files, one of them looking most obvious called log.cc with the expression "Write to the query log". The MySQL code is very well commented so it makes searching really easy. Looking in this file, that comment is right above the function:



```
/*
Write to the slow query log.
*  /
bool MYSQL_LOG::write(THD *thd,const char *query, uint query_length,
time_t query_start_arg)
```



It's obvious that this function is the function that writes to the slow query log. Running this script below, looking for function LOG while a slow query is being inserted shows this function being executed with some weird characters around it:



```
root@ferrari:~# dtrace -F -n 'pid$1:mysqld:*LOG*:entry {} pid$1:mysqld:*LOG*:return {}' `pgrep -x mysqld`
dtrace: description 'pid$1:mysqld:*LOG*:entry ' matched 126 probes
CPU FUNCTION
0  -> _ZN9MYSQL_LOG5writeEP3THD19enum_server_commandPKcz
0  -> _ZN9MYSQL_LOG5writeEP3THDPKcjl
0  < - _ZN9MYSQL_LOG5writeEP3THDPKcjl
```



The only thing bad about tracing MySQL through the pid provider is that these weird characters change between MySQL versions, so we can't always trace for '_ZN9MYSQL_LOG5writeEP3THDPKcjl' if we want it to work on other machines. We have to trace for MYSQ*LOG*write which slowquerycounts.d uses:



```
root@ferrari:~# ./slowquerycounts.d -p `pgrep -x mysqld`
Tracing... Hit Ctrl-C to end.

SELECT COUNT(*) FROM joe_visitors where  upper(vs_browser) not like '%GOOGLE%' and upper(vs_browser) not like '%GOOGLE BOT%' and upper(vs_browser) not like '%BOT%' and upper(vs_browser) not like '%MSN%' and upper(vs_browser) not like '%MSNBOT%' and upper(

3
```



As you can see DTrace can be very powerful even if we don't have probes released yet, we just have to do a little extra work. Some of the information shown can be obtained from MySQL, but using DTrace still provides a benefit because we don't have to enable anything in the MySQL configuration, possibly making us restart the server. I'm providing these scripts in the [MySQLDTraceKit.tar.gz](http://hell.jedicoder.net/files/MySQLDTraceKit.tar.gz)
Hopefully in the near future we will have real MySQL probes.



----
資料來源：[Joyent Wiki](http://wiki.joyent.com/display/www/Documentation+Home)
