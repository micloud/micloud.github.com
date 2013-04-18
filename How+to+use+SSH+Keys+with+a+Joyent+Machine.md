SmartMachine連線教學
===
MiCloud上連線SmartMachine或Linux的方式，為使用SSH(Security Shell)之連線方式，並預設透過事先產生並匯入MiCloud之SSH-Key連線，且每台主機均預設以root帳號連線，您將有該主機之最大權限。SSH Key將由客戶自行產生，並且自行上傳SSH Key中公鑰(Public Key)部分，MiCloud將不擁有您的私鑰，亦即代表MiCloud無權限侵入您的系統。而SSH-Key的產生、上傳與管理，請參考下面說明：
*  [使用Windows連線SmartMachine](SSH KeyGen & Connect Tutorial - Windows)
*  [使用Linux連線SmartMachine](SSH KeyGen & Connect Tutorial - Linux or Unix)
*  [使用Mac連線SmartMachine](SSH KeyGen & Connect Tutorial - MacOS)

附註：MiCloud上SmartOS與Linux對於SSH Key支支援程度不同，任何時間上傳的SSH Key均可即時生效來登入SmartOS系統，但Linux系統之SSH Key必須於主機建立之前匯入MiCloud，方可認證於該Linux系統。因此如您有申請MiCloud上之Linux，請務必於主機建立之後進行更換root密碼動作或另外新增管理權限帳號，並妥善保存您的帳號及密碼，避免SSH Key遺失後無法登入系統。
