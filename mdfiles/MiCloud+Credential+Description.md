

預載程式之預設密碼
===
登入 MiCloud 完成後能在畫面左上方點選主機，在從下方表格點選您的主機查看細項。
<img src='images/MiCloud+Credential+Description-p1+-21.png' width='650' align='center'/>
進入查詢細項頁面，可於 __概述__ 中找到 __Credentials__ 欄位,左鍵點擊 __Show Credentials__，查看該台主機預載程式之密碼。


<img src='images/MiCloud+Credential+Description-p1+-18.png' width='650' align='center'/>


登入帳號與密碼說明如下:




| ROLE   | 功能   | 登入帳號  | 登入步驟 |
| ------ | ------ | -------- | ------- |
| root   | 系統帳號 | root  | 登入：ssh root@your.ip.address<br>密碼：本表格root密碼 |
| admin  | 系統帳號 | admin | 登入：ssh admin@your.ip.address<br>密碼：本表格admin密碼 |
| mysql  | MySQL資料庫帳號 | root | 登入：mysql -uroot -p<br>密碼：本表格mysql密碼 |
| pgsql  | PostgreSQL資料庫帳號 | postgres | 登入：/opt/local/bin/psql -U postgres<br>密碼：(此時輸入pgsql密碼欄位) |
| virtualmin  | Virtualmin系統管理工具帳號 | admin | 啓動服務：svcadm enable webmin<br>連線：https://your.ip.address:10000/<br>帳號：admin<br> 密碼：本表格virtualmin密碼 |
| jill  | 系統帳號 | jill | 登入：ssh jill@your.ip.address<br>密碼：本表格jill密碼 |
| zxtm  | 負載平衡服務帳號 | admin | 連線：h ttp://your.ip.address:9090 <br>帳號：admin<br>密碼：本表格zxtm密碼 |



----

修改預設密碼
===
SmartOS修改密碼，修改root密碼，指令如下


```
#passwd
```


<img src='images/MiCloud+Credential+Description-clip-image001.jpg' width='650' align='center'/>


修改Mysql密碼，先登入mysql後再執行修改密碼，登入指令如下，此時密碼為主機細項上所預設的密碼:


```
#mysql -u root -p

```

修改密碼指令如下:



```
mysql> SET PASSWORD FOR root@localhost=PASSWORD('yournewpassword'); 
```


<img src='images/MiCloud+Credential+Description-clip-image002.jpg' width='650' align='center'/>



如欲更改其他帳戶之密碼，請於root執行下方指令。



```
#passwd admin
```

<img src='images/MiCloud+Credential+Description-clip-image003.jpg' width='650' align='center'/>
