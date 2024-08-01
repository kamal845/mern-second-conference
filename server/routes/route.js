const express=require('express');
const router=express.Router();
const controller=require('../controller/controller');
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

router.post("/signup", controller.signup); 
router.post("/login",controller.login);
router.get("/logout", controller.logout);
router.post("/feedback",controller.feedback);
router.post("/register",controller.register);
router.get("/viewsch",controller.viewsch);
module.exports=router;