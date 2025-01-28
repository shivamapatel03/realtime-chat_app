const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

// Utility function to create a JWT token
const createToken = (_id) => {
    const jwtKey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtKey, { expiresIn: "3d" });
};

// Controller to handle user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if the email already exists
        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).json("User with the given email already exists.");
        }

        // Validate required fields
        if (!name || !email || !password) {
            return res.status(400).json("All fields are required.");
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json("Invalid email format.");
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json("Password must be strong (include uppercase, lowercase, numbers, and symbols).");
        }

        // Create a new user
        user = new userModel({ name, email, password });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Save the user to the database
        await user.save();

        // Create a token for the new user
        const token = createToken(user._id);

        // Respond with user details and the token
        res.status(200).json({ _id: user._id, name, email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
};

// Controller to handle user login
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Validate required fields
        if (!email || !password) {
            return res.status(400).json("Email and password are required.");
        }

        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json("Invalid email or password.");
        }

        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json("Invalid email or password.");
        }

        // Create a token for the logged-in user
        const token = createToken(user._id);

        // Respond with user details and the token
        res.status(200).json({ _id: user._id, name: user.name, email, token });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
};

const findUser = async(req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId)

        res.status(200).json(user);
    }catch (error) {
        console.error(error);
        res.status(500).json("Internal server error.");
    }
}
module.exports = { registerUser, loginUser, findUser};
