const express = require("express");
const router = express.Router();
const { registerUser, loginUser , findUser} = require("../Controllers/userController");

// Route for user registration
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/find/:userId", findUser);



module.exports = router;
