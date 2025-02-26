const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LoginSignup")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Failed to connect");
  });

const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const collection = mongoose.model("LogInCollection", LogInSchema);  // Fixed here

module.exports = collection;
