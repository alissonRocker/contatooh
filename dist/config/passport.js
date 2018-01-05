// config/passport.js
const mongoose       = require("mongoose");
const passport       = require("passport");
const GitHubStrategy = require("passport-github").Strategy;

module.exports = function() {
    var Usuario = mongoose.model("Usuario");

    passport.use(new GitHubStrategy({
        clientID: "2f9fb67c5d6e7f9d76db",
        clientSecret: "dc20a92c6aaf4f685a72324f49528d4e0d15ec92",
        callbackURL: "http://localhost:3000/auth/github/callback"
    }, function(accessToken, refreshToken, profile, done) {
        // Parametros
        // 1: perfil do usuario, 2: dados armazenados na sessao
        Usuario.findOrCreate(
            {"login": profile.username},
            {"nome": profile.username},
            function(error, usuario) {
                if(error) {
                    console.log(error);
                    return done(error);
                }
                return done(null, usuario);
            }
        );
    }));

    // Parametros
    // 1: Usuario passado pela estrategia de autenticação
    // 2: função que recebe a informação do usuario
    passport.serializeUser(function(usuario, done){
        done(null, usuario._id);
    });

    // Recebe o id do usuario a cada requisição
    passport.deserializeUser(function(id, done) {
        Usuario.findById(id).exec().then(function(usuario) {
            done(null, usuario);
        })
    });
}
