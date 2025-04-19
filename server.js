require("dotenv").config();
const MONGO_URI = process.env.MONGO_URI;
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("DB Connection Error:", err));

// Schema
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
});

const User = mongoose.model("User", UserSchema);

// API Endpoint
app.post("/api/join", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const newUser = new User({ name, email, phone });
        await newUser.save();
        res.status(201).json({ message: "Successfully joined!" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
