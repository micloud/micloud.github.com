MiCloud API
===
本文件為MiCloud API之簡短說明文件，MiCloud使用Joyent服務，進行IaaS環境部署，基於Joyent提供之API套件進行MiCloud API相關功能之提供。








MiCloud API簡介
===

何謂MiCloud API?
===

MiCloud API 為提供一個與MiCloud平台(SmartDataCenter，文件後面簡稱為SDC)完整介接之應用程式介面，透過該介面您可以：
*  進行雲端主機之建立與管理(此部份將包含SmartMachine與Linux/Windows主機)
*  管理您的雲端帳戶以及相關之認證權限事宜
*  建立屬於您專屬的分析與監控儀表版

如何存取MiCloud API?
===

MiCloud API為以REST API為呈現方式的介面,您可以透過下面方法與MiCloud API進行介接：
*  WEB存取方式：SmartDataCenter Customer Portal (http://micloud.tw)
*  指令列存取方式：Command line interface (CLI)
*  Node.js程式化介面：node.js SDK
*  REST API協定

開始使用MiCloud API
===

在開始使用MiCloud API前，請先確認您的環境已經安裝下述套件，如未安裝，請依照下面鏈結安裝：
*  Node.js
*  NPM

安裝完成後，您可以透過下面指令安裝MiCloud API之工具程式：


```
npm install smartdc -g
```

%%

MiCloud API為以REST為協定，並以JSON為呈現之工具，為了輔助您在檢視相關訊息時格式上之排版，請依下面指令下載jsontool：


```
npm install jsontool -g
```

%%

MiCloud API連線位置
===

MiCloud所屬之API連線位置如下：
||DNS Name  ||開放區域  ||Port
|api.micloud.tw  |僅限MiCloud主機連線 |443
PS: 原micloudapi.micloud.tw之DNS已修改為api.micloud.tw。

建立與MiCloud之連線：SSH key建立
===

MiCloud API需透過SSH之連線方式操作，為方便操作以及保護連線密碼，請依下面指令產生所屬之SSH Key，如為Windows平台，則可使用PUTTY之Key Generator工具產生SSH Key：


```
ssh-keygen -b 2048 -t rsa
```

%%

Mac, Linux系統，使用ssh-keygen產生之金鑰會放置於$HOME/.ssh/目錄中，而Windows使用者則可直接指定存放之位置儲存。
設定您的MiCloud API CLI介面
===

產生好SSH Key後，您可以透過下面指令設定好您的CLI環境：


```
sdc-setup https://api.example.com
Username (login): demo
Password:
SSH public key: (/Users/demo/.ssh/id_rsa.pub)
```

%%
使用CLI
===

MiCloud CLI的使用上，您可以透過 command --help 方式查詢該command的使用方法：



```
sdc-listdatacenters --help
sdc-listdatacenters [--account string] [--debug boolean] [--help boolean]](sdc-listdatacenters [--account string [--debug boolean] [--help boolean])
[--identity path] [--keyId string] [--url url]]([--identity path [--keyId string] [--url url])
```




由顯示之提示說明，使用MiCloud API CLI時候，需要指定相關權限與帳號參數：
||CLI Flag	||Description	||Environment Variable
|--account	|login name (account)	|SDC_CLI_ACCOUNT
|--keyId	|name of the key to use for signing	|SDC_CLI_KEY_ID
|--url	|URL of the MiCloud API endpoint	|SDC_CLI_URL

Note that you can use the short form of flags as well. For instance, you can use the -a or the --account flag.
新建立一台SmartMachine主機
===

在MiCloud環境上，您可以透過下面指令來新增一台雲端SmartMachine主機：



```
sdc-createmachine -n getting-started
```




當主機建立完成，您可透過下面方式查詢主機狀態：



```
sdc-listmachines -n getting-started

[
{
"id": "0b97c186-05a5-4113-b05f-3e597e3cf038",
"name": getting-started",
"owner": demo",
"type": "smartmachine",
"state": "running",
"dataset": "smartos-1.3.13",
"ips": [
"10.88.88.50"
],
"memory": 128,
"disk": 5120,
"metadata": {},
"created": "2011-06-27T19:52:40+00:00",
"updated": "2011-06-27T20:08:55+00:00"
}
]
```




當主機狀態回復至running狀態時，您就可以透過SSH連線至您的主機：



```
ssh-add
$ ssh -A admin@10.88.88.50
```




MiCloud相關主機參數：Datasets
===

於MiCloud SDC環境中，您可以透過下面指令取得目前定義中的dataset (dataset為SDC環境中描述IaaS主機類別之描述檔案，開通主機時透過此描述檔案可以決定您開立主機之類別)：



```
sdc-listdatasets
```




您在開立雲端主機時，可透過下面方法指定開啓主機之類別：



```
sdc-createmachine -e sdc:sdc:nodejs:1.2.0 -n getting-started-nodejs
```




MiCloud相關主機參數：Packages
===

另一各常用之主機參數為package，此參數提供主機大小規格之相關資訊，開通主機時透過指定package參數，可以決定開立之主機規格大小，下面為查詢MiCloud SDC現行定義之package內容：



```
sdc-listpackages
```




下面為指定dataset與package之建立主機範例：



```
sdc-createmachine -e sdc:sdc:nodejs:1.2.0 -n big-nodejs -p regular_1024
```




管理您的SSH keys
===

透過下面指令，您可以將SSH Key上傳至MiCloud SDC管理平台，讓之後的連線均直接受到SSH加密保護：



```
sdc-createkey -n my_other_rsa_key ~/.ssh/my_other_rsa_key.pub
```




您可以透過下面指令查詢現行已經同步至SDC環境織金鑰：



```
sdc-listkeys -k my_other_rsa_key
```




當您有一組以上的key時候，您需要指定key之位置，透過下面參數的指定，可以讓smartdc認得您要使用的key：



```
export SDC_CLI_KEY_ID=my_other_rsa_key
```




建立主機分析
===

MiCloud API一樣允許您建立主機之分析，SDC中特有的主機分析提供許多主機上運算與狀態資訊，透過這些資訊，您可以診斷目前環境中的弱點並予以加強，MiCloud API之分析範例(分析vnic支流量狀態)如下：



```
sdc-createinstrumentation -m nic -s vnic_bytes
```




當分析建立完成時，您可以透過連線上您的雲端主機，並操作ping指令：



```
wget joyent.com
$ ping -I 1 joyent.com
```




此時再回分析進行檢視：



```
sdc-getinstrumentation -v 1
```




其中上面指令的”1”是您所見立分析的ID，透過取回分析的指令，您可以完整的監控您的系統。更多詳細的資訊，請參考： Appendix B: Cloud Analytics.
刪除主機
===

MiCloud比對Amazone之收費方式，其上的IaaS服務均是以機器的生成(create)到移除(destroy)區間計費，因此確實的移除主機，方可確認您不會再被收費。而在刪除主機之前，您可以透過下面指令將上面建立的分析刪除：



```
sdc-deleteinstrumentation 1
```




然後透過sdc-stopmachine的指令將主機關閉：



```
sdc-listmachines -n getting-started | json 0.id | xargs sdc-stopmachine
```




關閉之後，透過sdc-deletemachine將主機移除：



```
sdc-listmachines -n getting-started | json 0.state
$ sdc-listmachines -n getting-started | json 0.id | xargs sdc-deletemachine
```




刪除SSH Key

另外，您或許會想要把目前沒用到的SSH Key刪除，透過下面指令可以把SSH Key移除：



```
sdc-deletekey id_rsa
```


