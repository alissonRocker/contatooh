const mongoose = require("mongoose");

module.exports = function(uri) {
    // Por padrao são 5 conexões
    mongoose.connect(uri), {poolSize: 15};

    mongoose.connection.on("connected", function() {
        console.log("Mongoose! Conectado em " + uri);
    });

    mongoose.connection.on("disconnected", function() {
        console.log("Mongoose! Desconectado de " + uri);
    });

    mongoose.connection.on("error", function(error) {
        console.log("Mongoose! Erro na conexão: " + error);
    });

    process.on("SIGINT", function() {
        mongoose.connection.close(function() {
            console.log("Mongoose! Desconectado pelo termino da aplicação");
            // 0 - indica que a finalização ocorreu sem erros.
            process.exit(0);
        });
    });

    // Habilita o debug
    //mongoose.set("debug", true);
}