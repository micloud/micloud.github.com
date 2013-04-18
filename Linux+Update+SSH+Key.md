Linux主機更新SSH Key
===
MiCloud Linux主機於開通主機時會將您帳戶資料中之SSH Key匯入新開通的Linux主機中，匯入的目錄位於：$HOME/.ssh/authorized_keys檔案中，此為一次性設定，日後再登錄至MiCloud Customer Portal之SSH Key將不會再寫入Linux主機中(SmartOS之認證為結合SSH Key Database之認證，因此不在此限制下)。若您需要更新SSH Key，可採下面步驟：


*  產生SSH Key:
請參考：“MiCloud自助服務操作資訊 > SSH金鑰相關使用教學”中金鑰產生部分。


*  將Public Key寫入Server端$HOME/.ssh/authorized_keys檔案中，以斷行隔開

```vi $HOME/.ssh/authorized_keys```

增加您產生的public key至該檔案中
