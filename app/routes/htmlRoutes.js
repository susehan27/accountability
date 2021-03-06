var path = require("path");

module.exports = function(app) {
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/blog", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/blog.html"));
    });

    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    app.get("/blog", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/blog.html"));
    });

    app.get("/pray", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/pray.html"));
    });

    app.get("/bible", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/bible.html"));
    });
};

