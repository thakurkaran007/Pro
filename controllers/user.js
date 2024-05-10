const User = require('../models/userpass.js');

const x = module.exports;

x.signform = (req,res) => {
    res.render("users/user.ejs");
};

x.signup = async(req,res) => {
    try{let { username,password,email } = req.body;
    const newUser = new User({
        username: username,
        email: email,
    });
     let register = await User.register(newUser,password);
    req.login(register,(err) => {
        if(err){
            return next(err);
        }
            return req.flash("success","Welcome to WanderList"),
            res.redirect("/listings");
    });
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup"); 
}
}

x.loginform = (req,res) => {
    res.render("users/login.ejs");
}

x.login = async(req,res) => {
    req.flash("success","Login Successful");
    res.redirect(res.locals.x);
}
x.logout = (req,res,next) => {
    req.logOut((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success","LogOut Successful");
        res.redirect("/listings");
    })
}