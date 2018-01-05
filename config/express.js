// config/express.js
const express      = require("express");
const load         = require("express-load");
const bodyParser   = require("body-parser");
const cookieParser = require("cookie-parser");
const session      = require("express-session");
const passport     = require("passport");
const helmet       = require("helmet");

module.exports = function(app) {
    //const app = express();
    // Configuração da porta
    app.set("port", 3000);
    // Armazenara o id da sessão
    app.use(cookieParser());
    // Cria a sessão do usuario
    app.use(session(
        {   secret: "homem avestruz",
            resave: true, // garante que as informações serão acessiveis
            saveUninitialized: true // soluciona problema na requisição antes de atribuir um cookie
        }
    ));
    // Inicializa o passport
    app.use(passport.initialize());
    app.use(passport.session());
    // ou dificultar a vida do potencial invasor (Informação falsa)
    //app.use(helmet.hidePoweredBy({ setTo: "PHP 5.5.14" }));
    // evita que a aplicação seje referenciada por <frame> ou <iframe>
    app.use(helmet.xframe());
    // xss (adiciona a tag x-xss-protection no header)
    app.use(helmet.xssFilter());
    // mime type / não deixa que sejem carregados arquivos que não sejem css ou javascript atraves de link ou script
    app.use(helmet.nosniff());    
    // desabilitar a tecnologia utilizada
    app.disable("x-powered-by");
    // middleware
    app.use(express.static("./public"));
    // Permite acessar requisição apartir do body
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    // cuida automaticamente de requisições delete e put
    app.use(require("method-override")());
    // views engine
    app.set("view engine", "ejs");
    app.set("views", "./app/views");
    // cwd: muda o diretorio para procurar as dependencias
    load("models", {cwd: "app"}).then("controllers").then("routes/auth.js").then("routes").into(app);

    // se nenhuma rota atender, redireciona para a pagina 404
    app.get("*", function(req, res) {
        res.status(404).render("404");
    });
    
    return app;
}