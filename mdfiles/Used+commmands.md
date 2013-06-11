常用指令集
===

各版本套件指令比較表
雖然目前許多市面常見的作業系統例如Ubuntu、Debian、CentOS、Fedora，甚至是目前Micloud所用的SmartOS都是以linux為底的架構。不過由於開發人員的不同在指令的操作上也會有稍稍的不同，在套件的指令集中，我們利用列表來比較各版本不同的指令:



||Ubuntu、Debian  |CentOS、Fedora |SmartOS
|-|----|----|----|
|查詢已安裝的套件 |apt-cache pkgnames     |yum list              |pkgin list
|查詢套件可安裝套件的名稱或關鍵字 | apt-cache search "套件名稱"或apt-cache search "關鍵字" |yum search "套件名稱"或yum search "關鍵字"  |pkgin search "套件名稱"或pkgin search "關鍵字"
|安裝套件 |apt-get install "套件名稱"     |yum install "套件名稱"    |pkgin install "套件名稱"
|移除套件 |apt-get remove "套件名稱"      |yum remove "套件名稱"     |pkgin remove "套件名稱"
|升級所有己安裝的最新列表 |apt-get update     |yum update               |pkgin update
|下載檔案 |wget "網址"                   |wget "網址"               |wget "網址"
|複製檔案 |cp "來源檔"  "目的檔"          |cp "來源檔"  "目的檔"      |cp "來源檔"  "目的檔"
|刪除檔案 |rm "檔案或目錄"                |rm "檔案或目錄"            |rm "檔案或目錄"
|檢視檔案內容 |cat "檔案名稱"                |cat "檔案名稱"             |cat "檔案名稱"
|切換目錄 |cd "相對路徑或絕對路徑"         |cd "相對路徑或絕對路徑"     |cd "相對路徑或絕對路徑"
|顯示所在目錄 |pwd                          |pwd                       |pwd
|檢視目錄下的檔案 |ls                          |ls                         |ls
|重新開機 |reboot                      |reboot                     |reboot
