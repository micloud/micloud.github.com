Putty登入SmartOS錯誤訊息：Couldn't agree a client-to-server cipher
===
申請SmartOS之用戶，如遇到登入錯誤訊息如下：
<img src='images/PuttyLoginErrorCannotAgreeAClientToServerCipher-CannotAgreeAClientToServerCipher.png' align='center'/>

則可能原因有數種，您可檢查下面項目：

*  確認SSH Key已經上傳，且本機之連線已經使用SSH私鑰加密。
*  針對SmartOS，您可重新產生SSH Key並重新上傳至Portal，應該就可以直些連線。
*  如上述均未能解決連線問題，您可確認Putty版本是否為最新，可至Putty官方網站下載新版本軟體，重新執行即可正常連線。
*  如均為您解決您的問題，可聯繫[MiCloud Service](mailto:service@micloud.tw)

參考：


*  [Putty官方網站](http://www.google.com.tw/url?sa=t&rct=j&q=putty&source=web&cd=1&ved=0CDIQFjAA&url=http%3A%2F%2Fwww.chiark.greenend.org.uk%2F~sgtatham%2Fputty%2Fdownload.html&ei=YJbXTtDACITKmQXppsXtCw&usg=AFQjCNEawi7s0aRUeJP3qKnncgvPiSqZYA&sig2=-7FhRbxa0seZVhrrNQUBnw)
*  http://hub.opensolaris.org/bin/view/Community+Group+on/2009013001
