// app/routes/auth.js
const passport = require("passport");

module.exports = function(app) {
    // Filter
    app.get("/", function(req, res, next) {
        if(req.isAuthenticated()) {
            // Permite que outras rotas sejam processadas
            return next();
        } else {
            res.render("auth");
        }
    });
    // Envia para a pagina de login do github
    app.get("/auth/github", passport.authenticate("github"));
    // Trata a autenticação se ocorrer OK, então redireciona para a aplicação
    app.get("/auth/github/callback", passport.authenticate("github", {successRedirect: "/"}));

    // logout
    app.get("/logout", function(req, res) {
        req.logout(); // apartir do passport
        res.redirect("/");
    });
}
