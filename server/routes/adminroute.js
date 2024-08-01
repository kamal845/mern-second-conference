const express=require('express');
const router=express.Router();
const admincontroller=require('../controller/admincontroller');
const auth=require('../middleware/middleware');
const session = require("express-session");
const SESSION_SECRET = process.env.SESSION_SECRET;
if (!SESSION_SECRET) {
    console.error("SESSION_SECRET is not defined in .env file");
    process.exit(1); 
}

router.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

router.post("/signup", admincontroller.adminsignup); 
router.post("/login",admincontroller.adminlogin);
// router.get("/logout", admincontroller.adminlogout);
// router.post("/feedback",admincontroller.feedback);
// router.post("/register",admincontroller.register);
router.get("/adminviewsch",admincontroller.adminviewsch);
module.exports=router;