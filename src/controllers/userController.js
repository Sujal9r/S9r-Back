const { sendWelcomeEmail, sendHireEmail: sendHireEmailFunction } = require('../config/email');
const User = require('../models/User');

// Email sending function
const sendHireEmail = async (developer) => {
  try {
    const result = await sendHireEmailFunction(developer.email, developer.name, developer.developer, developer.yearOfExperience);
    return { success: true, result };
  } catch (error) {
    console.error('Failed to send hire email:', error);
    return { success: false, error: error.message };
  }
};

// Controller methods
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        data: users,
        count: users.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: error.message
      });
    }
  },

  // Get user by ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }
      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: error.message
      });
    }
  },

  // Create new user
  createUser: async (req, res) => {
    try {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        developer: req.body.developer,
        yearOfExperience: req.body.yearOfExperience,
        country: req.body.country || "",
        title: req.body.title,
        skills: req.body.skills || [],
      });

      const savedUser = await newUser.save();

      // Send welcome email (but don't fail if email fails)
      try {
        const emailResult = await sendWelcomeEmail(
          savedUser.email,
          savedUser.name,
          savedUser.developer,
          savedUser.yearOfExperience
        );
        
        if (emailResult.success) {
          console.log(`✅ User created and welcome email sent to ${savedUser.email}`);
        } else {
          console.log(`⚠️  User created but email failed: ${emailResult.error}`);
        }
      } catch (emailError) {
        console.log(`⚠️  User created but email error: ${emailError.message}`);
      }

      res.status(201).json({
        success: true,
        message: 'User added successfully',
        data: savedUser,
        emailSent: true
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'Email already exists'
        });
      }
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: error.message
      });
    }
  },

  // Update user
  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );

      if (!updatedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        message: "User updated successfully",
        data: updatedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: error.message
      });
    }
  },

  // Delete user
  deleteUser: async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      
      if (!deletedUser) {
        return res.status(404).json({
          success: false,
          message: "User not found"
        });
      }

      res.json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: error.message
      });
    }
  },

  // Send hire email manually
  sendHireEmail: async (req, res) => {
    try {
      const { developerId } = req.body;
      const developer = await User.findById(developerId);

      if (!developer) {
        return res.status(404).json({
          success: false,
          message: "Developer not found"
        });
      }

      await sendHireEmail(developer);
      res.json({
        success: true,
        message: 'Hire email sent successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Failed to send hire email',
        error: error.message
      });
    }
  }
};

module.exports = userController; 