const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const adminsignupModel = require("../model/adminsignup");
const adminloginModel = require("../model/adminlogin");
const feedbackModel=require("../model/feedbackModel");
const registerModel=require('../model/registerModel');
module.exports = {
adminlogin : async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Check if user exists in the signupModel
      const user = await adminsignupModel.findOne({ Email: email });
      if (!user) {
        return res.status(400).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
  
      // Password verification
      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(400).json({
          status: "error",
          message: "Invalid email or password",
        });
      }
  
      // JWT generation
      const token = jwt.sign(
        { userId: user._id, email: user.Email },
        process.env.JWT_SECRET, // Use environment variable for the JWT secret
        { expiresIn: "3h" }
      );
  
      // Check if the login data already exists
      const existingLogin = await adminloginModel.findOne({ Email: email });
      if (existingLogin) {
        // Update the existing login data with the new token
        await adminloginModel.updateOne(
          { Email: email },
          { token: token }
        );
      } else {
        // Create new login data
        const loginData = {
          Email: email,
          Password: user.Password, // Storing plain passwords is not recommended
          token: token,
        };
        await adminloginModel.create(loginData);
      }
  
      // Set JWT token in cookie
      res.cookie("token", token, { httpOnly: true });
      return res.status(200).json({
        status: "success",
        message: "Login successful",
        token: token,
      });
    } catch (error) {
      // Detailed error logging
      console.error("Error during login:", error);
      if (!res.headersSent) {
        return res.status(500).json({
          status: "error",
          message: "Internal server error",
          data: error.message || "An unexpected error occurred",
        });
      }
    }
  },  
adminsignup: async (req, res) => {
    try {
      const signupData = {
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Password: req.body.Password,
      };
      console.log("Signup data:", signupData);
      const existingUser = await adminsignupModel.findOne({
        Email: signupData.Email,
      });
      if (existingUser) {
        return res.status(400).json({
          status: "error",
          message: "Email already exists",
        });
      }
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(signupData.Password, saltRounds);
      signupData.Password = hashedPassword;

      const signups = await adminsignupModel.create(signupData);
      res.status(201).json({
        status: "success",
        message: "Data is created successfully",
        // data: signups,
      });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({
        status: "error",
        message: "Internal server error",
        data: "No data found",
        data: error.message,
      });
    }
  },
adminlogout: async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '') || req.cookies.token;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "No token provided, user not logged in"
      });
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: "error",
          message: "Failed to authenticate token"
        });
      }

      await loginModel.updateOne(
        { token: token },
        { $unset: { token: "" } }
      );

      res.clearCookie('token');

      return res.status(200).json({
        status: "success",
        message: "Logout successful"
      });
    });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
      data: error.message
    });
  }
},
// feedback: async (req, res) => {
//   try {
//     const { Name, Email, Message } = req.body;
//     const newContact = new feedbackModel({
//       Name,
//       Email,
//       Message
//     });
//     await newContact.save();
//     res.status(201).json({ message: "Contact form submitted successfully!" });
//   } catch (error) {
//     console.error("Error saving contact form data:", error);
//     res.status(500).json({ message: "An error occurred while submitting the form.", error });
//   }
// },
// register:async (req,res)=>{
//   try {
//     console.log("Request body:", req.body);
//     const registerData = {
//       Name: req.body.Name,
//       Phone: req.body.Phone,
//       Email: req.body.Email,
//       Timing: req.body.Timing,
//       Purpose: req.body.Purpose
//     };
//     console.log("register data:", registerData);
//     const existingUser = await registerModel.findOne({
//       Email: registerData.Email,
//     });
//     if (existingUser) {
//       return res.status(400).json({
//         status: "error",
//         message: "Email already exists",
//       });
//     }
//     const Registers = await registerModel.create(registerData);
//     res.status(201).json({
//       status: "success",
//       message: "Data is created successfully",
//       // data: signups,
//     });
//   } catch (error) {
//     console.error("Error during signup:", error);
//     res.status(500).json({
//       status: "error",
//       message: "Internal server error",
//       data: "No data found",
//       data: error.message,
//     });
//   }
// },
 adminviewsch : async (req, res) => {
  try {
    const registrations = await registerModel.find(); 
    res.json(registrations);
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ message: "An error occurred while fetching registrations.", error });
  }
}
};