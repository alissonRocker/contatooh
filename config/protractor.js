// config/protractor.js
// Indica o caminho das Specs
exports.config = {
    specs: ["../test/e2e/**/*.js"],
    // chamada uma vez ants da execução
    onPrepare: function() {
        browser.driver.manage().window().maximize
        browser.driver.get("http://localhost:3000");
        // Utiliza para interagir com elementos DOM (Parametro: locator strategy(by))
        //browser.driver.findElement(by.id("entrar")).click();
        // github
        //browser.driver.findElement(by.id("login_field")).sendKeys("alissonRocker");
        //browser.driver.findElement(by.id("password")).sendKeys("8b5b1a88ab");
        //browser.driver.findElement(by.id("commit")).click();
    }
};
