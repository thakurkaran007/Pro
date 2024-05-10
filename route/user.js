const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/userpass.js");
const session = require('express-session');
const { register } = require('../models/userpass');
const flash = require('connect-flash');
const { saveRedirectUrl } = require('../middleware.js');
const { signform, signup, loginform, login, logout } = require('../controllers/user.js');

router.route("/signup")
.get(signform)
.post(wrapAsync(signup));

router.route("/login")
.get(loginform)
.post(saveRedirectUrl,passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),wrapAsync(login))

router.get("/logout",logout);

module.exports = router;