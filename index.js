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
    res.send(page.replace("NOTEDATA", fs.readFileSync(__dirname + "/notes/" + req.params["note"], "utf-8")));
});

app.listen(1273, () => console.log("Server Listening On Port : 1273"));