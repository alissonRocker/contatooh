// app/routes/contato.js

const verificaAutenticacao = require("../../config/auth");

module.exports = function(app) {
    const controller = app.controllers.contato;
    
    app.route("/contatos")
        .get(verificaAutenticacao, controller.listaContatos)
        .post(verificaAutenticacao, controller.salvaContato);

    app.route("/contatos/:id")
        .get(verificaAutenticacao, controller.obtemContato)
        .delete(verificaAutenticacao, controller.removeContato);
}
