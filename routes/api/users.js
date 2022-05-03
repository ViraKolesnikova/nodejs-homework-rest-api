const express = require("express");
const fs = require("fs/promises");
const multer = require("multer");
const path = require('path');
const router = express.Router();

fs.mkdir(path.join(__dirname, '..', '..', 'tmp'), { recursive: true });
const uploadDir = path.join(__dirname, '..', '..','tmp');

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
  limits: {
    fileSize: 50000,
  },
});

const upload = multer({ storage: multerConfig });

const { users } = require("../../controllers");
const { wrapper, authMiddleware } = require("../../middlewares");

// Register new user
router.post("/register", wrapper(users.register));

// Verify user's email
router.get('/verify/:verificationToken', wrapper(users.emailVerification));

// Resend verification link to user's email
router.post('/verify', wrapper(users.resendVerification));

// Login user
router.post("/login", wrapper(users.login));

// Logout user
router.get("/logout", authMiddleware, wrapper(users.logout));

// Get information about current user
router.get("/current", authMiddleware, wrapper(users.getCurrentUser));

// Upgrade user's subscription
router.patch("/", authMiddleware, wrapper(users.updateSubscription));

// Update user's avatar
router.patch("/avatars", authMiddleware, upload.single('avatar'), wrapper(users.updateAvatar));

module.exports = router;
