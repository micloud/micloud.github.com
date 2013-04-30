Stingray基本操作說明
===



簡介
===
Stingray原名Zeus，為Riverbed公司所購買之Zeus公司產品，專職負載平衡與網路流量管理相關功能。


研究Stingray的緣起是越來越多的專案使用到網路層的Load Balancer，因大型的軟體架構中，時常需要有負載平衡及Cluster的架構，而仰賴Apache或是簡單的Load Balancer軟體常常不能滿足需求，而硬體方式的Load Balancer像是BigIP或是Cisco相對應的負載平衡設備都往往超出預算而又超出一般軟體工程師可以觸及的範圍，在這些條件之下，Stingray反而圖顯了一些他存在的重要性。


<img src='images/Stingray+SmartMachine-p1.PNG' width='650' align='center'/>
Stingray的許多特性，造就他在雲端服務存在的必要性，排除原廠所簡介的特性，這邊以使用者觀點就價值核心的部份列出給大家參考：
*  本身為軟體：這部份對軟體工程師而言是好消息，不需觸及硬體部份即可將一些網路之構想以Stingray所提供之介面實現，當然設定者本身也必需具備部份網路架構之基礎，方可收事半功倍之成效。另外，不少網路設備提供可程式化介面，但往往由於網路設備下所關係到的節點數量龐大，導致安全性上考量而無法釋放給軟體工程師太多空間進行管理與設定，而本身為軟體的優勢，讓您可以在任何節點部署架構，而佈至於影響到太多的網路節點。
*  提供各種程式語言實作之API介面：提供各種語言之API介面，也是方便系統架構與軟體工程師之特性，這部份讓系統環境中許多不定因素或是需要大量判斷之路由規則不在是夢想。
*  提供友善的Web管理界面：Web的管理介面通常是一套系統必備的工具，而Stingray提供的Web介面也出奇的簡單，並可在介面中對軟體或系統進行重新?動的操控，這部份也讓管理者可以減少在外部網路環境還需要SSH連線到作業系統的需求。
*  目前Stingray系列以model區分有三個系列：1000 Model, 2000 Model, 4000 Model，功能模組上稍有差異，其中2000系列以上提供的Global Load Balancing是最大差異，該功能提供使用者可以依地區性來進行區域網址的導向，簡單的說，就是可以做到讓美國的IP連線美國的主機、台灣的IP連線台灣的主機...
*  其他有些不錯的功能像頻寬管理、服務等級監控...等功能也是2000以上系列才有提供，不過這些開發測試版本都可以直接使用喔，唯差在頻寬限制而已...
<img src='images/Stingray+SmartMachine-p2.PNG' width='450' align='center'/>
Stingray價目表，參考至官網
在官方網站簡介中，Stingray之安裝規格最小為2GB，1GB的Ubuntu(LINUX)亦可以正常安裝，且可以運作，但是考慮到穩定性，建議還是依照官方建議規格進行安裝。
<img src='images/Stingray+SmartMachine-p3.PNG' width='550' align='center'/>
表：建議安裝規格
相關字彙
===
在操作Stingray的過程中，常會遇到許多設定上的專有名詞，在此特別介紹一些使用上必備的專有名詞，在介紹之前，請先一起看一下Stingray的環境架構圖，其中上部箭頭代表request的來源，所有網路流量經由Stingray的對外IP:PORT進入，而此IP:PORT則是綁定在一臺Stingray設定的Virtual Server上，Virtual Server則可值接或間接(經由Rule重新導向)將需求導向到已設定之Pool，這樣就完成一個簡單的request重新導向的動作。而在這部份，Pool, Virtual Server, Rule...是Stingray的專有名詞，另外，如果您的服務是佈局全球，則您會需要GLB(Global Load Balancer)的服務，他可以幫助您視連線IP之地理位置而將IP導向最近的服務器位置。

連線MiCloud Stingray Service
===
<img src='images/Stingray+SmartMachine-stingray-machine.png' width='650' align='center'/>
MiCloud Stingray Appliance申請完成後，您可以在MiCloud Portal中該服務之資訊頁面看到相關連線資訊，其中點選credentials按鈕後可以找到您的登入密碼，登入時，請使用admin為登入帳號，並建議登入後，重設您的密碼。

Pool
===
Pool在Stingray中是一個以上的IP:PORT的代表，也是Stingray連線的出口位置，當有request指入時，Stingray會依照設定將request導至被指定的Pool上binding的主機IP:PORT位置。

Virtual Server
===
Virtual Server是Stingray環境中的一個入口代表，他會是Stingray本身之IP與一個PORT的結合。Stingray主機使用此一設定作為對外服務的一個端口，讓request由此進入，然後在導向配置的動作。

Rule
===
Rule為Virtual Server存取後方主機的規則，透過規則的管理，可以建置您伺服器群組上的規劃與應用。

GLB
===
Global Load Balancer，全球化的負載平衡，參考網路上相關論作(服務負載平衡)，GLB為提供全球的使用者，依照IP所對應之地理位置再進行重新導向到就近地區之服務提供伺服器之用。

Multi-Site Manager
===
提供串聯跨DataCenter之服務功能，讓不同的DataCenter中的主機可以達到負載平衡之目的。



基本操作介面
===
Stingray介面中以簡單的幾個區塊負責不同的功能模組之顯示，表頭部份包含有伺服器狀態列、工具列等資訊。其中狀態列顯示目前伺服器運作狀態，以便隨時在操作時候可以知道目前環境狀態：而Menu區塊則將Stingray之功能分模組顯示，另外的其他地方，則是用來顯示目前工作狀態與設定畫面的工作區域，其中，首頁的工作區域包含Traffic Manager狀態、服務中的Service與狀態、事件檢視等。

<img src='images/Stingray+SmartMachine-p4.PNG' width='650' align='center'/>

基本附載平衡功能實作
===
情境說明：
===
這邊實做一個簡單的Stingray的路由範例，目的是希望讓A IP的路由可以經由Stingray Server重新導向，此應用可作為DMZ與Server Farm之單一伺服器路由重導之實現，讓應用程式伺服器(如Tomcat, Weblogic, Websphere...)資源可透過DMZ網段之伺服器重導後提供服務於外部網路。
<img src='images/Stingray+SmartMachine-p5.PNG' width='350' align='center'/>
步驟一：設定Pool
===
在此我們要設定一個名稱為"PHTTP_245.11_PORT8080"的Pool，Pool的Name可以是任何文字，而Node的部份則為[IP]:[PORT]的一組數值，其中IP可以是Stingray伺服器對應得到的一組DNS名稱。](在此我們要設定一個名稱為"PHTTP-245.11-PORT8080"的Pool，Pool的Name可以是任何文字，而Node的部份則為[IP:[PORT]的一組數值，其中IP可以是Stingray伺服器對應得到的一組DNS名稱。)
在此範例中，Stingray伺服器位置為：211.78.245.31，而欲導向之伺服器位置為211.78.245.11:8080，並有一資源位置http://211.78.245.11:8080/test.html

<img src='images/Stingray+SmartMachine-p6.PNG' width='650' align='center'/>

步驟二：設定Virtual Server
===
在此我們設定一個名稱為"VS_HTTP_PORT8088"的Virtual Server，Virtual Server之語意為虛擬之伺服器位置，透過Stingray對應之IP:PORT來使用此虛擬伺服器或伺服器群組，設定上必需要指定此Virtual Server要使用的協定，在此我們設定HTTP協定作為Virtual Server的協定，並選擇步驟一之"PHTTP_245.11_PORT8080"作為此Virtual Server欲導向之伺服器位置，設定完成後按下"Create Virtual Server"按鈕，則可建立Virtual Server。

<img src='images/Stingray+SmartMachine-p7.PNG' width='450' align='center'/>

步驟三：啟動Virtual Server
===
建立好之Virtual Server預設並未啟動，必需再點選該Virtual Server後，將Enabled調整至"Yes"後，點選"Update"按鈕後，才會?動方才之設定。

<img src='images/Stingray+SmartMachine-p8.PNG' width='650' align='center'/>

步驟四：測試
===
開?瀏覽器，並指向Stingray Server位置：http://211.78.245.31:8088/test.html，預期此網址將會連線至http://211.78.245.11:8080/test.html

<img src='images/Stingray+SmartMachine-p9.PNG' width='650' align='center'/>

Stingray 應用影片[Go to YouTube](http://www.youtube.com/embed/KM5bRJJDDaw)


<iframe width="640" height="480" src="http://www.youtube.com/embed/KM5bRJJDDaw?rel=0" align="center" frameborder="0" allowfullscreen ></iframe>
