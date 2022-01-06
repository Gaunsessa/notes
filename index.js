const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const path = require("path");

const app = express();

const page = fs.readFileSync(__dirname + "/public/note.html", "utf8");

app.use(bodyParser.json());
app.use(express.static("public"));

app.post("/", (req, res) => {
    let url = "";
    for (let i = 0; i < 5; i++) url += String.fromCharCode(97 + Math.floor(Math.random() * 26));

    fs.appendFile(__dirname + "/notes/" + url, req.body["text"], () => {});

    res.redirect("/n/" + url);
});

app.get("/n/:note", (req, res) => {
    let path = __dirname + "/notes/" + req.params["note"];

    if (fs.existsSync(path))
        res.send(page.replace("NOTEDATA", fs.readFileSync(path, "utf-8")));
    else
        res.sendFile(__dirname + "/public/404.html");
});

app.get("*", (req, res) => {
    res.sendFile(__dirname + "/public/404.html");
});

app.listen(1273, () => console.log("Server Listening On Port : 1273"));