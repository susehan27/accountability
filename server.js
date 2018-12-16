var express = require("express");
var bodyParser = require("body-parser");

var db = require("./app/models");

var app = express();
var PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//static directory
app.use(express.static("app/public"));

//routes
require("./app/routes/apiRoutes.js")(app);
require("./app/routes/htmlRoutes.js")(app);


//syn sequelize model and start express app
db.sequelize.sync({ force: true }).then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});
