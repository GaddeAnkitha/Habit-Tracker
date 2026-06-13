const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(express.static(__dirname));
app.use(express.json());
app.use(cors());

/* ========================= */
/* DATABASE CONNECTION     */
/* ========================= */
const mongoURI = process.env.MONGO_URI || "mongodb+srv://gaddeankitha_habittracker:habittracker_174@cluster0.pihgowi.mongodb.net/habittracker?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* ========================= */
/* SCHEMAS            */
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
/* AUTH ROUTES         */
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
/* HABIT ROUTES        */
/* ========================= */
app.get("/habits", async (req, res) => {
    const habits = await Habit.find({ deleted: false });
    res.json(habits);
});

app.get("/history", async (req, res) => {
    const habits = await Habit.find();
    res.json(habits);
});

app.post("/habits", async (req, res) => {
    const habit = new Habit({ title: req.body.title });
    await habit.save();
    res.json(habit);
});

app.put("/habits/:id", async (req, res) => {
    try {
        const habit = await Habit.findById(req.params.id);
        const today = new Date().toDateString();

        if (habit.lastCompleted && new Date(habit.lastCompleted).toDateString() === today) {
            return res.json({ message: "Already completed today" });
        }

        habit.streak += 1;
        habit.lastCompleted = new Date();
        await habit.save();
        res.json(habit);
    } catch (err) {
        res.status(500).json({ message: "Error updating habit" });
    }
});

app.delete("/habits/:id", async (req, res) => {
    const habit = await Habit.findById(req.params.id);
    habit.deleted = true;
    await habit.save();
    res.json({ message: "Moved to history" });
});

app.put("/restore/:id", async (req, res) => {
    const habit = await Habit.findById(req.params.id);
    habit.deleted = false;
    await habit.save();
    res.json({ message: "Restored" });
});

app.delete("/history/:id", async (req, res) => {
    await Habit.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted permanently" });
});

// ROUTE TO LOAD FIRST PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
