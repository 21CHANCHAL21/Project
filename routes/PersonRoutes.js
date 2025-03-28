const express = require('express');
const router = express.Router();
const User = require("./../model/User");
const bcrypt = require("bcrypt");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

// SignUp Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, address, password, bio, profilePicture } = req.body;
        if (!name || !email || !address || !password) {
            return res.status(400).json({ error: 'All required fields must be provided.' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'Email already exists.' });

        const newUser = new User({ name, email, address, password, bio, profilePicture });
        await newUser.save();

        const payload = { id: newUser.id, name: newUser.name };
        const token = generateToken(payload);

        res.status(201).json({ user: newUser, token });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) return res.status(401).json({ error: "Invalid email" });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: "Invalid password" });

        const payload = { id: user.id, name: user.name };
        const token = generateToken(payload);

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Profile Route (Protected)
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

// Update Profile (Protected)
router.put("/profile", jwtAuthMiddleware, async (req, res) => {
    try {
        const { name, address, bio, profilePicture } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            req.user.id,
            { name, address, bio, profilePicture },
            { new: true }
        ).select("-password");

        if (!updatedUser) return res.status(404).json({ error: "User not found" });

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;
