const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String, 
            required: true, 
            minlength: 3, 
            maxlength: 30 
        },
        email: { 
            type: String, 
            required: true, 
            unique: true, 
            minlength: 3, 
            maxlength: 200 
        },
        password: { 
            type: String, 
            required: true, 
            minlength: 6, // Set a reasonable minimum length for security
            maxlength: 1024 // Hashes are typically long; adjust based on your hashing strategy
        },
        role: { 
            type: String, 
            default: "user" // Default role is "user"
        },
        posts: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Post" 
        }]
    },
    {
        timestamps: true, // Automatically add `createdAt` and `updatedAt` fields
    }
);

// Create the User model
const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
