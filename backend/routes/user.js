const express = require('express');
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
    username: zod.string().email(),
    firstName: zod.string().min(1).max(50),
    lastName: zod.string().min(1).max(50),
    password: zod.string().min(6)
});

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

const updateBody = zod.object({
    password: zod.string().min(6).optional(),
    firstName: zod.string().min(1).max(50).optional(),
    lastName: zod.string().min(1).max(50).optional(),
});

router.post("/signup", async (req, res) => {
    try {
        const { success, error } = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: error.issues
            });
        }

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email"
            });
        }

        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        });

        const userId = user._id;

        await Account.create({
            userId,
            balance: Math.floor(Math.random() * 10000) + 1
        });

        const token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '24h' });

        res.status(201).json({
            message: "User created successfully",
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.post("/signin", async (req, res) => {
    try {
        const { success, error } = signinBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: error.issues
            });
        }

        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '24h' });

        res.json({
            message: "Login successful",
            token: token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password');
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        
        res.json({
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username
            }
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.put("/", authMiddleware, async (req, res) => {
    try {
        const { success, error } = updateBody.safeParse(req.body);
        if (!success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: error.issues
            });
        }

        await User.updateOne({ _id: req.userId }, req.body);
        
        res.json({
            message: "Updated successfully"
        });
    } catch (error) {
        console.error('Update user error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

router.get("/bulk", async (req, res) => {
    try {
        const filter = req.query.filter || "";
        
        const users = await User.find({
            $or: [{
                firstName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }, {
                lastName: {
                    "$regex": filter,
                    "$options": "i"
                }
            }]
        }).select('-password').limit(50);

        res.json({
            user: users.map(user => ({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        });
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({
            message: "Internal server error"
        });
    }
});

module.exports = router;