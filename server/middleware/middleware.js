
const isLogin = async (req, res, next) => {
    try {
        if (req.session.user) {
            return next();  
        } else {
            return res.redirect('/'); 
        }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
}
 const isLogout = async (req, res, next) => {
    try {
        if (req.session.user) {
            return res.redirect('/home'); 
        }
        return next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
}
    module.exports={
    isLogin,
    isLogout
    }