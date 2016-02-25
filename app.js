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
})

app.listen(3000, function() {
    console.log("HTTP 伺服器在 http://127.0.0.1:3000/ 上運行");
})