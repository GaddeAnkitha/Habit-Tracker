/* ========================= */
/* PAGE ROUTING         */
/* ========================= */

// 1. Root Route defaults to Signup Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "signup.html"));
});

// 2. Route to serve Login Page explicitly
app.get("/login.html", (req, res) => {
    res.sendFile(path.join(__dirname, "login.html"));
});

// 3. Route to serve Dashboard Page explicitly
app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// 4. Route to serve History Page explicitly
app.get("/history.html", (req, res) => {
    res.sendFile(path.join(__dirname, "history.html"));
});

/* ========================= */
/* START SERVER        */
/* ========================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
