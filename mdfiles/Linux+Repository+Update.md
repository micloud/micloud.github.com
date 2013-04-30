Server Repository Update
===

MiCloud為維護全球使用者的利益以及OS廠商之版本著作權益，我們提供的Linux主機會盡量維持原廠登錄的Repository，如果您希望指定特定的Repository出處，可參考Wiki來修改至您偏好的下載點。

Ubuntu/Debian Repository
===
Repository定義檔位置：/etc/apt/sources.list.d/*.list
ex: 以安裝10gen Repository(for install mongodb)為例：在Repository定義檔位置新增加10gen.list檔案，指向10gen版本庫位置：

```
echo "deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen"

> /etc/apt/sources.list.d/10gen.list
```

建立好版本庫位置後，可以更新並安裝其上套件：

```
sudo apt-get update
sudo apt-get install mongodb-10gen
```


CentOS/Fedora Repository
===
Repository定義檔位置：/etc/yum.repos.d/*.repo
ex: 以安裝10gen Repository(for install mongodb)為例：在Repository定義檔位置新增加10gen.repo檔案，指向10gen版本庫位置：

```
# sudo vi /etc/yum.repos.d/10gen.repo
(新增下面內容)

[10gen]]([10gen)
name=10gen Repository
baseurl=http://downloads-distro.mongodb.org/repo/redhat/os/x86_64
gpgcheck=0
enabled=1
```

建立好版本庫位置後，可以更新並安裝其上套件：

```
yum update
yum install mongo-10gen mongo-10gen-server
```

