const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// 1. Parse JSON and handle CORS first
app.use(express.json());
app.use(cors());

/* ========================= */
/* DATABASE & SCHEMAS SLOTS  */
/* ========================= */
// ... (Keep your mongoose connection and schemas exactly as they are here) ...

/* ========================= */
/* EXPLICIT PAGE ROUTING   */
/* ========================= */

// FORCE SIGNUP TO BE THE ROOT ENTRY POINT
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

// 2. NOW serve static files AFTER custom routes so index.html doesn't override the root "/"
app.use(express.static(__dirname));

/* ========================= */
/* API ROUTES SLOT      */
/* ========================= */
// ... (Keep your /signup, /login, and /habits POST/PUT/DELETE routes exactly as they are below here) ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

/* ========================= */
/* DATABASE CONNECTION       */
/* ========================= */
const mongoURI = process.env.MONGO_URI || "mongodb+srv://gaddeankitha_habittracker:habittracker_174@cluster0.pihgowi.mongodb.net/habittracker?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* ========================= */
/* SCHEMAS                   */
/* ========================= */
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", UserSchema);

const HabitSchema = new mongoose.Schema({
    title: String,
    streak: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    lastCompleted: Date
});
const Habit = mongoose.model("Habit", HabitSchema);

/* ========================= */
/* PAGE ROUTING EXPLICIT FIX */
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

/* ========================= */
/* AUTH API ROUTES           */
/* ========================= */
app.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        const existingUser = await User.findOne({
            username: new RegExp("^" + cleanUsername + "$", "i")
        });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const user = new User({ username: cleanUsername, password: cleanPassword });
        await user.save();
        res.json({ success: true, message: "Account created" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const cleanUsername = username.trim();
        const cleanPassword = password.trim();

        const user = await User.findOne({
            username: new RegExp("^" + cleanUsername + "$", "i"),
            password: cleanPassword
        });

        if (user) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Invalid login" });
        }
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

/* ========================= */
/* HABIT API ROUTES          */
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

// 2. NOW serve static files AFTER custom routes so index.html doesn't override the root "/"
app.use(express.static(__dirname));

/* ========================= */
/* API ROUTES SLOT      */
/* ========================= */
// ... (Keep your /signup, /login, and /habits POST/PUT/DELETE routes exactly as they are below here) ...

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;

module.exports = app;
