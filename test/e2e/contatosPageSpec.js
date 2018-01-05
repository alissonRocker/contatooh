// test/e2e/contatosPageSpec.js
// esta pagina possui angularjs
describe("Pagina Principal", function() {
    beforeEach(function() {
        browser.get("http://localhost:3000/#/contatos");
    });

    if("Deve estar logado", function() {
        element(by.id("usuario-logado")).getText().then(function(texto) {
            // 
            expect(texto.trim().length).toBeGreaterThan(0);
        });
    });
});