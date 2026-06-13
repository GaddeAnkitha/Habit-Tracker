const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

/* ========================= */
/* PAGE ROUTING ONLY         */
/* ========================= */

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/signup.html", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/history.html", (req, res) => {
    res.sendFile(path.join(__dirname, "history.html"));
});

// Serve assets dynamically if needed
app.use(express.static(__dirname));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Static Routing Server running on port ${PORT}`);
});

module.exports = app;
