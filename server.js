const http = require("http");
const express = require("express");
const app = express();
require("./config/express")(app);
require("./config/passport")();
require("./config/database.js")("mongodb://localhost/contatooh");

http.createServer(app).listen(app.get("port"), function() {
    console.log("Express Server escutando na porta " + app.get("port"));
});