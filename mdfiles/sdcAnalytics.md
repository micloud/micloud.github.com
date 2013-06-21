MiCloud API Analysis
===

MiCloud繼承Joyent的雲端平台，提供有一個進階的服務監控方式 -- Dtrace，這是個非常進階的狀態監控系統，原生於Solaris Unix上，已有Mac與SmartOS的實作套件，亦可於MiCloud環境上直接使用。本篇講解如何使用CloudAPI操作此部份分析功能…
首先請大家先準備好Node.js環境與CloudAPI，假設大家已經安裝好Node.js，那只要透過下面指令就可以安裝CloudAPI(由於SDC環境持續改板中，請安裝對應目前MiCloud環境的smartdc套件，目前選定的是6.5.4版本的smartdc): 

```
npm install smartdc@6.5.4
```

安裝好相關套件後，可以透過sdc-describeanalytics指令查詢有哪些可用分析：

```
$ sdc-describeanalytics
```

針對回應的部份將會相當長…其中切幾個部分來看：
(1). 模組概述： 此部份為所有監控項目的大略說明

```
{
  "modules": {
    "cpu": {
      "label": "CPU"
    },
    "memory": {
      "label": "Memory"
    },
    "mysql": {
      "label": "MySQL"
    },
    …(略)
    "zfs": {
      "label": "ZFS"
    }
  },
```

(2). 欄位說明： 此部份為每種欄位的設定說明

``` 
  "fields": {
    "zonename": {
      "label": "zone name",
      "type": "string"
    },
    "pid": {
      "label": "process identifier",
      "type": "string"
    },
    "execname": {
      "label": "application name",
      "type": "string"
    },
    …(略)
    "errno": {
      "label": "error code",
      "type": "string"
    },
    "zdataset": {
      "label": "ZFS dataset",
      "type": "string"
    }
  },
```

(3). 型別說明：此部份說明於分析上定義的基本資料型態有哪些...

```
  "types": {
    "string": {
      "name": "string",
      "arity": "discrete",
      "unit": ""
    },
    "subsecond": {
      "arity": "numeric",
      "unit": "seconds",
      "abbr": "s",
      "base": 10,
      "power": -3,
      "name": "subsecond"
    },
    …(略)
    "number": {
      "arity": "numeric",
      "name": "number",
      "unit": ""
    }
  },
```

(4). 可用監控設定說明： 這個是主要監控要設定的參考值...

```
  "metrics": [
    {
      "module": "cpu",
      "stat": "thread_samples",
      "label": "thread samples",
      "interval": "interval",
      "fields": [
        "zonename",
        "pid",
        "execname",
        "psargs",
        "ppid",
        "pexecname",
        "ppsargs",
        "subsecond"
      ],
      "unit": "samples"
    },
    {
      "module": "cpu",
      "stat": "thread_executions",
      "label": "thread executions",
      "interval": "interval",
      "fields": [
        "zonename",
        "pid",
        "execname",
        "psargs",
        "ppid",
        "pexecname",
        "ppsargs",
        "leavereason",
        "runtime",
        "subsecond"
      ],
      "unit": "operations"
    },…(略)
    {
      "module": "zfs",
      "stat": "dataset_quota",
      "label": "quota size",
      "interval": "point",
      "fields": [
        "zdataset"
      ],
      "type": "size"
    }
  ],
```
(5). 轉換說明：此部份可以透過IP轉換地理位置，來進階顯示於世界地圖上…

```
  "transformations": {
    "geolocate": {
      "label": "geolocate IP addresses",
      "fields": [
        "raddr"
      ]
    },
    "reversedns": {
      "label": "reverse dns IP addresses lookup",
      "fields": [
        "raddr"
      ]
    }
  }
}
```

建立分析項目前，我們先來看看建立分析的指令… 

```
$ sdc-createinstrumentation --help
sdc-createinstrumentation [--account string] [--clone number] [--debug boolean] [--decomposition string] [--help boolean] [--identity path] [--keyId string] [--module string] [--predicate string] [--stat string] [--url url]
```

這邊我們先測試監控cpu的值，使用"--module cpu --stat usage"來建立分析項目，而執行後，系統匯吐回完整的設定值：

```
$ sdc-createinstrumentation --module cpu --stat usage
{
  "module": "cpu",
  "stat": "usage",
  "predicate": {},
  "decomposition": [],
  "value-dimension": 1,
  "value-arity": "scalar",
  "enabled": true,
  "retention-time": 600,
  "idle-max": 3600,
  "transformations": {},
  "nsources": 0,
  "granularity": 1,
  "persist-data": false,
  "crtime": 1371829609584,
  "value-scope": "point",
  "id": "3",
  "uris": [
    {
      "uri": "/peihsinsu@hotmail.com/analytics/instrumentations/1/value/raw",
      "name": "value_raw"
    }
  ]
}
```

植入監控後，接下來就是採收了，剛剛上面的監控設定好後，有回傳整個監控的詳細設定，其中有個id欄位，是整個監控取值的重點，透過sdc-getinstrumentation加上id來取回監控的結果…
首先來看看sdc-getinstrumentation可以使用哪些參數：

```
$ sdc-getinstrumentation --help
sdc-getinstrumentation [--account string] [--debug boolean] [--help boolean] [--identity path] [--keyId string] [--value boolean] [--url url]  instrumentation_id
```

這邊我們使用"--value true"來指定回傳部分為值，並在最後帶入"3"，就是剛剛建完監控所回傳的id欄位值，然後我們可以得到下面的結果：

```
$ sdc-getinstrumentation --value true 3
{
  "value": 0,
  "transformations": {},
  "start_time": 1371829715,
  "duration": 1,
  "end_time": 1371829716,
  "nsources": 1,
  "minreporting": 1,
  "requested_start_time": 1371829715,
  "requested_duration": 1,
  "requested_end_time": 1371829716
}

 SimonAIR in ~
○ → sdc-getinstrumentation --value true 3
{
  "value": 48,
  "transformations": {},
  "start_time": 1371829863,
  "duration": 1,
  "end_time": 1371829864,
  "nsources": 1,
  "minreporting": 1,
  "requested_start_time": 1371829863,
  "requested_duration": 1,
  "requested_end_time": 1371829864
}
```

但是當我們有一台以上機器時候，上面這樣的結果值就很難滿足我們監控的需求，這時候可以加入decomposition藍未來將結果做某個屬性的分類… 下面是使用zonename(就是主機建立時候系統所給予的主機ID)來建立的監控：

```
$ sdc-createinstrumentation --module cpu --stat usage --decomposition zonename
{
  "module": "cpu",
  "stat": "usage",
  "predicate": {},
  "decomposition": [
    "zonename"
  ],
  "value-dimension": 2,
  "value-arity": "discrete-decomposition",
  "enabled": true,
  "retention-time": 600,
  "idle-max": 3600,
  "transformations": {},
  "nsources": 0,
  "granularity": 1,
  "persist-data": false,
  "crtime": 1371830663771,
  "value-scope": "point",
  "id": "4",
  "uris": [
    {
      "uri": "/peihsinsu@hotmail.com/analytics/instrumentations/4/value/raw",
      "name": "value_raw"
    }
  ]
}
```
建立完成後，取值就會發現value部分將會帶出每台主機的ID，並且匯顯示對應的值...

```
$ sdc-getinstrumentation --value true 4
{
  "value": {
    "4066be38-321a-4884-8979-d8629284d2d0": 0
  },
  "transformations": {},
  "start_time": 1371830729,
  "duration": 1,
  "end_time": 1371830730,
  "nsources": 1,
  "minreporting": 1,
  "requested_start_time": 1371830729,
  "requested_duration": 1,
  "requested_end_time": 1371830730
}
```

另外，下面換監控記憶體的使用量，採用"--module memory --stat rss"來監控主機，一樣以"--decomposition zonename"來分類...

```
$ sdc-createinstrumentation --module memory --stat rss --decomposition zonename
{
  "module": "memory",
  "stat": "rss",
  "predicate": {},
  "decomposition": [
    "zonename"
  ],
  "value-dimension": 2,
  "value-arity": "discrete-decomposition",
  "enabled": true,
  "retention-time": 600,
  "idle-max": 3600,
  "transformations": {},
  "nsources": 0,
  "granularity": 1,
  "persist-data": false,
  "crtime": 1371830787956,
  "value-scope": "point",
  "id": "5",
  "uris": [
    {
      "uri": "/peihsinsu@hotmail.com/analytics/instrumentations/5/value/raw",
      "name": "value_raw"
    }
  ]
}
```
接下來可以透過sdc-getinstrumentation來取值… 此時搭配json commond line tool可以更有效率的切割資料...

```
$ sdc-getinstrumentation --value true 5 | json value
{
  "4066be38-321a-4884-8979-d8629284d2d0": 84439040
}
```
當系統希望取記憶體使用數值來做其他處理時，我們也可以透過下面的方式，只把"值"取出來就好...

```
$ sdc-getinstrumentation --value true 5 | json value.4066be38-321a-4884-8979-d8629284d2d0
84439040
```
PS: 關於json command tools，請參考：[http://opennodes.github.io/wiki/index.html?page=jsontool.md](http://opennodes.github.io/wiki/index.html?page=jsontool.md)