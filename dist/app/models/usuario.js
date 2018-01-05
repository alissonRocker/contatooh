// app/models/usuario.js
const mongoose     = require("mongoose");
const findOrCreate = require("mongoose-findorcreate"); 

module.exports = function() {
    var schema = mongoose.Schema({
        login: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        nome: {
            type: String,
            required: true
        },
        inclusao: {
            type: Date,
            dafault: Date.now
        }
    });

    // associando o plugin(busca e se nao existir criar) ao schema
    schema.plugin(findOrCreate);
    return mongoose.model("Usuario", schema);
}
