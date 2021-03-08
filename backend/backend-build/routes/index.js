"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var authentication_1 = require("../controllers/authentication");
var passport_1 = require("../services/passport");
var passport_2 = __importDefault(require("passport"));
//jwtlog in is an optional way to check if user is signed in at x route. We will be using a HOC to check if a user is signed in
//So this is not needed / another implementation of the same goal.
//passport.use(jwtLogin);
//authenticates if a user can log in / acess a specific resource
//We are not using cookie sessions, so we put in session: false
//const requireAuth = passport.authenticate("jwt", { session: false });
//requireAuth uses the jwtLogin strategy
var requireSignIn = passport_2.default.authenticate("local", { session: false });
//requireSignin uses the locallogin strategy
passport_2.default.use(passport_1.localLogin);
var router = express_1.Router();
//We want to ensure that the user token can acess specific resources in the page
//To do so, we created the requireAuth middleware
//THis is also known as a "protected route"
//Example of using a strategy /Dummy Route:
// router.get("/", requireAuth, (req, res) => {
//     // If JWT token can be understood (only registered users have JWT tokens that are valid/can be read),
//     //  show this page
//     //     Note: To validate token, you could use authenticateToken(used in authentication.ts)
//     //      or requireAuth (passport strategy), both are valid approaches
//     //     authenticateToken approach is based on:
//     //     https://github.com/WebDevSimplified/JWT-Authentication/blob/master/authServer.js
//     //     https://github.com/hnasr/javascript_playground/blob/master/jwt-course/jwt-final/jwtAuth.mjs
//     //     requireAuth approach is based on:
//     //     https://solidgeargroup.com/en/refresh-token-with-jwt-authentication-node-js/
//     res.send("hi");
// });
//Go through passsport strategy middleware first, if succesfull, will be continuted to signIn middleware
router.post("/signin", requireSignIn, authentication_1.signIn);
router.post("/signup", authentication_1.signUp);
//router.post("/token", refreshToken);
router.post("/signout", authentication_1.signOut);
exports.default = router;
