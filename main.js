var path = require("path");
var express = require("express");
var server = require("./src/server");

var app = express();
app.set("views", path.join(__dirname, "src/views"));
app.use(express.urlencoded());
app.use(app.router);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.errorHandler());

server.init(app);

var server = app.listen(8080, function() {
    console.log("Listening on port 8080");
});
