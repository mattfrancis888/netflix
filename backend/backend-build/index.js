"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var body_parser_1 = __importDefault(require("body-parser"));
if (process.env.NODE_ENV !== "production") {
    //We don't need dotenv when in production
    dotenv_1.default.config();
}
var app = express_1.default();
// middleware for parsing bodies from URL
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use(cors_1.default({ origin: true, credentials: true }));
//with the credentials config above for cors:
//we don't need
// "Access-Control-Allow-Origin": "*",
//in now.json headers
//https://stackoverflow.com/questions/19743396/cors-cannot-use-wildcard-in-access-control-allow-origin-when-credentials-flag-i
console.log("NODE ENV", process.env.NODE_ENV);
//Serve react app in express server
//https://www.youtube.com/watch?v=QBXWZPy1Zfs&t=294s&ab_channel=FullstackDevelopment
app.use("/api/test", function (req, res) {
    res.send("hi");
});
//All other roues will be handled by
// app.use(express.static(path.join(__dirname, "build")));
// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "build", "index.html"));
// });
// const root = require("path").join(__dirname, "build");
// app.use(express.static(root));
// app.get("*", (req, res) => {
//     res.sendFile("index.html", { root });
// });
var port = 5000;
//app.use(errorHandler);
app.listen(port, function () {
    console.log("App running on port " + port + ".");
});
