# 使用 i18next 於 node express中實現多國語系。

## 安裝

```
$ cd <directory-to-your-i18next-node_example>
$ npm i
$ node app.js
```

## 簡介

開發網站時難免會有多國語系的需求，此時我們可以使用 i18next 來達成。以下範例將會使用 Express 做為基礎，並加入 i18next-node-fs-backend 與 i18next-express-middleware 等套件來完成由後端判斷用戶語系，使用戶端可直接看到該語系的畫面。

```
var express = require('express');
var path = require('path');
var i18n = require('i18next');
var i18nFsBackend = require('i18next-node-fs-backend');
var i18nMiddleware = require('i18next-express-middleware');
var app = express();
 
// i18next 初始設定
 i18n.use(i18nMiddleware.LanguageDetector) // 自動偵測用戶端語系
    .use(i18nFsBackend)
    .init({
            fallbackLng: "en", // 備用語系，擷取失敗時會使用到這裡
            backend: {
                loadPath: "locales/{{lng}}/translation.json",
            }
        });

app.use(i18nMiddleware.handle(i18n, {
    
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get("/", function(req, res) {
    console.log('用戶端語系：' + req.language);
    res.render('index');
});

app.listen(3000, function() {
    console.log("HTTP 伺服器在 http://127.0.0.1:3000/ 上運行 ");
});
```


* 語言資料夾放置於 locales 中。
* i18next-node-fs-backend 套件支援 json、json5。

## 版本資訊
* NodeJS：4.3.0
* express：4.13.4
* i18next：2.2.0
* i18next-express-middleware：0.3.1
* i18next-node-fs-backend：0.0.6
* jade：1.11.0

## Reference
* [https://github.com/i18next/i18next-node](https://github.com/i18next/i18next-node)
* [https://github.com/i18next/i18next-node-fs-backend]
