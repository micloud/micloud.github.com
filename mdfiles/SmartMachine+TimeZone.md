設定SmartMachine上的時區
===
選擇TimeZone時區
===

```
[root@XXXX /opt/local/etc/nginx]# tzselect]([root@XXXX /opt/local/etc/nginx# tzselect)
Please identify a location so that time zone rules can be set correctly.
Please select a continent or ocean.
1) Africa
2) Americas
3) Antarctica
4) Arctic Ocean
5) Asia
6) Atlantic Ocean
7) Australia
8) Europe
9) Indian Ocean
10) Pacific Ocean
11) none - I want to specify the time zone using the POSIX TZ format.
#? 5
Please select a country or region.
1) Afghanistan                                            26) Laos
2) Armenia                                                27) Lebanon
3) Azerbaijan                                             28) Macao
4) Bahrain                                                29) Malaysia
5) Bangladesh                                             30) Mongolia
6) Bhutan                                                 31) Myanmar (Burma)
7) Brunei                                                 32) Nepal
8) Cambodia                                               33) Oman
9) China                                                  34) Pakistan
10) Cyprus                                                 35) Palestine
11) East Timor                                             36) Philippines
12) Georgia                                                37) Qatar
13) Hong Kong                                              38) Russia
14) India                                                  39) Saudi Arabia
15) Indonesia                                              40) Singapore
16) Iran                                                   41) Sri Lanka
17) Iraq                                                   42) Syria
18) Israel                                                 43) Taiwan
19) Japan                                                  44) Tajikistan
20) Jordan                                                 45) Thailand
21) Kazakhstan                                             46) Turkmenistan
22) Korea (North)                                          47) United Arab Emirates
23) Korea (South)                                          48) Uzbekistan
24) Kuwait                                                 49) Vietnam
25) Kyrgyzstan                                             50) Yemen
#? 43

The following information has been given:

Taiwan

Therefore TZ='Asia/Taipei' will be used.
Local time is now:       Tue Nov  1 18:33:44 CST 2011
Universal Time is now:   Tue Nov  1 10:33:44 UTC 2011
Is the above information OK?
1) Yes
2) No
#? 1
Here is the TZ value again, this time on standard output:
Asia/Taipei

```


修改Time Zone設定擋
===

```
[root@XXXX /opt/local/etc/nginx]# vi /etc/default/init]([root@XXXX /opt/local/etc/nginx# vi /etc/default/init)
```


修改TZ設定內容為Asia/Taipei
===

```
TZ=Asia/Taipei
```


重新開機生效
===
