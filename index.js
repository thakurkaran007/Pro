if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const app = express();
const PORT = 3000
const path = require("path");
const cookieParser = require("cookie-parser")
const mongoose = require('mongoose');
const ejsMate  = require("ejs-mate");


const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userpass.js");


app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
const dbUrl = process.env.DB_URL;






const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET
    },
    touchAfter: 24 * 60 * 60
})

let sessionSecret = {
    store,
    secret: process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

store.on("error",  () => {  
    console.log("ERROR IN MONGO SESSION STORE")
})



app.listen(PORT,() => {
    console.log(`Listening to port ${PORT}`);
})


app.use(cookieParser("secretCode"));   // to add a stamp for eg  -->   to sign cookie
app.engine("ejs",ejsMate);


app.use(session(sessionSecret));
app.use(flash());



app.use(passport.initialize());
app.use(passport.session());
passport.use((new LocalStrategy(User.authenticate())));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const listingRouter = require("./route/listings.js");
const reviewsRouter = require("./route/reviews.js");
const userRouter = require("./route/user.js");


app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.user = req.user;
    next();
});


app.use("/listings",listingRouter);
app.use("/listings/:id/review",reviewsRouter);
app.use("/",userRouter);





async function main() {
    await mongoose.connect(dbUrl);
}
main()
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log(err);
})







app.use((err,req,res,next) => {
    let { status = 500,message ="error"} = err;
    res.status(status).render("err.ejs",{message});
    next(err);
})

// app.get("/greets",(req,res) => {
//     res.cookie("name" , "Chirag");
//     res.cookie("saner" , "sin");
//     res.cookie("Fruit" , "Apple",{signed:true});
//     res.send("send");
// })

// app.get("/greet",(req,res) => {
//     console.log(req.signedCookies);   // req.cookies will send you unsigned cookies and if  the cookie is tempored{signed} if totall then {} if only the value under it then {key: false}
// })