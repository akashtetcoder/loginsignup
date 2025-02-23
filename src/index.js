const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

const templatePath = path.join(__dirname, '../templates');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set view engine and templates path
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes
app.get("/", (req, res) => {
  res.render("login"); // Login page served at root route
});

app.get("/signup", (req, res) => {
  res.render("signup"); // Signup page
});

app.get("/login", (req, res) => {
  res.render("login"); // Explicit /login route
});

app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password
  };

  try {
    await collection.insertOne(data);
    res.redirect("/"); // Redirect to login page after successful signup
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Server error occurred.");
  }
});

app.post("/login", async (req, res) => {
    const { name, password } = req.body;

    try {
        // Check if the user exists with the provided name and password
        const user = await collection.findOne({ name, password });

        if (!user) {
            // If the user does not exist, render the "wrongdetails" page
            return res.render("wrongdetails"); // Ensure you have "wrongdetails.hbs" in your templates
        }

        // If login is successful, render the "home" page
        res.render("home");
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send("Server error occurred.");
    }
});

// Server setup
app.listen(3000, () => {
  console.log("Server connected on port 3000");
});
